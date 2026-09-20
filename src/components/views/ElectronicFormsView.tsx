import React, { useState } from 'react';
import {
  FileCheck,
  Printer,
  Plus,
  Download,
  Building2,
  Calendar,
  CheckCircle2,
  FileSpreadsheet,
  QrCode,
  UserCheck,
  Award,
  ShieldCheck,
  AlertCircle,
  Eye,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ElectronicFormsView: React.FC = () => {
  const { contracts, electronicForms, addElectronicForm, deleteElectronicForm, openDeleteConfirm } = useApp();

  const [activeFormType, setActiveFormType] = useState<'site_survey' | 'work_order' | 'tax_invoice' | 'sla_audit'>('site_survey');
  const [selectedFormId, setSelectedFormId] = useState<string | null>(electronicForms[0]?.id || null);

  // Site Survey Form State
  const [surveyContractUid, setSurveyContractUid] = useState(contracts[0]?.contractUid || 'CNT-2026-001');
  const [surveySiteName, setSurveySiteName] = useState('برج الأبراج المالي - الرياض');
  const [surveyTotalArea, setSurveyTotalArea] = useState<number>(45000);
  const [surveyBuildingType, setSurveyBuildingType] = useState('برج إداري مالي');
  const [surveyRequiredLabor, setSurveyRequiredLabor] = useState<number>(38);
  const [surveyInspectorName, setSurveyInspectorName] = useState('م. فهد الخالد');
  const [surveyNotes, setSurveyNotes] = useState('تم فحص المبنى بالكامل، يتطلب 3 ورديات على مدار 24 ساعة.');

  // E-Invoice State
  const [invContractUid, setInvContractUid] = useState(contracts[0]?.contractUid || 'CNT-2026-001');
  const [invNumber, setInvNumber] = useState('INV-2026-0305');
  const [invAmount, setInvAmount] = useState<number>(180000);
  const invVat = invAmount * 0.15;
  const invTotal = invAmount + invVat;

  // SLA Audit State
  const [slaContractUid, setSlaContractUid] = useState(contracts[0]?.contractUid || 'CNT-2026-001');
  const [slaAuditor, setSlaAuditor] = useState('م. عبد العزيز الشمري');
  const [slaScore, setSlaScore] = useState<number>(94);

  const selectedFormRecord = electronicForms.find((f) => f.id === selectedFormId);

  const handleCreateSurveyForm = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedContract = contracts.find((c) => c.contractUid === surveyContractUid);

    addElectronicForm({
      formType: 'site_survey',
      title: `استمارة مسح وتحديد احتياجات موقع - ${surveySiteName}`,
      contractUid: surveyContractUid,
      clientName: matchedContract ? matchedContract.clientName : 'عميل العقد',
      date: new Date().toISOString().split('T')[0],
      createdByName: surveyInspectorName,
      status: 'معتمد',
      data: {
        totalAreaSqm: surveyTotalArea,
        buildingType: surveyBuildingType,
        requiredLaborCount: surveyRequiredLabor,
        cleanlinessGrade: 'ممتاز',
        surveyNotes
      }
    });
  };

  const handleCreateInvoiceForm = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedContract = contracts.find((c) => c.contractUid === invContractUid);

    addElectronicForm({
      formType: 'tax_invoice',
      title: `نموذج فاتورة ضريبية إلكترونية - ${invNumber}`,
      contractUid: invContractUid,
      clientName: matchedContract ? matchedContract.clientName : 'عميل العقد',
      date: new Date().toISOString().split('T')[0],
      createdByName: 'المحاسب المسؤول',
      status: 'معتمد',
      data: {
        invoiceNumber: invNumber,
        grossAmount: invAmount,
        vatAmount: invVat,
        netInvoiceAmount: invTotal
      }
    });
  };

  const handleCreateSlaAuditForm = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedContract = contracts.find((c) => c.contractUid === slaContractUid);

    addElectronicForm({
      formType: 'sla_audit',
      title: `استمارة تقييم جودة الأداء وخصومات SLA - ${slaContractUid}`,
      contractUid: slaContractUid,
      clientName: matchedContract ? matchedContract.clientName : 'عميل العقد',
      date: new Date().toISOString().split('T')[0],
      createdByName: slaAuditor,
      status: 'معتمد',
      data: {
        slaScore,
        penaltyPercent: slaScore < 85 ? (85 - slaScore) * 0.5 : 0,
        auditorNotes: 'الأداء ممتاز وملتزم بمعايير الـ SLA المسجلة العقد.'
      }
    });
  };

  const handlePrintForm = () => {
    window.print();
  };

  return (
    <div className="space-y-6 dir-rtl text-right">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
            <FileCheck className="w-4 h-4" />
            <span>نظام النماذج والاستمارات الإلكترونية الرسمية</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            مركز إصدار وتدوين الاستمارات والتقارير التنفيذية إلكترونياً
          </h2>
          <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
            توليد وتدقيق الاستمارات الميدانية (مسح المواقع، الفواتير الضريبية الإلكترونية، استلام أوامر العمل، وتقييم جودة الـ SLA) الجاهزة للطباعة والتصدير.
          </p>
        </div>

        <button
          onClick={handlePrintForm}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition shadow-lg shadow-emerald-600/20 shrink-0 no-print"
        >
          <Printer className="w-4 h-4" />
          <span>طباعة الاستمارة الحالية (PDF)</span>
        </button>
      </div>

      {/* Main Grid: Saved Forms List + Form Creator / Printable Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Saved Forms Library (4 cols) */}
        <div className="lg:col-span-4 space-y-4 no-print">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-400" />
                سجل الاستمارات المحفوظة ({electronicForms.length})
              </h3>
            </div>

            {/* Form Type Tabs Selector */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-xl text-xs">
              <button
                onClick={() => setActiveFormType('site_survey')}
                className={`py-1.5 rounded-lg font-semibold transition ${
                  activeFormType === 'site_survey' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                مسح موقع
              </button>
              <button
                onClick={() => setActiveFormType('tax_invoice')}
                className={`py-1.5 rounded-lg font-semibold transition ${
                  activeFormType === 'tax_invoice' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                فاتورة ضريبية
              </button>
              <button
                onClick={() => setActiveFormType('sla_audit')}
                className={`py-1.5 rounded-lg font-semibold transition ${
                  activeFormType === 'sla_audit' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                تقييم SLA
              </button>
              <button
                onClick={() => setActiveFormType('work_order')}
                className={`py-1.5 rounded-lg font-semibold transition ${
                  activeFormType === 'work_order' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                إنجاز عمل
              </button>
            </div>

            {/* List of Forms */}
            <div className="space-y-2 max-h-96 overflow-y-auto no-scrollbar pt-1">
              {electronicForms.map((form) => {
                const isSelected = selectedFormId === form.id;
                return (
                  <div
                    key={form.id}
                    onClick={() => setSelectedFormId(form.id)}
                    className={`p-3 rounded-xl border text-right transition cursor-pointer flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-blue-950/60 border-blue-500/50 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-blue-400">{form.id}</span>
                      <h4 className="text-xs font-bold line-clamp-1">{form.title}</h4>
                      <p className="text-[10px] text-slate-400">
                        {form.clientName} • {form.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteConfirm('حذف النموذج الإلكتروني', `هل أنت تأكد من حذف الاستمارة [${form.id}]؟`, () =>
                            deleteElectronicForm(form.id)
                          );
                        }}
                        className="p-1 text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Form Generator / Electronic Printable Model (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Creator Tabs Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl no-print">
            <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              إنشاء استمارة جديدة سريعة
            </h3>

            {activeFormType === 'site_survey' && (
              <form onSubmit={handleCreateSurveyForm} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400">العقد المرتبط</label>
                    <select
                      value={surveyContractUid}
                      onChange={(e) => setSurveyContractUid(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    >
                      {contracts.map((c) => (
                        <option key={c.contractUid} value={c.contractUid}>
                          [{c.contractUid}] - {c.contractTitle}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400">اسم الموقع الميداني</label>
                    <input
                      type="text"
                      value={surveySiteName}
                      onChange={(e) => setSurveySiteName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400">المساحة المترية (م²)</label>
                    <input
                      type="number"
                      value={surveyTotalArea}
                      onChange={(e) => setSurveyTotalArea(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400">احتياج العمالة اليومي المقدر</label>
                    <input
                      type="number"
                      value={surveyRequiredLabor}
                      onChange={(e) => setSurveyRequiredLabor(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-md shadow-blue-600/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>اصدار واعتماد الاستمارة الإلكترونية</span>
                  </button>
                </div>
              </form>
            )}

            {activeFormType === 'tax_invoice' && (
              <form onSubmit={handleCreateInvoiceForm} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400">رقم الفاتورة الضريبية</label>
                    <input
                      type="text"
                      value={invNumber}
                      onChange={(e) => setInvNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400">المبلغ قبل الضريبة (ر.س)</label>
                    <input
                      type="number"
                      value={invAmount}
                      onChange={(e) => setInvAmount(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400">الإجمالي بالضريبة (15%)</label>
                    <input
                      type="text"
                      readOnly
                      value={`${invTotal.toLocaleString()} ر.س`}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-emerald-400 font-bold"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-md shadow-emerald-600/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>توليد الفاتورة الإلكترونية</span>
                  </button>
                </div>
              </form>
            )}

            {activeFormType === 'sla_audit' && (
              <form onSubmit={handleCreateSlaAuditForm} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400">العقد المقيّم</label>
                    <select
                      value={slaContractUid}
                      onChange={(e) => setSlaContractUid(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    >
                      {contracts.map((c) => (
                        <option key={c.contractUid} value={c.contractUid}>
                          [{c.contractUid}] - {c.contractTitle}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400">درجة التقييم النهائي SLA (100%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={slaScore}
                      onChange={(e) => setSlaScore(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition shadow-md shadow-amber-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>حفظ نموذج التقييم</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Electronic Printable Model Sheet (White Printable Paper Layout) */}
          <div className="bg-white text-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-300 font-sans print:shadow-none print:border-none print:p-0">
            {/* Header / Letterhead */}
            <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4 mb-6">
              <div className="space-y-1">
                <h1 className="text-xl font-extrabold text-slate-900">
                  شركة خدمات النظافة والتشغيل المتقدمة
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  Enterprise Soft Services Engineering & Facilities Management System
                </p>
                <p className="text-[11px] text-slate-500">
                  سجل تجاري: 1010889977 | الرقم الضريبي: 310998877600003
                </p>
              </div>

              <div className="text-left space-y-1">
                <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-lg shadow-md mb-1">
                  ESS
                </div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-300">
                  نموذج رسمـي معتمـد
                </span>
              </div>
            </div>

            {/* Model Dynamic Body */}
            {selectedFormRecord ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      كود الاستمارة: {selectedFormRecord.id}
                    </span>
                    <h2 className="text-base font-bold text-slate-900 mt-0.5">
                      {selectedFormRecord.title}
                    </h2>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
                      الحالة: {selectedFormRecord.status}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      التاريخ: {selectedFormRecord.date}
                    </p>
                  </div>
                </div>

                {/* Form Specs Table */}
                <table className="w-full text-xs text-slate-800 border-collapse border border-slate-300">
                  <tbody>
                    <tr className="border-b border-slate-300 bg-slate-100">
                      <td className="p-2.5 font-bold border-l border-slate-300 w-1/3">الجهة / العميل:</td>
                      <td className="p-2.5">{selectedFormRecord.clientName}</td>
                    </tr>
                    <tr className="border-b border-slate-300">
                      <td className="p-2.5 font-bold border-l border-slate-300">رمز العقد الموحد (UID):</td>
                      <td className="p-2.5 font-mono text-blue-700 font-bold">{selectedFormRecord.contractUid}</td>
                    </tr>
                    <tr className="border-b border-slate-300 bg-slate-100">
                      <td className="p-2.5 font-bold border-l border-slate-300">المسؤول عن التدوين:</td>
                      <td className="p-2.5">{selectedFormRecord.createdByName}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Data Details Box */}
                <div className="border border-slate-300 rounded-xl p-4 bg-slate-50/50 space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 border-b border-slate-300 pb-2 flex items-center justify-between">
                    <span>بيانات ومفردات الاستمارة الإلكترونية</span>
                    <QrCode className="w-5 h-5 text-slate-700" />
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {Object.entries(selectedFormRecord.data || {}).map(([key, val]) => (
                      <div key={key} className="bg-white p-2.5 rounded border border-slate-200">
                        <span className="text-[11px] text-slate-500 block">{key}</span>
                        <span className="font-bold text-slate-900">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official Signatures Footer */}
                <div className="pt-8 border-t-2 border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
                  <div className="space-y-8">
                    <p className="font-bold text-slate-800">اعتماد المشرف المسؤول / مهندس الموقع</p>
                    <div className="h-10 border-b-2 border-dashed border-slate-400 w-3/4 mx-auto flex items-end justify-center pb-1">
                      <span className="text-[10px] text-slate-400">(التوقيع الإلكتروني)</span>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <p className="font-bold text-slate-800">موافقة ممثل العميل / المدير المباشر</p>
                    <div className="h-10 border-b-2 border-dashed border-slate-400 w-3/4 mx-auto flex items-end justify-center pb-1">
                      <span className="text-[10px] text-slate-400">(الختم والتوقيع)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <FileCheck className="w-12 h-12 mx-auto text-slate-300" />
                <p className="text-sm font-bold text-slate-700">اختر استمارة من السجل لعرض النموذج وتوثيقه</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
