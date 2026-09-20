import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2 max-w-md w-full dir-rtl no-print">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        let borderColor = 'border-emerald-500/40 bg-slate-900/95';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />;
          borderColor = 'border-red-500/40 bg-slate-900/95';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;
          borderColor = 'border-blue-500/40 bg-slate-900/95';
        }

        return (
          <div
            key={toast.id}
            className={`p-3.5 rounded-xl border ${borderColor} text-white shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200`}
          >
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              {icon}
              <span className="leading-relaxed">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
