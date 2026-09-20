import React, { useState } from 'react';
import { MOCK_CONTRACTS } from '../../data/mockData';
import { BarChart2, FileText, Printer, Download, CheckCircle2 } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const [selectedReportId, setSelectedReportId] = useState<number>(20); // Default to Executive Comprehensive

  const reportsList = [
    { id: 1, name: 'دراسة تكلفة العقد', desc: 'تحليل بنود التكلفة المباشرة وغير المباشرة' },
    { id: 2, name: 'دراسة التسعير', desc: 'مقارنة التكلفة وسعر البيع ومعامل الـ Markup' },
    { id: 3, name: 'تحليل الربحية', desc: 'هامش الربح ونقطة التعادل ومساهمة الخدمات' },
    { id: 4, name: 'التقرير المالي', desc: 'ملخص الإيرادات والتكاليف والتدفقات النقدية' },
    { id: 5, name: 'التقرير التشغيلي', desc: 'أداء المواقع وأوامر العمل والساعات الفعلية' },
    { id: 6, name: 'تقرير المواقع', desc: 'استهلاك وتكلفة كل موقع تشغيلي' },
    { id: 7, name: 'تقرير الخدمات', desc: 'الخدمات الأعلى تكلفة والأقل ربحية' },
    { id: 8, name: 'تقرير العمالة', desc: 'رواتب وبدلات وتكاليف بدلاء الإجازات والتأمين' },
    { id: 9, name: 'تقرير المواد', desc: 'كميات وأسعار مواد النظافة والتعقيم والمستهلكات' },
    { id: 10, name: 'تقرير المعدات', desc: 'تكاليف إيجار وإهلاك وشراء المعدات والأدوات' },
    { id: 11, name: 'تقرير الفوترة', desc: 'سجل الفواتير الصادرة والضريبة والغرامات' },
    { id: 12, name: 'تقرير التحصيل', desc: 'أعمار الذمم (AR Aging) والدفعات المحصلة والمتأخرة' },
    { id: 13, name: 'تقرير الانحرافات', desc: 'مقارنة الميزانية المخططة مقابل المنصرف الفعلي' },
    { id: 14, name: 'تقرير المخاطر', desc: 'مصفوفة المخاطر وخطط التخفيف والأثر المالي' },
    { id: 15, name: 'تقرير KPI / SLA', desc: 'مؤشرات الأداء وجودة الخدمات ونسبة الامتثال' },
    { id: 16, name: 'تقرير المطالبات', desc: 'سجل المطالبات المالية والتسويات بالتراضي' },
    { id: 17, name: 'تقرير التغييرات', desc: 'التعديلات في نطاق العقد والأثر المالي والزمني' },
    { id: 18, name: 'تقرير التجديد', desc: 'العقود القريبة من الانتهاء وخيارات التجديد والتسعير' },
    { id: 19, name: 'تقرير الإغلاق', desc: 'Checklist إغلاق العقود والتسويات النهائية' },
    { id: 20, name: 'التقرير التنفيذي الشامل', desc: 'ملخص شامل موجه للإدارة العليا والشركاء' }
  ];

  const activeReport = reportsList.find((r) => r.id === selectedReportId) || reportsList[19];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-blue-400" />
            <span>38_مركز التقارير المؤسسية المعتمدة (20 تقرير تنفيذي)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            استعراض وتصدير التقارير المعتمدة المحسوبة آلياً من قواعد بيانات العقود
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-4 py-2 rounded-xl transition border border-slate-700 no-print"
        >
          <Printer className="w-4 h-4" />
          <span>طباعة التقرير (Print PDF)</span>
        </button>
      </div>

      {/* Main Grid: Report Selector & Preview Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports Index */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-2 max-h-[70vh] overflow-y-auto no-print">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">قائمة التقارير المتاحة</h2>
          {reportsList.map((rep) => (
            <button
              key={rep.id}
              onClick={() => setSelectedReportId(rep.id)}
              className={`w-full text-right p-3 rounded-xl text-xs transition space-y-1 block ${
                selectedReportId === rep.id
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>تقرير #{rep.id}: {rep.name}</span>
                {selectedReportId === rep.id && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
              </div>
              <p className={`text-[10px] ${selectedReportId === rep.id ? 'text-blue-100' : 'text-slate-400'}`}>
                {rep.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Report Preview Canvas */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Report Header Block */}
          <div className="border-b border-slate-800 pb-4 flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">
                REPORT #{activeReport.id}
              </span>
              <h2 className="text-lg font-extrabold text-white">{activeReport.name}</h2>
              <p className="text-xs text-slate-400">{activeReport.desc}</p>
            </div>
            <div className="text-left font-mono text-[11px] text-slate-400">
              <div>تاريخ التقرير: 2026-03-17</div>
              <div>النظام: Soft Services Contract System</div>
            </div>
          </div>

          {/* Report Body Preview Table */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-200">ملخص مخرجات التقرير لعقود النظام النشطة</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right text-slate-300">
                <thead className="bg-slate-800/90 text-slate-200 border-b border-slate-700 font-bold">
                  <tr>
                    <th className="p-2.5">UID العقد</th>
                    <th className="p-2.5">عنوان العقد</th>
                    <th className="p-2.5">العميل</th>
                    <th className="p-2.5">التكلفة الإجمالية</th>
                    <th className="p-2.5">الإيراد المفتور</th>
                    <th className="p-2.5">صافي الربح</th>
                    <th className="p-2.5">الهامش %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {MOCK_CONTRACTS.map((c) => (
                    <tr key={c.contractUid} className="hover:bg-slate-800/40">
                      <td className="p-2.5 font-bold text-blue-400">{c.contractUid}</td>
                      <td className="p-2.5 font-sans font-medium text-white">{c.contractTitle}</td>
                      <td className="p-2.5 font-sans text-slate-300">{c.clientName}</td>
                      <td className="p-2.5">{c.totalCost.toLocaleString()} ر.س</td>
                      <td className="p-2.5 font-bold text-emerald-400">{c.contractPrice.toLocaleString()} ر.س</td>
                      <td className="p-2.5 font-bold text-amber-400">{c.grossProfit.toLocaleString()} ر.س</td>
                      <td className="p-2.5 font-bold text-blue-400">{c.profitMarginPercent.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-300">
              <span className="font-bold text-white block">ملاحظات واعتمادات التقرير التنفيذي:</span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                تم إعداد وتطبيق المعادلات وفق القيم المعتمدة في ورقة <code className="text-amber-400">42_الإعدادات</code> وقوائم المرجعيات المركزية. التكاليف المباشرة وغير المباشرة مطابقة لمعايير المحاسبة الإدارية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
