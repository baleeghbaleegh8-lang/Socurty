import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ConfirmDeleteModal: React.FC = () => {
  const { deleteConfirm, closeDeleteConfirm } = useApp();

  if (!deleteConfirm.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto dir-rtl text-right">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="bg-red-950/80 border-b border-red-500/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-red-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>تأكيد عملية الحذف</span>
          </div>
          <button
            onClick={closeDeleteConfirm}
            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <h4 className="text-sm font-bold text-white">{deleteConfirm.title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">{deleteConfirm.message}</p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={closeDeleteConfirm}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
            >
              إلغاء
            </button>
            <button
              onClick={deleteConfirm.onConfirm}
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-lg shadow-red-600/30"
            >
              حذف نهائي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
