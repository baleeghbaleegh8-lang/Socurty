import React, { useState } from 'react';
import { X, Briefcase, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddWorkOrderModal: React.FC = () => {
  const { addWorkOrderModalOpen, setAddWorkOrderModalOpen, addWorkOrder, contracts, sites } = useApp();

  const [title, setTitle] = useState('');
  const [contractUid, setContractUid] = useState(contracts[0]?.contractUid || 'CNT-2026-001');
  const [priority, setPriority] = useState<'عالي جداً' | 'عالي' | 'متوسط' | 'منخفض'>('متوسط');
  const [plannedCost, setPlannedCost] = useState<number>(12000);
  const [assignedSupervisor, setAssignedSupervisor] = useState('م. خالد السلمي');
  const [completionDate, setCompletionDate] = useState('2026-04-15');

  if (!addWorkOrderModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const matchedContract = contracts.find((c) => c.contractUid === contractUid);
    const matchedSite = sites.find((s) => s.contractUid === contractUid);

    addWorkOrder({
      title,
      contractUid,
      siteUid: matchedSite ? matchedSite.siteUid : 'STE-2001',
      siteName: matchedSite ? matchedSite.siteName : 'موقع تفصيلي',
      priority,
      plannedCost,
      actualCost: plannedCost * 0.95,
      assignedSupervisor,
      completionDate,
      status: 'قيد التنفيذ'
    });

    setTitle('');
    setAddWorkOrderModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto dir-rtl text-right">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">إصدار أمر عمل تشغيلي جديد</h3>
              <p className="text-xs text-slate-400">جدولة وتخصيص مهام الصيانة والنظافة والتشغيل</p>
            </div>
          </div>
          <button
            onClick={() => setAddWorkOrderModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">عنوان أمر العمل والمهمة *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: تعقيم شامل لمرافق المستشفى وتنظيف الواجهات"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">العقد المرتبط *</label>
              <select
                value={contractUid}
                onChange={(e) => setContractUid(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {contracts.map((c) => (
                  <option key={c.contractUid} value={c.contractUid}>
                    [{c.contractUid}] - {c.contractTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">الأولوية التشغيلية</label>
              <select
                value={priority}
                onChange={(e: any) => setPriority(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="عالي جداً">عالي جداً (طوارئ)</option>
                <option value="عالي">عالي (أولوية قصوى)</option>
                <option value="متوسط">متوسط (روتيني)</option>
                <option value="منخفض">منخفض (صيانة دورية)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">التكلفة التقديرية المخططة (ر.س)</label>
              <input
                type="number"
                min="0"
                value={plannedCost}
                onChange={(e) => setPlannedCost(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">المشرف المسؤول عن المتابعة</label>
              <input
                type="text"
                value={assignedSupervisor}
                onChange={(e) => setAssignedSupervisor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setAddWorkOrderModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-amber-500/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>إصدار أمر العمل</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
