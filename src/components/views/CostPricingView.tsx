import React, { useState } from 'react';
import {
  MOCK_CONTRACTS,
  MOCK_LABOR,
  MOCK_MATERIALS,
  MOCK_EQUIPMENT,
  MOCK_FLEET,
  INITIAL_SETTINGS
} from '../../data/mockData';
import { DollarSign, Calculator, Users, Package, Truck, Wrench, Percent, PieChart } from 'lucide-react';

export const CostPricingView: React.FC = () => {
  const [selectedContractUid, setSelectedContractUid] = useState<string>('CNT-2026-001');

  const contract = MOCK_CONTRACTS.find((c) => c.contractUid === selectedContractUid) || MOCK_CONTRACTS[0];

  const contractLabor = MOCK_LABOR.filter((l) => l.contractUid === contract.contractUid);
  const contractMaterials = MOCK_MATERIALS.filter((m) => m.contractUid === contract.contractUid);
  const contractEquipment = MOCK_EQUIPMENT.filter((e) => e.contractUid === contract.contractUid);
  const contractFleet = MOCK_FLEET.filter((f) => f.contractUid === contract.contractUid);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <span>20_محرك احتساب التكلفة و 21_محرك التسعير والربحية</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            حساب التكاليف المباشرة وغير المباشرة وتطبيق معادلات التسعير وهامش الربح ونقطة التعادل
          </p>
        </div>

        {/* Contract Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300">اختر العقد:</span>
          <select
            value={selectedContractUid}
            onChange={(e) => setSelectedContractUid(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 font-mono font-bold"
          >
            {MOCK_CONTRACTS.map((c) => (
              <option key={c.contractUid} value={c.contractUid}>
                {c.contractUid} - {c.contractTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <span className="text-xs text-slate-400">إجمالي التكلفة المباشرة</span>
          <p className="text-xl font-black text-white">{contract.totalDirectCost.toLocaleString()} ر.س</p>
          <p className="text-[10px] text-slate-400">عمالة + مواد + معدات + نقل</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <span className="text-xs text-slate-400">التكاليف غير المباشرة والإدارية</span>
          <p className="text-xl font-black text-amber-400">
            {(contract.indirectCost + contract.administrativeCost + contract.contingencyReserve).toLocaleString()} ر.س
          </p>
          <p className="text-[10px] text-slate-400">
            غير مباشرة (12%) + إدارية (8%) + طوارئ (5%)
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <span className="text-xs text-slate-400">سعر العقد الإجمالي (الإيراد)</span>
          <p className="text-xl font-black text-emerald-400">{contract.contractPrice.toLocaleString()} ر.س</p>
          <p className="text-[10px] text-emerald-400">
            مع الضريبة (15%): {contract.totalPriceWithVat.toLocaleString()} ر.س
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <span className="text-xs text-slate-400">صافي الربح وهامش الربح</span>
          <p className="text-xl font-black text-blue-400">{contract.grossProfit.toLocaleString()} ر.س</p>
          <p className="text-[10px] text-blue-400">
            نسبة الهامش: {contract.profitMarginPercent.toFixed(1)}% (Markup: {contract.markupPercent.toFixed(1)}%)
          </p>
        </div>
      </div>

      {/* Cost Breakdown Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Labor Cost Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>11_تكلفة العمالة والوظائف (Labor Cost Breakdown)</span>
            </span>
            <span className="text-xs font-mono text-emerald-400">
              {contract.directLaborCost.toLocaleString()} ر.س
            </span>
          </h2>

          <div className="space-y-3">
            {contractLabor.map((lab) => (
              <div key={lab.employeeUid} className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{lab.jobTitle} ({lab.nationality})</span>
                  <span className="font-mono text-blue-400 font-bold">{lab.count} موظفين</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono">
                  <div>الراتب الأساسي: {lab.basicSalaryMonthly.toLocaleString()} ر.س</div>
                  <div>التأمينات الشهرية: {lab.insuranceCostMonthly.toLocaleString()} ر.س</div>
                  <div>التكلفة الشهرية للفرد: {lab.totalLaborCostMonthly.toLocaleString()} ر.س</div>
                  <div>التكلفة السنوية الكلية: <span className="text-emerald-400 font-bold">{lab.totalLaborCostAnnual.toLocaleString()} ر.س</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Materials & Equipment Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-400" />
              <span>13_المواد و 14_المعدات و 15_النقل</span>
            </span>
            <span className="text-xs font-mono text-emerald-400">
              {(contract.directMaterialsCost + contract.directEquipmentCost + contract.directFleetCost).toLocaleString()} ر.س
            </span>
          </h2>

          <div className="space-y-3 text-xs">
            {/* Materials */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-xl space-y-1">
              <span className="font-bold text-slate-200">المواد والمستهلكات (13)</span>
              {contractMaterials.map((m) => (
                <div key={m.materialUid} className="flex justify-between text-[11px] text-slate-300 font-mono">
                  <span>{m.materialName} ({m.monthlyQuantity} {m.unit}/شهر)</span>
                  <span className="text-amber-400 font-bold">{m.totalCost.toLocaleString()} ر.س</span>
                </div>
              ))}
            </div>

            {/* Equipment */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-xl space-y-1">
              <span className="font-bold text-slate-200">المعدات والأدوات (14)</span>
              {contractEquipment.map((eq) => (
                <div key={eq.equipmentUid} className="flex justify-between text-[11px] text-slate-300 font-mono">
                  <span>{eq.equipmentName} ({eq.acquisitionType})</span>
                  <span className="text-amber-400 font-bold">{eq.totalCost.toLocaleString()} ر.س</span>
                </div>
              ))}
            </div>

            {/* Fleet */}
            <div className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-xl space-y-1">
              <span className="font-bold text-slate-200">النقل والمركبات والوقود (15)</span>
              {contractFleet.map((fl) => (
                <div key={fl.vehicleUid} className="flex justify-between text-[11px] text-slate-300 font-mono">
                  <span>{fl.vehicleType}</span>
                  <span className="text-amber-400 font-bold">{fl.totalCost.toLocaleString()} ر.س</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
