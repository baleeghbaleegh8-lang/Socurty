import React, { useState } from 'react';
import { INITIAL_SETTINGS, DATA_DICTIONARY, MOCK_AUDIT_LOG } from '../../data/mockData';
import { Settings, Database, FileText, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export const SettingsRefView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'refs' | 'dict' | 'audit'>('settings');
  const [settingsState, setSettingsState] = useState(INITIAL_SETTINGS);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <span>39_المرجعيات و 40_قاموس البيانات و 41_سجل التدقيق و 42_الإعدادات</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            إدارة النِّسَب النظامية، القوائم المرجعية المركزية، قاموس المصطلحات، وسجل الفحوصات والتنبيهات
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-lg font-bold transition ${
            activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          42_الإعدادات والنِّسَب
        </button>

        <button
          onClick={() => setActiveTab('refs')}
          className={`px-4 py-2 rounded-lg font-bold transition ${
            activeTab === 'refs' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          39_القوائم والمرجعيات
        </button>

        <button
          onClick={() => setActiveTab('dict')}
          className={`px-4 py-2 rounded-lg font-bold transition ${
            activeTab === 'dict' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          40_قاموس البيانات
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-lg font-bold transition ${
            activeTab === 'audit' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          41_سجل التدقيق (Audit)
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'settings' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            42_إعدادات النظام والنِّسَب النظامية (Central System Settings)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <label className="font-bold text-slate-200 block">نسبة التكاليف غير المباشرة (Indirect Cost Rate)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={settingsState.indirectCostRate}
                  onChange={(e) => setSettingsState({ ...settingsState, indirectCostRate: parseFloat(e.target.value) || 0 })}
                  className="bg-slate-950 text-white font-mono px-3 py-1.5 rounded border border-slate-700 w-32"
                />
                <span className="text-amber-400 font-mono">({(settingsState.indirectCostRate * 100).toFixed(1)}%)</span>
              </div>
              <p className="text-[11px] text-slate-400">تُطبق على التكاليف المباشرة لحساب غير المباشرة</p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <label className="font-bold text-slate-200 block">نسبة المصاريف الإدارية (SG&A Rate)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={settingsState.administrativeExpenseRate}
                  onChange={(e) => setSettingsState({ ...settingsState, administrativeExpenseRate: parseFloat(e.target.value) || 0 })}
                  className="bg-slate-950 text-white font-mono px-3 py-1.5 rounded border border-slate-700 w-32"
                />
                <span className="text-amber-400 font-mono">({(settingsState.administrativeExpenseRate * 100).toFixed(1)}%)</span>
              </div>
              <p className="text-[11px] text-slate-400">مصاريف الإدارة العامة والدعم التشغيلي</p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <label className="font-bold text-slate-200 block">نسبة ضريبة القيمة المضافة (VAT Rate)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={settingsState.vatRate}
                  onChange={(e) => setSettingsState({ ...settingsState, vatRate: parseFloat(e.target.value) || 0 })}
                  className="bg-slate-950 text-white font-mono px-3 py-1.5 rounded border border-slate-700 w-32"
                />
                <span className="text-emerald-400 font-mono">({(settingsState.vatRate * 100).toFixed(1)}%)</span>
              </div>
              <p className="text-[11px] text-slate-400">الضريبة المطبقة على العقود والفواتير</p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <label className="font-bold text-slate-200 block">هامش الربح المستهدف (Target Profit Margin)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={settingsState.targetProfitMargin}
                  onChange={(e) => setSettingsState({ ...settingsState, targetProfitMargin: parseFloat(e.target.value) || 0 })}
                  className="bg-slate-950 text-white font-mono px-3 py-1.5 rounded border border-slate-700 w-32"
                />
                <span className="text-blue-400 font-mono">({(settingsState.targetProfitMargin * 100).toFixed(1)}%)</span>
              </div>
              <p className="text-[11px] text-slate-400">الهامش القياسي لحساب التسعير الموصى به</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'refs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            39_القوائم والمرجعيات المركزية (Central Reference Lists)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-800/60 p-3 rounded-xl space-y-2 border border-slate-700">
              <span className="font-bold text-amber-400 block">حالات العقود</span>
              <ul className="space-y-1 text-slate-300">
                <li>• نشط</li>
                <li>• قيد التفاوض</li>
                <li>• قريب من الانتهاء</li>
                <li>• مكتمل</li>
                <li>• معلق / ملغى</li>
              </ul>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-xl space-y-2 border border-slate-700">
              <span className="font-bold text-blue-400 block">أنواع الخدمات الناعمة</span>
              <ul className="space-y-1 text-slate-300">
                <li>• النظافة العامة والشاملة</li>
                <li>• الأمن والحراسات</li>
                <li>• مكافحة الآفات والحشرات</li>
                <li>• العناية بالحدائق</li>
                <li>• الضيافة والمكاتب</li>
              </ul>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-xl space-y-2 border border-slate-700">
              <span className="font-bold text-emerald-400 block">فئات المخاطر</span>
              <ul className="space-y-1 text-slate-300">
                <li>• مالية</li>
                <li>• تشغيلية</li>
                <li>• قانونية</li>
                <li>• عمالة</li>
                <li>• سلامة وجودة</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'dict' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            40_قاموس البيانات (Data Dictionary & Schema)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right text-slate-300">
              <thead className="bg-slate-800 text-slate-200">
                <tr>
                  <th className="p-2.5">اسم الحقل / المتغير</th>
                  <th className="p-2.5">نوع البيانات والربط</th>
                  <th className="p-2.5">الوصف والمنطق الحسابي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {DATA_DICTIONARY.map((dict, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-bold text-blue-400">{dict.field}</td>
                    <td className="p-2.5 font-mono text-slate-300">{dict.type}</td>
                    <td className="p-2.5 text-slate-300">{dict.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            41_سجل التدقيق والفحوصات الآلية (Audit Log)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right text-slate-300">
              <thead className="bg-slate-800 text-slate-200">
                <tr>
                  <th className="p-2.5">معرف السجل</th>
                  <th className="p-2.5">التاريخ والوقت</th>
                  <th className="p-2.5">فئة الفحص</th>
                  <th className="p-2.5">درجة الأهمية</th>
                  <th className="p-2.5">تفاصيل التنبيه أو الفحص</th>
                  <th className="p-2.5">UID المرتبط</th>
                  <th className="p-2.5">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {MOCK_AUDIT_LOG.map((aud) => (
                  <tr key={aud.auditId} className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-mono text-blue-400">{aud.auditId}</td>
                    <td className="p-2.5 font-mono text-slate-400">{aud.timestamp}</td>
                    <td className="p-2.5 font-bold text-white">{aud.ruleCategory}</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {aud.severity}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-200">{aud.message}</td>
                    <td className="p-2.5 font-mono text-blue-300">{aud.affectedUid}</td>
                    <td className="p-2.5 font-bold text-emerald-400">{aud.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
