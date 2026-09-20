import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  Building2,
  BarChart3,
  FileSpreadsheet,
  Workflow,
  DollarSign,
  Briefcase,
  ShieldAlert,
  Sliders,
  Settings,
  FileCode,
  FolderTree,
  Search,
  PlusCircle,
  FileCheck,
  Pin,
  PinOff,
  X,
  Database,
  Upload,
  Download,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CategoryTreeItem {
  id: string;
  title: string;
  icon: React.ElementType;
  badgeCount?: number;
  badgeColor?: string;
  subItems: {
    id: string;
    title: string;
    icon: React.ElementType;
    desc?: string;
    badge?: string;
  }[];
}

export const TreeSidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isSidebarOpen,
    setIsSidebarOpen,
    isSidebarPinned,
    setIsSidebarPinned,
    contracts,
    workOrders,
    risks,
    invoices,
    electronicForms,
    setAddContractModalOpen,
    setAddWorkOrderModalOpen,
    setAddRiskModalOpen,
    setImportExportModalOpen
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    cat_master: true,
    cat_engineering: true,
    cat_finance: true,
    cat_quality: true,
    cat_system: true
  });

  const categories: CategoryTreeItem[] = [
    {
      id: 'cat_master',
      title: '01. البيانات الأساسية والعقود',
      icon: Building2,
      badgeCount: contracts.length,
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      subItems: [
        { id: 'home', title: 'الرئيسية والنظرة العامة', icon: Building2, desc: 'واجهة النظام والهيكل الموحد' },
        { id: 'dashboard', title: 'لوحة التحكم والتحليلات', icon: BarChart3, desc: 'المؤشرات، التنبيهات، والبطاقات' },
        { id: 'contracts', title: 'قاعدة العقود الموحدة (42 شيت)', icon: FileSpreadsheet, desc: 'جميع العقود ورموز UID', badge: `${contracts.length} عقد` }
      ]
    },
    {
      id: 'cat_engineering',
      title: '02. الهندسة ودورة الحياة والتسعير',
      icon: Workflow,
      subItems: [
        { id: 'lifecycle', title: 'دورة حياة العقد (20 مرحلة)', icon: Workflow, desc: 'من الفرصة إلى الأرشفة' },
        { id: 'cost_pricing', title: 'محرك التكلفة والتسعير', icon: DollarSign, desc: 'العمالة، المواد، المعدات والإهلاك' },
        { id: 'operations', title: 'التشغيل وأوامر العمل والمواقع', icon: Briefcase, desc: 'العمليات الميدانية والجدولة', badge: `${workOrders.length} أمر عمل` }
      ]
    },
    {
      id: 'cat_finance',
      title: '03. المالية والفوترة والتحصيل',
      icon: DollarSign,
      badgeCount: invoices.length,
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      subItems: [
        { id: 'financials', title: 'جدول الفوترة والتدفقات النقدية', icon: DollarSign, desc: 'الفواتير الضريبية والتحصيل' },
        { id: 'scenarios', title: 'محاكي السيناريوهات والحساسية', icon: Sliders, desc: 'تغير الأجور والأسعار ونسب الربح' }
      ]
    },
    {
      id: 'cat_quality',
      title: '04. إدارة المخاطر والأداء والنماذج',
      icon: ShieldAlert,
      badgeCount: risks.length,
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      subItems: [
        { id: 'risks_kpi', title: 'سجل المخاطر ومؤشرات SLA/KPI', icon: ShieldAlert, desc: 'مصفوفة المخاطر والخصومات' },
        { id: 'reports', title: 'مركز التقارير (20 تقرير)', icon: BarChart3, desc: 'التقارير المالية والتشغيلية' },
        { id: 'electronic_forms', title: 'الاستمارات والنماذج الإلكترونية', icon: FileCheck, desc: 'نماذج المعاينة، الفواتير والتسليم', badge: `${electronicForms.length} نموذج` }
      ]
    },
    {
      id: 'cat_system',
      title: '05. النظام والمرجعيات والبرمجة',
      icon: Settings,
      subItems: [
        { id: 'settings', title: 'الإعدادات وثوابت التسعير', icon: Settings, desc: 'نسب المصاريف الإدارية والضريبة' },
        { id: 'python_colab', title: 'كود Python لـ Google Colab', icon: FileCode, desc: 'توليد ملفات OpenPyXL برمجياً' }
      ]
    }
  ];

  const toggleCategory = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    categories.forEach((cat) => {
      allExpanded[cat.id] = true;
    });
    setExpandedCategories(allExpanded);
  };

  const collapseAll = () => {
    setExpandedCategories({});
  };

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    if (!isSidebarPinned) {
      setIsSidebarOpen(false);
    }
  };

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Mobile Backdrop when not pinned */}
      {!isSidebarPinned && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sliding Interactive Tree Sidebar */}
      <aside
        className={`fixed top-16 right-0 bottom-0 z-40 bg-slate-900 border-l border-slate-800 w-80 sm:w-88 text-slate-200 flex flex-col shadow-2xl transition-all duration-300 no-print select-none ${
          isSidebarPinned ? 'relative top-0 h-[calc(100vh-4rem)] border-t-0' : 'fixed'
        }`}
      >
        {/* Sidebar Header Controls */}
        <div className="p-3.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white font-bold text-xs">
            <FolderTree className="w-4 h-4 text-blue-400" />
            <span>القائمة الجانبية الشجرية</span>
            <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-full border border-blue-500/30">
              تفاعلية
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSidebarPinned(!isSidebarPinned)}
              title={isSidebarPinned ? 'إلغاء تثبيت القائمة' : 'تثبيت القائمة الجانبية'}
              className={`p-1.5 rounded-lg border transition ${
                isSidebarPinned
                  ? 'bg-blue-600/30 text-blue-400 border-blue-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {isSidebarPinned ? <Pin className="w-3.5 h-3.5" /> : <PinOff className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
              title="إغلاق القائمة"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="px-3 py-2 bg-slate-950/40 border-b border-slate-800/80 grid grid-cols-2 gap-1.5">
          <button
            onClick={() => setAddContractModalOpen(true)}
            className="flex items-center justify-center gap-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-[11px] font-semibold py-1.5 px-2 rounded-lg transition"
          >
            <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>عقد جديد</span>
          </button>

          <button
            onClick={() => setAddWorkOrderModalOpen(true)}
            className="flex items-center justify-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-[11px] font-semibold py-1.5 px-2 rounded-lg transition"
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span>أمر عمل</span>
          </button>

          <button
            onClick={() => setAddRiskModalOpen(true)}
            className="flex items-center justify-center gap-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-[11px] font-semibold py-1.5 px-2 rounded-lg transition"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>تسجيل خطر</span>
          </button>

          <button
            onClick={() => setImportExportModalOpen(true)}
            className="flex items-center justify-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold py-1.5 px-2 rounded-lg transition"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>استيراد/تصدير</span>
          </button>
        </div>

        {/* Search Bar & Tree Controls */}
        <div className="p-3 border-b border-slate-800 space-y-2 bg-slate-900/50">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في أقسام النظام والنماذج..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pr-8 pl-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span className="font-mono text-[10px]">Tree Navigator v2.6</span>
            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="hover:text-blue-400 transition underline underline-offset-2"
              >
                توسع الكل
              </button>
              <span>•</span>
              <button
                onClick={collapseAll}
                className="hover:text-blue-400 transition underline underline-offset-2"
              >
                طي الكل
              </button>
            </div>
          </div>
        </div>

        {/* Tree Content List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-2 no-scrollbar">
          {categories.map((category) => {
            const CatIcon = category.icon;
            const isExpanded = expandedCategories[category.id] || searchQuery.length > 0;

            // Filter subItems if searching
            const filteredSubItems = category.subItems.filter(
              (item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
            );

            if (searchQuery.length > 0 && filteredSubItems.length === 0) {
              return null;
            }

            return (
              <div
                key={category.id}
                className="bg-slate-950/50 border border-slate-800/80 rounded-xl overflow-hidden transition"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-2.5 text-right hover:bg-slate-800/60 transition group cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200 group-hover:text-white">
                    <CatIcon className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="line-clamp-1">{category.title}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {category.badgeCount !== undefined && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${category.badgeColor}`}
                      >
                        {category.badgeCount}
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Sub items tree branch */}
                {isExpanded && (
                  <div className="pr-3 pl-2 py-1.5 space-y-1 border-t border-slate-800/60 bg-slate-900/30">
                    {filteredSubItems.map((item) => {
                      const ItemIcon = item.icon;
                      const isActive = activeTab === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectTab(item.id)}
                          className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-right transition cursor-pointer group ${
                            isActive
                              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-sm'
                              : 'hover:bg-slate-800/80 text-slate-300 hover:text-white border border-transparent'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            <ItemIcon
                              className={`w-3.5 h-3.5 ${
                                isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-300'
                              }`}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span
                                className={`text-xs font-semibold line-clamp-1 ${
                                  isActive ? 'text-white' : 'text-slate-200'
                                }`}
                              >
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="text-[9px] font-bold bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.desc && (
                              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 text-center text-[10px] text-slate-500">
          <p className="font-semibold text-slate-400">نظام إدارة عقود الخدمات الناعمة</p>
          <p className="text-[9px] text-slate-500 mt-0.5">مرتبط بقاعدة بيانات الـ 42 شيت موحدة</p>
        </div>
      </aside>
    </>
  );
};
