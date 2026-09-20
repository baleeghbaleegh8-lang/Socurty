import React from 'react';
import {
  Building2,
  FileSpreadsheet,
  Workflow,
  Calculator,
  ShieldCheck,
  BarChart2,
  CheckCircle2,
  Download,
  ArrowLeft,
  Database,
  Sliders,
  Sparkles
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onExportExcel: () => void;
  isExporting?: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onExportExcel, isExporting }) => {
  const sheetList = [
    { num: '01', name: 'الرئيسية', desc: 'واجهة النظام والتنقل السريع' },
    { num: '02', name: 'لوحة التحكم', desc: 'Dashboard تفاعلي للمؤشرات والتنبيهات' },
    { num: '03', name: 'العملاء', desc: 'قاعدة بيانات سجلات العملاء والحد الائتماني' },
    { num: '04', name: 'الفرص', desc: 'إدارة فرص المناقصات والعقود المتاحة' },
    { num: '05', name: 'التأهيل والجدوى', desc: 'دراسة أهلية الفرصة والجدوى الفنية والمالية' },
    { num: '06', name: 'العقود', desc: 'قاعدة بيانات العقود المركزية المربوطة بالمعرفات' },
    { num: '07', name: 'دورة حياة العقد', desc: 'متابعة مراحل العقد الـ 20 بالكامل والمسؤوليات' },
    { num: '08', name: 'المواقع', desc: 'إدارة المنشآت والمرافق والمساحات ورؤساء المواقع' },
    { num: '09', name: 'كتالوج الخدمات', desc: 'دليل خدمات النظافة والأمن والحدائق والضيافة والتعقيم' },
    { num: '10', name: 'دراسة الموقع', desc: 'Site Survey والمسح الميداني ومتطلبات التشغيل' },
    { num: '11', name: 'العمالة والوظائف', desc: 'حساب الأجور الأساسية والبدلات والتأمينات والبدلاء' },
    { num: '12', name: 'الورديات والساعات', desc: 'الورديات والساعات والإضافي ومعدلات الإنتاجية' },
    { num: '13', name: 'المواد والمستهلكات', desc: 'كميات وأسعار مواد النظافة والتعقيم والمستهلكات' },
    { num: '14', name: 'المعدات والأدوات', desc: 'تكلفة إيجار أو شراء وإهلاك معدات جلي الرخام والغسيل' },
    { num: '15', name: 'النقل والوقود', desc: 'أسطول حافلات نقل العمالة والوقود والصيانة والسيارات' },
    { num: '16', name: 'التكاليف المباشرة', desc: 'تجميع التكاليف المباشرة (عمالة + مواد + معدات + نقل)' },
    { num: '17', name: 'التكاليف غير المباشرة', desc: 'محرك احتساب التكاليف غير المباشرة وفق الإعدادات' },
    { num: '18', name: 'المصاريف الإدارية', desc: 'المصاريف الإدارية والتشغيلية العامة وحصص الدعم' },
    { num: '19', name: 'الالتزامات والضرائب', desc: 'حساب ضريبة القيمة المضافة 15% والالتزامات النظامية' },
    { num: '20', name: 'محرك التكلفة', desc: 'المحرك المركزي لتجميع التكلفة الإجمالية' },
    { num: '21', name: 'التسعير', desc: 'حساب سعر البيع، الهامش %، والـ Markup' },
    { num: '22', name: 'الربحية', desc: 'تحليل الربحية ونقطة التعادل ومساهمة الخدمات' },
    { num: '23', name: 'أوامر العمل', desc: 'Work Orders وأوامر الخدمة الطارئة والخاصة' },
    { num: '24', name: 'التشغيل الفعلي', desc: 'تسجيل التكاليف والساعات الفعلية وتأكيد الإنجاز' },
    { num: '25', name: 'الفوترة', desc: 'إصدار الفواتير والمستخلصات وحساب الغرامات والضريبة' },
    { num: '26', name: 'التحصيل', desc: 'متابعة الدفعات النقدية وأعمار الذمم (AR Aging)' },
    { num: '27', name: 'الانحرافات', desc: 'مقارنة المخطط مقابل الفعلي (Variance Analysis)' },
    { num: '28', name: 'إدارة التغيير', desc: 'سجل التغييرات في نطاق العقد والأثر المالي والزمني' },
    { num: '29', name: 'المطالبات', desc: 'سجل المطالبات المالية والقانونية والتسويات' },
    { num: '30', name: 'المخاطر', desc: 'سجل ومصفوفة المخاطر 5x5 وخطط التخفيف' },
    { num: '31', name: 'KPI / SLA', desc: 'مؤشرات الأداء والجودة ومستويات الخدمة الملتزم بها' },
    { num: '32', name: 'الجودة والسلامة', desc: 'معايير HSE والصحة المهنية وملاحظات السلامة' },
    { num: '33', name: 'التجديد والتمديد', desc: 'مراقبة انتهاء العقود ودراسة خيارات التجديد والتسعير' },
    { num: '34', name: 'الإغلاق', desc: 'Checklist إغلاق العقود والتسويات النهائية' },
    { num: '35', name: 'التقييم بعد العقد', desc: 'مراجعة أداء العقد والدروس المستفادة' },
    { num: '36', name: 'السيناريوهات', desc: 'تحليل الحساسية (±5% إلى ±20%) وأثر تغير الأسعار' },
    { num: '37', name: 'المقارنات', desc: 'مقارنة أداء العقود والخدمات والمواقع تفاعلياً' },
    { num: '38', name: 'التقارير', desc: 'مركز التقارير التنفيذية الـ 20 المعتمدة' },
    { num: '39', name: 'القوائم والمرجعيات', desc: 'القوائم المرجعية المركزية الموحدة لجميع Dropdowns' },
    { num: '40', name: 'قاموس البيانات', desc: 'Data Dictionary لمعاني الجداول والعلاقات' },
    { num: '41', name: 'سجل التدقيق', desc: 'Audit Log للفحوصات والتنبيهات المكتشفة آلياً' },
    { num: '42', name: 'الإعدادات', desc: 'المتغيرات والنِّسَب النظامية الموحدة (Settings)' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-800/40 p-8 shadow-2xl">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نظام مؤسسي شامل 100% متوافق مع معايير إدارة المرافق والخدمات الناعمة</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            نظام إدارة وتحليل وتقييم عقود الخدمات الناعمة
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            نظام متكامل مبني بمعمارية ربط سداسية تعتمد على مفتاح <code className="bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded text-xs font-mono">Contract UID</code> لتتبع دورة حياة العقود، التكاليف المباشرة وغير المباشرة، محركات التسعير والربحية، إدارة أوامر العمل، المخاطر، الـ KPIs، الفوترة، والسيناريوهات الحساسة عبر 42 ورقة عمل متخصصة.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              <span>دخول لوحة التحكم</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onExportExcel}
              disabled={isExporting}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-emerald-600/30 border border-emerald-500/30 cursor-pointer disabled:cursor-not-allowed"
            >
              <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
              <span>{isExporting ? 'جاري إنشاء وتنزيل الملف...' : 'تحميل نظام Excel المتكامل (.xlsx)'}</span>
            </button>

            <button
              onClick={() => onNavigate('python_colab')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-5 py-2.5 rounded-xl transition border border-slate-700 cursor-pointer"
            >
              <Database className="w-4 h-4 text-blue-400" />
              <span>عرض كود Python لـ Google Colab</span>
            </button>
          </div>
        </div>
      </div>

      {/* Direct Download Banner Box */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950/90 border-2 border-emerald-500/40 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-right">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Download className="w-5 h-5 animate-pulse" />
            <span>تنزيل الملف المباشر (42 ورقة عمل كاملة)</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            جاهز للتنزيل الفوري بصيغة Excel (.xlsx) مع جميع المعادلات
          </h3>
          <p className="text-slate-300 text-xs leading-relaxed max-w-2xl">
            اضغط على الزر الأخضر أدناه لتوليد وتحميل ملف Excel الحقيقي مباشرة إلى جهازك. يحتوي الملف على كافة الأوراق الـ 42، والتصميم العربي (RTL)، ومحركات حساب التكاليف والربحية والمخاطر.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={onExportExcel}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-950 font-extrabold text-sm px-6 py-3.5 rounded-xl transition shadow-xl shadow-emerald-500/20 border border-emerald-400/50 cursor-pointer disabled:cursor-not-allowed w-full sm:w-auto"
          >
            <Download className={`w-5 h-5 ${isExporting ? 'animate-spin' : ''}`} />
            <span>{isExporting ? 'جاري تجهيز الملف...' : 'اضغط هنا لتحميل ملف Excel الآن'}</span>
          </button>
        </div>
      </div>

      {/* System Architecture Flow */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Workflow className="w-5 h-5 text-blue-400" />
          <span>المعمارية الموحدة وتدفق البيانات النظامية</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
          {[
            { title: '1. البيانات الرئيسية', desc: 'العملاء / العقود / المواقع' },
            { title: '2. المرجعيات', desc: 'القوائم والإعدادات' },
            { title: '3. العمليات', desc: 'العمالة والمواد وأوامر العمل' },
            { title: '4. محرك التكلفة', desc: 'المباشرة وغير المباشرة' },
            { title: '5. التسعير والربحية', desc: 'الهامش ونقطة التعادل' },
            { title: '6. الفوترة والمخاطر', desc: 'الفواتير وسجل المخاطر' },
            { title: '7. التقارير', desc: 'مركز الـ 20 تقرير' },
            { title: '8. لوحة التحكم', desc: 'التنفيذية التفاعلية' }
          ].map((step, idx) => (
            <div key={idx} className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl space-y-1">
              <span className="text-xs font-bold text-blue-400 block">{step.title}</span>
              <p className="text-[11px] text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Directory of All 42 System Sheets */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <span>دليل أوراق العمل الـ 42 المترابطة في نظام Excel الإلزامي</span>
          </h2>
          <span className="text-xs text-slate-400">جميع الأوراق متوفرة RTL ومزودة بالمعادلات</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {sheetList.map((sheet) => (
            <div
              key={sheet.num}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-3.5 rounded-xl transition group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">
                  ورقة {sheet.num}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 opacity-80" />
              </div>
              <h3 className="text-xs font-bold text-slate-100 group-hover:text-blue-400 transition mb-1">
                {sheet.name}
              </h3>
              <p className="text-[11px] text-slate-400 line-clamp-2">{sheet.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
