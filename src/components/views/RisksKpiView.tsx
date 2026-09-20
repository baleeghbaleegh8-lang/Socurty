import React from 'react';
import { ShieldAlert, BarChart3, CheckCircle2, AlertTriangle, ShieldCheck, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_KPIS } from '../../data/mockData';

export const RisksKpiView: React.FC = () => {
  const { risks, setAddRiskModalOpen, deleteRisk, openDeleteConfirm } = useApp();

  return (
    <div className="space-y-6 dir-rtl text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>سجل إدارة المخاطر ومؤشرات الأداء KPI/SLA</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            مصفوفة تقييم المخاطر 5×5، خطط الاستجابة والتخفيف، ومتابعة الالتزام بمعايير الـ SLA والجودة
          </p>
        </div>

        <button
          onClick={() => setAddRiskModalOpen(true)}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-rose-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>تسجيل خطر جديد</span>
        </button>
      </div>

      {/* 5x5 Risk Matrix & KPI Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 5x5 Risk Matrix Explanation */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>مصفوفة تقييم المخاطر 5×5 (Probability × Impact)</span>
          </h2>

          <div className="space-y-2 text-xs">
            <p className="text-slate-400 text-[11px]">
              درجة الخطر التلقائية = الاحتمالية (1-5) × الأثر (1-5). المخاطر الحرجة تتطلب تحركاً فورياً.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 text-center text-[10px] font-bold">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                حرج (16 - 25)
              </div>
              <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
                عالي (10 - 15)
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                متوسط (5 - 9)
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                منخفض (1 - 4)
              </div>
            </div>
          </div>
        </div>

        {/* KPI Performance Highlights */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>مؤشرات أداء SLA والامتثال لجودة الخدمات (SLA Performance KPIs)</span>
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MOCK_KPIS.map((kpi) => (
              <div key={kpi.kpiUid} className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{kpi.metricName}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      kpi.status === 'ممتاز'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {kpi.status}
                  </span>
                </div>

                <div className="flex items-baseline justify-between font-mono text-xs text-slate-300">
                  <span>المستهدف: {kpi.targetValue} {kpi.unit}</span>
                  <span className="font-bold text-emerald-400">الفعلي: {kpi.actualValue} {kpi.unit}</span>
                </div>

                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(kpi.slaCompliancePercent, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Register Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-5 space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center justify-between">
          <span>سجل المخاطر الميدانية والتشغيلية (Risk Register)</span>
          <span className="text-xs text-slate-400 font-mono font-normal">إجمالي: {risks.length} مخاطر</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right text-slate-300">
            <thead className="bg-slate-800/90 text-slate-200 border-b border-slate-700">
              <tr>
                <th className="p-3">Risk UID</th>
                <th className="p-3">العقد</th>
                <th className="p-3">التصنيف</th>
                <th className="p-3">وصف الخطر والسبب</th>
                <th className="p-3">الاحتمالية × الأثر</th>
                <th className="p-3">درجة الخطر</th>
                <th className="p-3">الإجراء الوقائي للتخفيف</th>
                <th className="p-3">المسؤول</th>
                <th className="p-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {risks.map((risk) => (
                <tr key={risk.riskUid} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-mono font-bold text-rose-400">{risk.riskUid}</td>
                  <td className="p-3 font-mono text-slate-400">{risk.contractUid}</td>
                  <td className="p-3">
                    <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[10px] border border-slate-700">
                      {risk.category}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-white">{risk.description}</div>
                    <span className="text-[10px] text-slate-400">السبب: {risk.cause}</span>
                  </td>
                  <td className="p-3 font-mono">
                    {risk.probability} × {risk.impact} = <span className="font-bold text-amber-400">{risk.riskScore}</span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        risk.riskLevel === 'حرج'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : risk.riskLevel === 'عالي'
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {risk.riskLevel}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 max-w-xs">{risk.preventiveAction}</td>
                  <td className="p-3 text-slate-300">{risk.owner}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() =>
                        openDeleteConfirm('حذف بند الخطر', `هل أنت متأكد من حذف الخطر [${risk.riskUid}]؟`, () =>
                          deleteRisk(risk.riskUid)
                        )
                      }
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg transition cursor-pointer"
                      title="حذف الخطر"
                    >
                      <Trash2 className="w-4 h-4" />
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
