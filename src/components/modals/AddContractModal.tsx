import React, { useState } from 'react';
import { X, Building2, Calculator, CheckCircle2, DollarSign, Calendar, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddContractModal: React.FC = () => {
  const { addContractModalOpen, setAddContractModalOpen, addContract, clients, settings } = useApp();

  const [contractTitle, setContractTitle] = useState('');
  const [selectedClientUid, setSelectedClientUid] = useState(clients[0]?.clientUid || 'CLT-1001');
  const [durationMonths, setDurationMonths] = useState<number>(36);
  const [sitesCount, setSitesCount] = useState<number>(1);
  const [assignedManager, setAssignedManager] = useState('م. فهد الخالد');

  // Direct Costs Inputs
  const [directLaborCost, setDirectLaborCost] = useState<number>(1200000);
  const [directMaterialsCost, setDirectMaterialsCost] = useState<number>(250000);
  const [directEquipmentCost, setDirectEquipmentCost] = useState<number>(150000);
  const [directFleetCost, setDirectFleetCost] = useState<number>(80000);

  // Dynamic Formula Calculations
  const totalDirectCost = directLaborCost + directMaterialsCost + directEquipmentCost + directFleetCost;
  const indirectCost = totalDirectCost * settings.indirectCostRate;
  const administrativeCost = totalDirectCost * settings.administrativeExpenseRate;
  const contingencyReserve = totalDirectCost * settings.contingencyRate;
  const totalCost = totalDirectCost + indirectCost + administrativeCost + contingencyReserve;

  // Pricing based on target margin
  const calculatedContractPrice = Math.round(totalCost / (1 - settings.targetProfitMargin));
  const [customContractPrice, setCustomContractPrice] = useState<number>(0);

  const finalPrice = customContractPrice > 0 ? customContractPrice : calculatedContractPrice;
  const vatAmount = finalPrice * settings.vatRate;
  const totalPriceWithVat = finalPrice + vatAmount;
  const grossProfit = finalPrice - totalCost;
  const profitMarginPercent = finalPrice > 0 ? (grossProfit / finalPrice) * 100 : 0;
  const monthlyBilling = durationMonths > 0 ? finalPrice / durationMonths : 0;

  if (!addContractModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractTitle.trim()) return;

    const selectedClient = clients.find((c) => c.clientUid === selectedClientUid);

    addContract({
      contractTitle,
      clientUid: selectedClientUid,
      clientName: selectedClient ? selectedClient.name : 'عميل محدد',
      durationMonths,
      sitesCount,
      assignedManager,
      directLaborCost,
      directMaterialsCost,
      directEquipmentCost,
      directFleetCost,
      contractPrice: finalPrice
    });

    // Reset and close
    setContractTitle('');
    setAddContractModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto dir-rtl text-right">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                إضافة عقد خدمات جديد (ربط تلقائي بالمعادلات)
              </h3>
              <p className="text-xs text-slate-400">
                حساب آلي للتكاليف المباشرة وغير المباشرة، الضريبة، وهامش الربح المستهدف
              </p>
            </div>
          </div>
          <button
            onClick={() => setAddContractModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">مسمى العقد والمشروع *</label>
              <input
                type="text"
                required
                value={contractTitle}
                onChange={(e) => setContractTitle(e.target.value)}
                placeholder="مثال: عقد خدمات النظافة والأمن والمساحات الخضراء"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">العميل المستهدف *</label>
              <select
                value={selectedClientUid}
                onChange={(e) => setSelectedClientUid(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                {clients.map((c) => (
                  <option key={c.clientUid} value={c.clientUid}>
                    {c.name} ({c.city})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">مدة العقد (بالأشهر)</label>
              <input
                type="number"
                min="1"
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">عدد المواقع المشمولة</label>
              <input
                type="number"
                min="1"
                value={sitesCount}
                onChange={(e) => setSitesCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Direct Costs Breakdown Section */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
              <Calculator className="w-4 h-4" />
              <span>مدخلات التكاليف المباشرة (ر.س)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">تكلفة العمالة المباشرة</label>
                <input
                  type="number"
                  value={directLaborCost}
                  onChange={(e) => setDirectLaborCost(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">تكلفة المواد والاستهلاك</label>
                <input
                  type="number"
                  value={directMaterialsCost}
                  onChange={(e) => setDirectMaterialsCost(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">تكلفة المعدات والإهلاك</label>
                <input
                  type="number"
                  value={directEquipmentCost}
                  onChange={(e) => setDirectEquipmentCost(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">تكلفة الأسطول والمحروقات</label>
                <input
                  type="number"
                  value={directFleetCost}
                  onChange={(e) => setDirectFleetCost(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Auto-calculated Formula Preview Box */}
          <div className="bg-gradient-to-r from-blue-950/60 via-slate-950 to-indigo-950/60 border border-blue-500/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-white border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Calculator className="w-4 h-4" />
                نتائج المعادلة التلقائية للنظام
              </span>
              <span className="text-amber-400 text-[11px]">
                هامش ربح مستهدف: {(settings.targetProfitMargin * 100).toFixed(0)}%
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <p className="text-slate-400 text-[10px]">إجمالي التكلفة المباشرة</p>
                <p className="font-extrabold text-white mt-0.5">{totalDirectCost.toLocaleString()} ر.س</p>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <p className="text-slate-400 text-[10px]">التكاليف غير المباشرة والإدارية</p>
                <p className="font-extrabold text-amber-400 mt-0.5">
                  {(indirectCost + administrativeCost + contingencyReserve).toLocaleString()} ر.س
                </p>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <p className="text-slate-400 text-[10px]">إجمالي التكلفة الكلية</p>
                <p className="font-extrabold text-red-400 mt-0.5">{totalCost.toLocaleString()} ر.س</p>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <p className="text-slate-400 text-[10px]">السعر المقترح قبل الضريبة</p>
                <p className="font-extrabold text-emerald-400 mt-0.5">
                  {calculatedContractPrice.toLocaleString()} ر.س
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-slate-400 text-[10px]">الدفعة الشهرية المستحقة للفوترة</p>
                <p className="font-bold text-blue-300">{Math.round(monthlyBilling).toLocaleString()} ر.س / شهرياً</p>
              </div>

              <div>
                <p className="text-slate-400 text-[10px]">ضريبة القيمة المضافة (15%)</p>
                <p className="font-bold text-slate-300">{Math.round(vatAmount).toLocaleString()} ر.س</p>
              </div>

              <div>
                <p className="text-slate-400 text-[10px]">الإجمالي الشامل للضريبة</p>
                <p className="font-extrabold text-emerald-300">{Math.round(totalPriceWithVat).toLocaleString()} ر.س</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setAddContractModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-lg shadow-blue-600/30"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>حفظ وحساب العقد فوراً</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
