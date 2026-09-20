import React, { useState } from 'react';
import { X, Download, Upload, FileJson, FileSpreadsheet, Printer, Copy, Check, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { exportToExcelSystem } from '../../lib/excelExporter';

export const ImportExportModal: React.FC = () => {
  const {
    importExportModalOpen,
    setImportExportModalOpen,
    contracts,
    workOrders,
    clients,
    risks,
    invoices,
    electronicForms,
    importDataFromJSON,
    addToast
  } = useApp();

  const [jsonText, setJsonText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  if (!importExportModalOpen) return null;

  const handleExportJSON = () => {
    const fullSnapshot = {
      exportedAt: new Date().toISOString(),
      contracts,
      workOrders,
      clients,
      risks,
      invoices,
      electronicForms
    };
    const jsonString = JSON.stringify(fullSnapshot, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SoftServices_Contract_System_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('تمت طباعة وتنزيل النسخة الاحتياطية الشاملة بصيغة JSON');
  };

  const handleCopySnapshot = () => {
    const fullSnapshot = {
      contracts,
      workOrders,
      clients,
      risks,
      invoices
    };
    navigator.clipboard.writeText(JSON.stringify(fullSnapshot, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast('تم نسخ كود النسخة الاحتياطية بالحافظة');
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jsonText.trim()) return;
    const success = importDataFromJSON(jsonText);
    if (success) {
      setJsonText('');
      setImportExportModalOpen(false);
    }
  };

  const handleExcelExport = async () => {
    try {
      setIsExportingExcel(true);
      await exportToExcelSystem();
    } catch (err) {
      console.error(err);
    } finally {
      setIsExportingExcel(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto dir-rtl text-right">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">مركز الاستيراد والتصدير المتقدم</h3>
              <p className="text-xs text-slate-400">تصدير Excel XLSX، نسُخ احتياطية JSON، واستيراد البيانات</p>
            </div>
          </div>
          <button
            onClick={() => setImportExportModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Export Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleExcelExport}
              disabled={isExportingExcel}
              className="flex items-center justify-between p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/40 transition group cursor-pointer text-right"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4" />
                  تصدير نظام Excel (.xlsx)
                </span>
                <p className="text-[11px] text-slate-400">تحميل 42 ورقة عمل كاملة بالمعادلات</p>
              </div>
              <Download className={`w-5 h-5 text-emerald-400 ${isExportingExcel ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleExportJSON}
              className="flex items-center justify-between p-4 rounded-xl bg-blue-950/60 border border-blue-500/40 hover:bg-blue-900/40 transition group cursor-pointer text-right"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                  <FileJson className="w-4 h-4" />
                  تنزيل نسّخة احتياطية (JSON)
                </span>
                <p className="text-[11px] text-slate-400">حفظ كافة العقود وأوامر العمل والمخاطر</p>
              </div>
              <Download className="w-5 h-5 text-blue-400 group-hover:translate-y-0.5 transition" />
            </button>
          </div>

          {/* Import JSON Section */}
          <form onSubmit={handleImportSubmit} className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-400" />
                استيراد وقراءة كود بيانات JSON
              </label>
              <button
                type="button"
                onClick={handleCopySnapshot}
                className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'تم النسخ' : 'نسخ كود الحالة الحالية'}</span>
              </button>
            </div>

            <textarea
              rows={5}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="قم بلصق كود JSON للنسخة الاحتياطية هنا للتحميل والاستيراد الآلي..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs font-mono text-emerald-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />

            <div className="flex items-center justify-between pt-2">
              <p className="text-[11px] text-slate-400">
                سعة البيانات الحالية: {contracts.length} عقد | {workOrders.length} أمر عمل | {risks.length} خطر
              </p>
              <button
                type="submit"
                disabled={!jsonText.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white text-xs font-bold transition shadow-lg shadow-emerald-600/20 disabled:cursor-not-allowed"
              >
                <RefreshCw className="w-4 h-4" />
                <span>تطبيق واستيراد البيانات</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
