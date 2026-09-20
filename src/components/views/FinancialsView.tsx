import React from 'react';
import { DollarSign, Clock, FileText, AlertCircle, TrendingUp, CheckCircle2, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FinancialsView: React.FC = () => {
  const { invoices, updateInvoiceStatus, addInvoice } = useApp();

  const totalBilled = invoices.reduce((sum, i) => sum + i.netInvoiceAmount, 0);
  const totalCollected = invoices.reduce((sum, i) => sum + i.collectedAmount, 0);
  const totalOutstanding = invoices.reduce((sum, i) => sum + i.remainingBalance, 0);

  const handleIssueQuickInvoice = () => {
    addInvoice({
      grossAmount: 150000,
      discount: 0,
      clientName: 'شركة الأبراج القابضة'
    });
  };

  return (
    <div className="space-y-6 dir-rtl text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <span>الفوترة والتحصيل وأعمار الذمم (Invoicing & AR Collections)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            دورة الفوترة الضريبية، أعمار الذمم المدينة (AR Aging)، التسويات الغرامية، والتحصيل الآلي
          </p>
        </div>

        <button
          onClick={handleIssueQuickInvoice}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-emerald-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إصدار فاتورة جديدة</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
          <span className="text-xs text-slate-400">إجمالي الفواتير المفوترة (مع الضريبة)</span>
          <p className="text-2xl font-black text-white">{totalBilled.toLocaleString()} ر.س</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
          <span className="text-xs text-slate-400">إجمالي المبالغ المحصلة فعلياً</span>
          <p className="text-2xl font-black text-emerald-400">{totalCollected.toLocaleString()} ر.س</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
          <span className="text-xs text-slate-400">الرصيد المتبقي (الذمم والأعمار)</span>
          <p className="text-2xl font-black text-rose-400">{totalOutstanding.toLocaleString()} ر.س</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-3 p-5">
        <h2 className="text-sm font-bold text-white flex items-center justify-between">
          <span>سجل الفواتير والمستخلصات المعتمدة (Invoice Register)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right text-slate-300">
            <thead className="bg-slate-800/90 text-slate-200 border-b border-slate-700">
              <tr>
                <th className="p-3">Invoice UID</th>
                <th className="p-3">العقد / العميل</th>
                <th className="p-3">رقم الفاتورة</th>
                <th className="p-3">تاريخ الإصدار</th>
                <th className="p-3">تاريخ الاستحقاق</th>
                <th className="p-3">الخاضع للضريبة</th>
                <th className="p-3">الضريبة (15%)</th>
                <th className="p-3">صافي الفاتورة</th>
                <th className="p-3">المحصل</th>
                <th className="p-3">المتبقي</th>
                <th className="p-3">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {invoices.map((inv) => (
                <tr key={inv.invoiceUid} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-mono font-bold text-emerald-400">{inv.invoiceUid}</td>
                  <td className="p-3">
                    <div className="font-semibold text-white">{inv.clientName}</div>
                    <span className="text-[10px] font-mono text-slate-400">{inv.contractUid}</span>
                  </td>
                  <td className="p-3 font-mono">{inv.invoiceNumber}</td>
                  <td className="p-3 font-mono">{inv.issueDate}</td>
                  <td className="p-3 font-mono">{inv.dueDate}</td>
                  <td className="p-3 font-mono">{inv.taxableAmount.toLocaleString()} ر.س</td>
                  <td className="p-3 font-mono">{inv.vatAmount.toLocaleString()} ر.س</td>
                  <td className="p-3 font-mono font-bold text-white">
                    {inv.netInvoiceAmount.toLocaleString()} ر.س
                  </td>
                  <td className="p-3 font-mono text-emerald-400 font-bold">
                    {inv.collectedAmount.toLocaleString()} ر.س
                  </td>
                  <td className="p-3 font-mono text-rose-400 font-bold">
                    {inv.remainingBalance.toLocaleString()} ر.س
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        updateInvoiceStatus(
                          inv.invoiceUid,
                          inv.status === 'مدفوعة بالكامل' ? 'غير مدفوعة' : 'مدفوعة بالكامل'
                        )
                      }
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border cursor-pointer transition ${
                        inv.status === 'مدفوعة بالكامل'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                      title="اضغط لتغيير حالة السداد"
                    >
                      {inv.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
