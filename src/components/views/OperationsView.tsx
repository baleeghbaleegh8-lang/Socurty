import React, { useState } from 'react';
import { WorkOrder } from '../../types';
import { Briefcase, CheckCircle2, Clock, AlertTriangle, Plus, Search, Trash2, Edit } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OperationsView: React.FC = () => {
  const { workOrders, setAddWorkOrderModalOpen, updateWorkOrderStatus, deleteWorkOrder, openDeleteConfirm } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('الكل');

  const filteredOrders = workOrders.filter((wo) => {
    const matchesSearch =
      wo.workOrderUid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.siteName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority = priorityFilter === 'الكل' || wo.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-6 dir-rtl text-right">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-400" />
            <span>أوامر العمل والتشغيل الفعلي (Work Orders & Operations)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            إدارة أداء المواقع الميدانية وأوامر العمل المباشرة ومقارنة التكلفة المخططة بالتكلفة الفعلية
          </p>
        </div>

        <button
          onClick={() => setAddWorkOrderModalOpen(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إصدار أمر عمل جديد</span>
        </button>
      </div>

      {/* Filter & Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl shadow-md">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="بحث بـ Work Order UID أو العنوان..."
            className="w-full bg-slate-800 text-slate-100 text-xs pr-9 pl-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-500 placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-300 font-semibold">الأولوية:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="الكل">جميع الأولويات</option>
            <option value="عالي جداً">عالي جداً</option>
            <option value="عالي">عالي</option>
            <option value="متوسط">متوسط</option>
            <option value="منخفض">منخفض</option>
          </select>
        </div>
      </div>

      {/* Work Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right text-slate-300">
            <thead className="bg-slate-800/90 text-slate-200 border-b border-slate-700">
              <tr>
                <th className="p-3">Work Order UID</th>
                <th className="p-3">العقد / الموقع</th>
                <th className="p-3">عنوان المهمة</th>
                <th className="p-3">الأولوية</th>
                <th className="p-3">الحالة</th>
                <th className="p-3">التكلفة المخططة</th>
                <th className="p-3">التكلفة الفعلية</th>
                <th className="p-3">الانحراف</th>
                <th className="p-3">المشرف المسؤول</th>
                <th className="p-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.map((wo) => (
                <tr key={wo.workOrderUid} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-mono font-bold text-amber-400">{wo.workOrderUid}</td>
                  <td className="p-3">
                    <div className="font-semibold text-white">{wo.siteName}</div>
                    <span className="text-[10px] font-mono text-slate-400">{wo.contractUid}</span>
                  </td>
                  <td className="p-3 font-medium text-slate-100">{wo.title}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        wo.priority === 'عالي جداً' || wo.priority === 'عالي'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {wo.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        updateWorkOrderStatus(
                          wo.workOrderUid,
                          wo.status === 'مكتمل' ? 'قيد التنفيذ' : 'مكتمل'
                        )
                      }
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer transition flex items-center gap-1 ${
                        wo.status === 'مكتمل'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : wo.status === 'قيد التنفيذ'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                      title="اضغط لتغيير الحالة"
                    >
                      {wo.status === 'مكتمل' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      <span>{wo.status}</span>
                    </button>
                  </td>
                  <td className="p-3 font-mono">{wo.plannedCost.toLocaleString()} ر.س</td>
                  <td className="p-3 font-mono text-white">{wo.actualCost.toLocaleString()} ر.س</td>
                  <td
                    className={`p-3 font-mono font-bold ${
                      wo.costVariance >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {wo.costVariance.toLocaleString()} ر.س
                  </td>
                  <td className="p-3 text-slate-300">{wo.assignedSupervisor}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() =>
                        openDeleteConfirm(
                          'حذف أمر العمل',
                          `هل أنت متأكد من حذف أمر العمل [${wo.workOrderUid}]؟`,
                          () => deleteWorkOrder(wo.workOrderUid)
                        )
                      }
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg transition cursor-pointer"
                      title="حذف أمر العمل"
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
