import React from 'react';
import {
  FileSpreadsheet,
  Building2,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowUpRight,
  PieChart,
  PlusCircle,
  Briefcase
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_AUDIT_LOG } from '../../data/mockData';

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { contracts, clients, sites, workOrders, invoices, risks, setAddContractModalOpen, setAddWorkOrderModalOpen } = useApp();

  const totalContracts = contracts.length;
  const activeContracts = contracts.filter((c) => c.status === 'نشط').length;
  const nearExpiryContracts = contracts.filter((c) => c.status === 'قريب من الانتهاء').length;
  const negotiatingContracts = contracts.filter((c) => c.status === 'قيد التفاوض').length;

  const totalContractRevenue = contracts.reduce((sum, c) => sum + c.contractPrice, 0);
  const totalContractCost = contracts.reduce((sum, c) => sum + c.totalCost, 0);
  const totalGrossProfit = contracts.reduce((sum, c) => sum + c.grossProfit, 0);
  const avgMargin = totalContractRevenue > 0 ? (totalGrossProfit / totalContractRevenue) * 100 : 0;

  const totalCollected = invoices.reduce((sum, inv) => sum + inv.collectedAmount, 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.remainingBalance, 0);

  const highRisksCount = risks.filter((r) => r.riskLevel === 'عالي' || r.riskLevel === 'حرج').length;

  return (
    <div className="space-y-6 dir-rtl text-right">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-400" />
            <span>لوحة التحكم التنفيذية الشاملة (Executive Dashboard)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            مؤشرات أداء عقود الخدمات الناعمة المحسوبة تلقائياً وبشكل ديناميكي عبر مراجع الـ Contract UID
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setAddContractModalOpen(true)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>إضافة عقد جديد</span>
          </button>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-2 rounded-xl font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>بيانات ديناميكية محدثة</span>
          </span>
        </div>
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Contracts */}
        <div
          onClick={() => onNavigate('contracts')}
          className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 cursor-pointer hover:border-blue-500/50 transition group shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">إجمالي العقود النشطة</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">{totalContracts} عقد</div>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-bold">{activeContracts} نشط</span> • {negotiatingContracts} قيد التفاوض
            </p>
          </div>
        </div>

        {/* Card 2: Revenue */}
        <div
          onClick={() => onNavigate('cost_pricing')}
          className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 cursor-pointer hover:border-emerald-500/50 transition group shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">إجمالي قيمة التعاقدات (الإيراد)</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-400">
              {(totalContractRevenue / 1000000).toFixed(2)}M ر.س
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              صافي الربح المستهدف: <span className="text-amber-400 font-bold">{(totalGrossProfit / 1000000).toFixed(2)}M ر.س</span>
            </p>
          </div>
        </div>

        {/* Card 3: Profit Margin */}
        <div
          onClick={() => onNavigate('scenarios')}
          className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 cursor-pointer hover:border-amber-500/50 transition group shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">متوسط هامش الربح %</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-amber-400">{avgMargin.toFixed(1)}%</div>
            <p className="text-[11px] text-slate-400 mt-1">أعجل تكلفة كلية: {(totalContractCost / 1000000).toFixed(2)}M ر.س</p>
          </div>
        </div>

        {/* Card 4: Risks Alert */}
        <div
          onClick={() => onNavigate('risks_kpi')}
          className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 cursor-pointer hover:border-rose-500/50 transition group shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">سجل المخاطر النشطة</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-rose-400">{risks.length} بند</div>
            <p className="text-[11px] text-slate-400 mt-1">
              منها <span className="text-red-400 font-bold">{highRisksCount} عالية الخطورة</span>
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Live Contracts & Work Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Contracts Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-blue-400" />
              <span>أبرز العقود المعتمدة بالسجل</span>
            </h2>
            <button
              onClick={() => onNavigate('contracts')}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
            >
              <span>عرض الكل</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right text-slate-300">
              <thead className="bg-slate-800/80 text-slate-200 border-b border-slate-700">
                <tr>
                  <th className="p-2.5">UID</th>
                  <th className="p-2.5">العميل والمشروع</th>
                  <th className="p-2.5">الحالة</th>
                  <th className="p-2.5">الإيراد</th>
                  <th className="p-2.5">الهامش %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {contracts.slice(0, 5).map((contract) => (
                  <tr key={contract.contractUid} className="hover:bg-slate-800/40 transition">
                    <td className="p-2.5 font-mono text-blue-400 font-bold">{contract.contractUid}</td>
                    <td className="p-2.5">
                      <div className="font-semibold text-white">{contract.clientName}</div>
                      <span className="text-[10px] text-slate-400">{contract.contractTitle}</span>
                    </td>
                    <td className="p-2.5">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-semibold">
                        {contract.status}
                      </span>
                    </td>
                    <td className="p-2.5 font-mono text-emerald-400 font-bold">
                      {contract.contractPrice.toLocaleString()} ر.س
                    </td>
                    <td className="p-2.5 font-mono text-amber-400 font-bold">
                      {contract.profitMarginPercent.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Work Orders */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>أوامر العمل والتشغيل الميداني ({workOrders.length})</span>
            </h2>
            <button
              onClick={() => onNavigate('operations')}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <span>إدارة الأوامر</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {workOrders.slice(0, 4).map((wo) => (
              <div
                key={wo.workOrderUid}
                className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-0.5">
                  <span className="font-mono text-amber-400 font-bold text-[11px]">{wo.workOrderUid}</span>
                  <h4 className="font-bold text-white">{wo.title}</h4>
                  <p className="text-[10px] text-slate-400">{wo.siteName} • المشرف: {wo.assignedSupervisor}</p>
                </div>

                <div className="text-left shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      wo.status === 'مكتمل'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {wo.status}
                  </span>
                  <p className="font-mono text-[11px] font-bold text-slate-200 mt-1">
                    {wo.plannedCost.toLocaleString()} ر.س
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
