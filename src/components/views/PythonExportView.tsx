import React, { useState } from 'react';
import { PYTHON_COLAB_SCRIPT } from '../../lib/pythonGeneratorCode';
import { exportToExcelSystem } from '../../lib/excelExporter';
import { FileCode, Copy, Check, Download, ExternalLink, Terminal, Sparkles } from 'lucide-react';

export const PythonExportView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PYTHON_COLAB_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleExportXlsx = async () => {
    try {
      setIsExporting(true);
      await exportToExcelSystem();
    } catch (err) {
      console.error('Failed to generate Excel:', err);
      alert('حدث خطأ أثناء إنشاء ملف أكسل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-blue-400" />
            <span>كود Python لتشغيل نظام Excel الـ 42 ورقة مباشرة في Google Colab</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            كود Python كامل وقابل للتشغيل 100% باستخدام openpyxl لبناء أوراق العمل الـ 42 وتطبيق التنسيقات العربية والمعادلات
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportXlsx}
            disabled={isExporting}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-emerald-900/30 border border-emerald-500/30"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'جاري تصدير الـ XLSX...' : 'تصدير XLSX المباشر'}</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-900/30"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم النسخ للحافظة!' : 'نسخ كود Python'}</span>
          </button>
        </div>
      </div>

      {/* Instructions for Google Colab */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 text-xs">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 text-amber-400">
          <Terminal className="w-4 h-4" />
          <span>خطوات تشغيل الكود في Google Colab:</span>
        </h2>
        <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pr-2">
          <li>افتح موقع <a href="https://colab.research.google.com" target="_blank" rel="noreferrer" className="text-blue-400 underline inline-flex items-center gap-1">Google Colab <ExternalLink className="w-3 h-3" /></a> واستحدث دفتر ملاحظات جديد (New Notebook).</li>
          <li>انسخ كود Python الكامل بالضغط على زر <strong>"نسخ كود Python"</strong> أعلاه.</li>
          <li>ضع الكود في الخلية الأولى وقم بتنزيل مكتبة openpyxl إذا لم تكن مثبتة تلقائياً: <code className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded font-mono">!pip install openpyxl</code></li>
          <li>اضغط على زر التشغيل (Run / Shift+Enter). وسيتم إنشاء وتحميل ملف <code className="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono">نظام_إدارة_وتحليل_عقود_الخدمات_الناعمة.xlsx</code> تلقائياً!</li>
        </ol>
      </div>

      {/* Python Code Viewer */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-0">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="font-mono text-xs font-bold text-slate-300 ml-2">
              generate_soft_services_excel_system.py
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            className="text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <pre className="p-4 text-slate-300 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[60vh]">
          <code>{PYTHON_COLAB_SCRIPT}</code>
        </pre>
      </div>
    </div>
  );
};
