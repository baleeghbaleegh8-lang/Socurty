import React from 'react';
import {
  Building2,
  BarChart3,
  FileSpreadsheet,
  FileCode,
  ShieldAlert,
  Sliders,
  DollarSign,
  Workflow,
  Download,
  Settings,
  Briefcase,
  FolderTree,
  FileCheck,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onExportExcel: () => void;
  isExporting?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onExportExcel, isExporting }) => {
  const {
    activeTab,
    setActiveTab,
    isSidebarOpen,
    toggleSidebar,
    setAddContractModalOpen,
    setImportExportModalOpen
  } = useApp();

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Building2 },
    { id: 'dashboard', label: 'لوحة التحكم', icon: BarChart3 },
    { id: 'contracts', label: 'قاعدة العقود', icon: FileSpreadsheet },
    { id: 'lifecycle', label: 'دورة الحياة (20 مرحلة)', icon: Workflow },
    { id: 'cost_pricing', label: 'محرك التكلفة والتسعير', icon: DollarSign },
    { id: 'operations', label: 'التشغيل وأوامر العمل', icon: Briefcase },
    { id: 'financials', label: 'الفوترة والتحصيل', icon: DollarSign },
    { id: 'risks_kpi', label: 'المخاطر و KPI/SLA', icon: ShieldAlert },
    { id: 'scenarios', label: 'السيناريوهات', icon: Sliders },
    { id: 'reports', label: 'مركز التقارير', icon: BarChart3 },
    { id: 'electronic_forms', label: 'الاستمارات والنماذج', icon: FileCheck },
    { id: 'settings', label: 'الإعدادات والمرجعيات', icon: Settings },
    { id: 'python_colab', label: 'كود Python', icon: FileCode }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100 no-print select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Right Section: Sidebar Toggle + App Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-xl border transition flex items-center gap-1.5 cursor-pointer ${
                isSidebarOpen
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700 hover:bg-slate-700'
              }`}
              title="تفعيل/إخفاء القائمة الجانبية الشجرية"
            >
              <FolderTree className="w-5 h-5 text-blue-300" />
              <span className="text-xs font-bold hidden sm:inline">القائمة الجانبية</span>
            </button>

            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setActiveTab('home')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                  نظام إدارة وتحليل عقود الخدمات الناعمة
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium">
                    مؤسسي 42 ورقة
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400">
                  Soft Services Contract Engineering & Dynamic Analytics System
                </p>
              </div>
            </div>
          </div>

          {/* Left Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAddContractModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-bold px-3 py-2 rounded-xl transition"
            >
              <PlusCircle className="w-4 h-4 text-blue-400" />
              <span>إضافة عقد جديد</span>
            </button>

            <button
              onClick={onExportExcel}
              disabled={isExporting}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition shadow-md shadow-emerald-900/30 border border-emerald-500/40 cursor-pointer disabled:cursor-not-allowed"
            >
              <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
              <span>{isExporting ? 'جاري التصدير...' : 'تصدير Excel XLSX'}</span>
            </button>

            <button
              onClick={() => setImportExportModalOpen(true)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition border border-slate-700"
              title="مركز الاستيراد والتصدير"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">النسخ والاستيراد</span>
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto py-2 text-xs border-t border-slate-800/80 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-bold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
