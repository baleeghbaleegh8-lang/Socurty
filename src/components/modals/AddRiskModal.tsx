import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, AlertOctagon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddRiskModal: React.FC = () => {
  const { addRiskModalOpen, setAddRiskModalOpen, addRisk, contracts } = useApp();

  const [description, setDescription] = useState('');
  const [contractUid, setContractUid] = useState(contracts[0]?.contractUid || 'CNT-2026-001');
  const [category, setCategory] = useState<'مالية' | 'تشغيلية' | 'قانونية' | 'عمالة' | 'سلاسل الإمداد' | 'سلامة وجودة'>('تشغيلية');
  const [cause, setCause] = useState('تأخر توريد المواد والتأخير في صرف المستحقات');
  const [probability, setProbability] = useState<number>(3);
  const [impact, setImpact] = useState<number>(4);
  const [preventiveAction, setPreventiveAction] = useState('إدارة مخزون احتياطي بحد أدنى شهرين');
  const [correctiveAction, setCorrectiveAction] = useState('توجيه إخطار رسمي للعميل وتفعيل بند التعويض');
  const [potentialCostImpact, setPotentialCostImpact] = useState<number>(45000);

  if (!addRiskModalOpen) return null;

  const riskScore = probability * impact;
  let riskLevel = 'متوسط';
  let badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  if (riskScore >= 16) {
    riskLevel = 'حرج (Red Alert)';
    badgeColor = 'bg-red-500/20 text-red-400 border-red-500/30';
  } else if (riskScore >= 10) {
    riskLevel = 'عالي (High Risk)';
    badgeColor = 'bg-orange-500/20 text-orange-400 border-orange-500/30';
  } else if (riskScore >= 5) {
    riskLevel = 'متوسط (Moderate)';
    badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  } else {
    riskLevel = 'منخفض (Low)';
    badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    addRisk({
      description,
      contractUid,
      category,
      cause,
      probability,
      impact,
      preventiveAction,
      correctiveAction,
      potentialCostImpact,
      status: 'نشط'
    });

    setDescription('');
    setAddRiskModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto dir-rtl text-right">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">تسجيل وتحديد خطر جديد بالسجل</h3>
              <p className="text-xs text-slate-400">مصفوفة الاحتمالية والأثر التلقائية لخطة التخفيف</p>
            </div>
          </div>
          <button
            onClick={() => setAddRiskModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">وصف الخطر المحتمل *</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="مثال: مخاطرة نقص أعداد العمالة في أوقات الموسم وتأخر التأشيرات"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">العقد المرتبط</label>
              <select
                value={contractUid}
                onChange={(e) => setContractUid(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              >
                {contracts.map((c) => (
                  <option key={c.contractUid} value={c.contractUid}>
                    [{c.contractUid}] - {c.contractTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">تصنيف الخطر</label>
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="تشغيلية">تشغيلية</option>
                <option value="مالية">مالية وتدفقات</option>
                <option value="قانونية">قانونية وتطابق</option>
                <option value="عمالة">عمالة وتوطين</option>
                <option value="سلاسل الإمداد">سلاسل الإمداد</option>
                <option value="سلامة وجودة">سلامة وجودة</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">الاحتمالية (1 إلى 5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={probability}
                onChange={(e) => setProbability(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">الأثر المالي والتشغيلي (1 إلى 5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={impact}
                onChange={(e) => setImpact(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Matrix Result Preview Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400">درجة الخطر التلقائية (الاحتمالية × الأثر)</p>
              <p className="text-sm font-extrabold text-white mt-0.5">
                {probability} × {impact} = <span className="text-amber-400">{riskScore}</span>
              </p>
            </div>

            <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${badgeColor}`}>
              {riskLevel}
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">الإجراء الوقائي للتخفيف</label>
            <input
              type="text"
              value={preventiveAction}
              onChange={(e) => setPreventiveAction(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setAddRiskModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-lg shadow-red-600/30"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>تسجيل الخطر بالسجل</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
