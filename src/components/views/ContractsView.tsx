import React, { useState } from 'react';
import { Contract, ContractStatus } from '../../types';
import { FileSpreadsheet, Search, Filter, Eye, Plus, Trash2, Edit3, Building2, Calculator } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContractsView: React.FC = () => {
  const { contracts, setAddContractModalOpen, deleteContract, openDeleteConfirm } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('جميع الحالات');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.contractUid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.contractTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.clientName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'جميع الحالات' || contract.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 dir-rtl text-right">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-400" />
            <span>قاعدة بيانات العقود المركزية (Contracts Repository)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            سجل العقود الشامل المربوط بمعرفات الـ Contract UID والـ Client UID ومعادلات التكلفة والتسعير
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAddContractModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة عقد جديد</span>
          </button>
          <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-2 rounded-xl font-mono font-bold">
            {filteredContracts.length} عقد
          </span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl shadow-md">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="بحث بواسطة Contract UID أو عنوان العقد..."
            className="w-full bg-slate-800 text-slate-100 text-xs pr-9 pl-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>حالة العقد:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="جميع الحالات">جميع الحالات</option>
            <option value="نشط">نشط</option>
            <option value="قيد التفاوض">قيد التفاوض</option>
            <option value="قريب من الانتهاء">قريب من الانتهاء</option>
            <option value="مكتمل">مكتمل</option>
          </select>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right text-slate-300">
            <thead className="bg-slate-800/90 text-slate-200 border-b border-slate-700">
              <tr>
                <th className="p-3">Contract UID</th>
                <th className="p-3">العميل</th>
                <th className="p-3">عنوان العقد</th>
                <th className="p-3">الحالة</th>
                <th className="p-3">المرحلة</th>
                <th className="p-3">التكلفة المباشرة</th>
                <th className="p-3">التكلفة الإجمالية</th>
                <th className="p-3">سعر العقد (الإيراد)</th>
                <th className="p-3">صافي الربح</th>
                <th className="p-3">الهامش %</th>
                <th className="p-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredContracts.map((contract) => (
                <tr key={contract.contractUid} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-mono font-bold text-blue-400">{contract.contractUid}</td>
                  <td className="p-3">
                    <div className="font-semibold text-white">{contract.clientName}</div>
                    <span className="text-[10px] font-mono text-slate-400">{contract.clientUid}</span>
                  </td>
                  <td className="p-3 font-medium text-slate-100">{contract.contractTitle}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                        contract.status === 'نشط'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : contract.status === 'قيد التفاوض'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : contract.status === 'قريب من الانتهاء'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {contract.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] border border-slate-700">
                      {contract.lifecycleStage}
                    </span>
                  </td>
                  <td className="p-3 font-mono">{contract.totalDirectCost.toLocaleString()} ر.س</td>
                  <td className="p-3 font-mono">{contract.totalCost.toLocaleString()} ر.س</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">
                    {contract.contractPrice.toLocaleString()} ر.س
                  </td>
                  <td className="p-3 font-mono font-bold text-amber-400">
                    {contract.grossProfit.toLocaleString()} ر.س
                  </td>
                  <td className="p-3 font-mono font-bold text-blue-400">
                    {contract.profitMarginPercent.toFixed(1)}%
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setSelectedContract(contract)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-lg transition"
                        title="عرض تفاصيل العقد"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          openDeleteConfirm('حذف العقد', `هل أنت متأكد من حذف العقد [${contract.contractUid}]؟`, () =>
                            deleteContract(contract.contractUid)
                          )
                        }
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg transition"
                        title="حذف العقد"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Contract Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 text-xs text-slate-200 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{selectedContract.contractTitle}</h3>
                <span className="font-mono text-blue-400 font-bold">{selectedContract.contractUid}</span>
              </div>
              <button
                onClick={() => setSelectedContract(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/60 p-3 rounded-xl space-y-1">
                <span className="text-slate-400">العميل</span>
                <p className="font-bold text-white">{selectedContract.clientName}</p>
                <p className="font-mono text-[10px] text-slate-400">{selectedContract.clientUid}</p>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl space-y-1">
                <span className="text-slate-400">الحالة والمرحلة</span>
                <p className="font-bold text-emerald-400">{selectedContract.status}</p>
                <p className="text-[11px] text-slate-300">{selectedContract.lifecycleStage}</p>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl space-y-1">
                <span className="text-slate-400">مدة العقد والتواريخ</span>
                <p className="font-bold text-white">
                  {selectedContract.startDate} إلى {selectedContract.endDate}
                </p>
                <p className="text-[11px] text-slate-300">{selectedContract.durationMonths} شهور</p>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl space-y-1">
                <span className="text-slate-400">مدير العقد المسؤول</span>
                <p className="font-bold text-white">{selectedContract.assignedManager}</p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl space-y-2 border border-slate-800">
              <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-1">التحليل المالي التفصيلي (معادلات تلقائية)</h4>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div>التكلفة المباشرة: <span className="text-white font-bold">{selectedContract.totalDirectCost.toLocaleString()} ر.س</span></div>
                <div>التكلفة غير المباشرة: <span className="text-white font-bold">{selectedContract.indirectCost.toLocaleString()} ر.س</span></div>
                <div>التكلفة الكلية: <span className="text-amber-400 font-bold">{selectedContract.totalCost.toLocaleString()} ر.س</span></div>
                <div>سعر العقد (الإيراد): <span className="text-emerald-400 font-bold">{selectedContract.contractPrice.toLocaleString()} ر.س</span></div>
                <div>صافي الربح المتوقع: <span className="text-blue-400 font-bold">{selectedContract.grossProfit.toLocaleString()} ر.س</span></div>
                <div>نسبة هامش الربح: <span className="text-amber-400 font-bold">{selectedContract.profitMarginPercent.toFixed(1)}%</span></div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedContract(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-lg"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
