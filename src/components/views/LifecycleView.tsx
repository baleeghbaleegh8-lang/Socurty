import React from 'react';
import { MOCK_LIFECYCLE_LOGS, MOCK_CONTRACTS } from '../../data/mockData';
import { LifecycleStage } from '../../types';
import { Workflow, CheckCircle2, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';

export const LifecycleView: React.FC = () => {
  const allStages: { stage: LifecycleStage; name: string }[] = [
    { stage: '01_فرصة', name: '01. فرصة مناقصة' },
    { stage: '02_تأهيل', name: '02. التأهيل الفني' },
    { stage: '03_دراسة_جدوى', name: '03. دراسة الجدوى' },
    { stage: '04_مسح_موقع', name: '04. مسح الموقع' },
    { stage: '05_تسعير', name: '05. التسعير والتكلفة' },
    { stage: '06_عرض_سعر', name: '06. تقديم العرض' },
    { stage: '07_تفاوض', name: '07. التفاوض' },
    { stage: '08_ترسية', name: '08. الترسية' },
    { stage: '09_تعاقد', name: '09. توقيع العقد' },
    { stage: '10_تهيئة_وتشغيل', name: '10. التهيئة والتشغيل' },
    { stage: '11_رقابة_وجودة', name: '11. الرقابة والجودة' },
    { stage: '12_فوترة', name: '12. الفوترة' },
    { stage: '13_تحصيل', name: '13. التحصيل' },
    { stage: '14_تغيير_نطاق', name: '14. إدارة التغيير' },
    { stage: '15_مطالبات', name: '15. المطالبات' },
    { stage: '16_تجديد_وتمديد', name: '16. التجديد والتمديد' },
    { stage: '17_إغلاق', name: '17. إغلاق العقد' },
    { stage: '18_تقييم_بعد_العقد', name: '18. التقييم البعدي' },
    { stage: '19_أرشفة', name: '19. الأرشفة النهائية' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-blue-400" />
            <span>07_دورة حياة العقد الكاملة (Contract Lifecycle Workflow)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            متابعة مراحل العقد من فرصة المناقصة حتى الأرشفة النهائية مع تتبع التواريخ والمسؤولين والآثار المالية
          </p>
        </div>
      </div>

      {/* 20 Stage Workflow Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
          <span>المخطط العام لدورة حياة العقد الـ 20 مرحلة</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {allStages.map((st, idx) => {
            const isCompleted = idx < 10;
            const isCurrent = idx === 9; // 10. التهيئة والتشغيل
            return (
              <div
                key={st.stage}
                className={`p-3 rounded-xl border text-xs space-y-1.5 transition ${
                  isCurrent
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-md shadow-blue-500/10'
                    : isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px]">{st.name}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isCurrent ? (
                    <Clock className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400">
                  {isCurrent ? 'قيد التنفيذ بالموقع' : isCompleted ? 'مكتمَلة' : 'مرحلة مستقبلية'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lifecycle Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center justify-between">
          <span>سجل متابعة مراحل العقود (Lifecycle Audit Trail)</span>
          <span className="text-xs text-slate-400">مرتبط بـ CNT-2026-001</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right text-slate-300">
            <thead className="bg-slate-800/90 text-slate-200 border-b border-slate-700">
              <tr>
                <th className="p-3">رقم السجل</th>
                <th className="p-3">UID العقد</th>
                <th className="p-3">المرحلة</th>
                <th className="p-3">التاريخ</th>
                <th className="p-3">المسؤول</th>
                <th className="p-3">المدة (يوم)</th>
                <th className="p-3">الحالة</th>
                <th className="p-3">الأثر المالي</th>
                <th className="p-3">الملاحظات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {MOCK_LIFECYCLE_LOGS.map((log) => (
                <tr key={log.logId} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-mono text-blue-400">{log.logId}</td>
                  <td className="p-3 font-mono font-bold text-slate-100">{log.contractUid}</td>
                  <td className="p-3 font-semibold text-white">{log.stage}</td>
                  <td className="p-3 font-mono">{log.stageDate}</td>
                  <td className="p-3 text-slate-200">{log.responsiblePerson}</td>
                  <td className="p-3 font-mono">{log.durationDays} أيام</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        log.status === 'مكتمل'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-emerald-400">
                    {log.financialImpact > 0 ? `${log.financialImpact.toLocaleString()} ر.س` : '—'}
                  </td>
                  <td className="p-3 text-slate-400 max-w-xs truncate">{log.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
