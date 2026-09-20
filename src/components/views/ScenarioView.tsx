import React, { useState } from 'react';
import { MOCK_CONTRACTS } from '../../data/mockData';
import { Sliders, TrendingUp, AlertTriangle, RefreshCw, Calculator } from 'lucide-react';

export const ScenarioView: React.FC = () => {
  const [selectedContractUid, setSelectedContractUid] = useState('CNT-2026-001');
  const [laborChange, setLaborChange] = useState<number>(0); // e.g. +10 => +10%
  const [materialChange, setMaterialChange] = useState<number>(0);
  const [fuelChange, setFuelChange] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);

  const baseContract = MOCK_CONTRACTS.find((c) => c.contractUid === selectedContractUid) || MOCK_CONTRACTS[0];

  // Base costs
  const baseLabor = baseContract.directLaborCost;
  const baseMat = baseContract.directMaterialsCost;
  const baseEquip = baseContract.directEquipmentCost;
  const baseFleet = baseContract.directFleetCost;

  // Adjusted costs
  const adjLabor = baseLabor * (1 + laborChange / 100);
  const adjMat = baseMat * (1 + materialChange / 100);
  const adjFleet = baseFleet * (1 + fuelChange / 100);

  const adjDirectCost = adjLabor + adjMat + baseEquip + adjFleet;
  const adjIndirectCost = adjDirectCost * 0.12;
  const adjAdminCost = adjDirectCost * 0.08;
  const adjContingency = adjDirectCost * 0.05;

  const newTotalCost = adjDirectCost + adjIndirectCost + adjAdminCost + adjContingency;

  // Adjusted Contract Price
  const newPrice = baseContract.contractPrice * (1 + priceChange / 100);
  const newProfit = newPrice - newTotalCost;
  const newMarginPercent = (newProfit / newPrice) * 100;

  const costVarianceAmount = newTotalCost - baseContract.totalCost;
  const profitVarianceAmount = newProfit - baseContract.grossProfit;

  const handleReset = () => {
    setLaborChange(0);
    setMaterialChange(0);
    setFuelChange(0);
    setPriceChange(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <span>36_تحليل السيناريوهات والتحليل الحساسية (Sensitivity Analysis ±5%, ±10%, ±15%, ±20%)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            محاكاة التغيرات السعرية وفي أجور العمالة والمواد والوقود وتقييم أثرها على الأرباح وهامش الربح
          </p>
        </div>

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

          <button
            onClick={handleReset}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة ضبط</span>
          </button>
        </div>
      </div>

      {/* Interactive Controls & Live Impact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sliders Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
          <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            محددات السيناريوهات والتغيرات المئوية
          </h2>

          {/* Labor Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">تغير تكلفة العمالة والأجور:</span>
              <span className={`font-mono font-bold ${laborChange > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {laborChange > 0 ? `+${laborChange}%` : `${laborChange}%`}
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="20"
              step="5"
              value={laborChange}
              onChange={(e) => setLaborChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-20%</span>
              <span>-10%</span>
              <span>0%</span>
              <span>+10%</span>
              <span>+20%</span>
            </div>
          </div>

          {/* Material Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">تغير أسعار المواد والمستهلكات:</span>
              <span className={`font-mono font-bold ${materialChange > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {materialChange > 0 ? `+${materialChange}%` : `${materialChange}%`}
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="20"
              step="5"
              value={materialChange}
              onChange={(e) => setMaterialChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-20%</span>
              <span>-10%</span>
              <span>0%</span>
              <span>+10%</span>
              <span>+20%</span>
            </div>
          </div>

          {/* Fuel & Fleet Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">تغير أسعار الوقود والنقل:</span>
              <span className={`font-mono font-bold ${fuelChange > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {fuelChange > 0 ? `+${fuelChange}%` : `${fuelChange}%`}
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="20"
              step="5"
              value={fuelChange}
              onChange={(e) => setFuelChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-20%</span>
              <span>-10%</span>
              <span>0%</span>
              <span>+10%</span>
              <span>+20%</span>
            </div>
          </div>

          {/* Price Adjustment Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">تعديل سعر العقد النهائي (الإيراد):</span>
              <span className={`font-mono font-bold ${priceChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {priceChange > 0 ? `+${priceChange}%` : `${priceChange}%`}
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="20"
              step="5"
              value={priceChange}
              onChange={(e) => setPriceChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-20%</span>
              <span>-10%</span>
              <span>0%</span>
              <span>+10%</span>
              <span>+20%</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>نتائج المحاكاة والتحليل المالي المباشر</span>
            </span>
            <span className="font-mono text-xs text-blue-400">{baseContract.contractUid}</span>
          </h2>

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-800/60 p-3 rounded-xl flex items-center justify-between">
              <span className="text-slate-300">التكلفة الإجمالية المعدلة:</span>
              <div className="text-left">
                <span className="font-bold text-white text-sm">{Math.round(newTotalCost).toLocaleString()} ر.س</span>
                <span className="block text-[10px] text-slate-400">
                  الأصلية: {baseContract.totalCost.toLocaleString()} ر.س ({costVarianceAmount >= 0 ? `+${Math.round(costVarianceAmount)}` : Math.round(costVarianceAmount)})
                </span>
              </div>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-xl flex items-center justify-between">
              <span className="text-slate-300">سعر العقد المعدل (الإيراد):</span>
              <div className="text-left">
                <span className="font-bold text-emerald-400 text-sm">{Math.round(newPrice).toLocaleString()} ر.س</span>
              </div>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-xl flex items-center justify-between">
              <span className="text-slate-300">صافي الربح المتوقع المعدل:</span>
              <div className="text-left">
                <span className={`font-bold text-sm ${newProfit >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>
                  {Math.round(newProfit).toLocaleString()} ر.س
                </span>
                <span className="block text-[10px] text-slate-400">
                  الأصلي: {baseContract.grossProfit.toLocaleString()} ر.س ({profitVarianceAmount >= 0 ? `+${Math.round(profitVarianceAmount)}` : Math.round(profitVarianceAmount)})
                </span>
              </div>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-xl flex items-center justify-between">
              <span className="text-slate-300">نسبة هامش الربح المعدلة:</span>
              <div className="text-left">
                <span className={`font-bold text-sm ${newMarginPercent >= 15 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {newMarginPercent.toFixed(1)}%
                </span>
                <span className="block text-[10px] text-slate-400">
                  المستهدف: 22.0% (الأصلي: {baseContract.profitMarginPercent.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          {newMarginPercent < 15 && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>تحذير: سيناريو الحساسية الحالي ينخفض بهامش الربح دون المعيار المقبول (15%)!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
