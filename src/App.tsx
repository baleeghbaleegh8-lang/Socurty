import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { TreeSidebar } from './components/TreeSidebar';
import { ToastContainer } from './components/ToastContainer';
import { AddContractModal } from './components/modals/AddContractModal';
import { AddWorkOrderModal } from './components/modals/AddWorkOrderModal';
import { AddRiskModal } from './components/modals/AddRiskModal';
import { ImportExportModal } from './components/modals/ImportExportModal';
import { ConfirmDeleteModal } from './components/modals/ConfirmDeleteModal';

import { HomeView } from './components/views/HomeView';
import { DashboardView } from './components/views/DashboardView';
import { ContractsView } from './components/views/ContractsView';
import { LifecycleView } from './components/views/LifecycleView';
import { CostPricingView } from './components/views/CostPricingView';
import { OperationsView } from './components/views/OperationsView';
import { FinancialsView } from './components/views/FinancialsView';
import { RisksKpiView } from './components/views/RisksKpiView';
import { ScenarioView } from './components/views/ScenarioView';
import { ReportsView } from './components/views/ReportsView';
import { ElectronicFormsView } from './components/views/ElectronicFormsView';
import { SettingsRefView } from './components/views/SettingsRefView';
import { PythonExportView } from './components/views/PythonExportView';
import { exportToExcelSystem } from './lib/excelExporter';

function MainAppLayout() {
  const { activeTab, setActiveTab, isSidebarOpen, addToast } = useApp();
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      addToast('جاري تصدير كافة أوراق العمل الـ 42 بصيغة أكسل XLSX...', 'info');
      await exportToExcelSystem();
      addToast('تمت عملية التصدير بنجاح وقمت بتحميل الملف XLSX.', 'success');
    } catch (err) {
      console.error('Failed to generate Excel file:', err);
      addToast('حدث خطأ أثناء تصدير ملف أكسل.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans dir-rtl text-right selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Navigation Topbar Header */}
      <Navbar onExportExcel={handleExportExcel} isExporting={isExporting} />

      {/* Main Body Layout with Tree Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Interactive Tree Navigation Sidebar */}
        <TreeSidebar />

        {/* Content View Area */}
        <main
          className={`flex-1 transition-all duration-300 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 ${
            isSidebarOpen ? 'lg:mr-80' : 'mr-0'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            {activeTab === 'home' && (
              <HomeView
                onNavigate={setActiveTab}
                onExportExcel={handleExportExcel}
                isExporting={isExporting}
              />
            )}

            {activeTab === 'dashboard' && <DashboardView onNavigate={setActiveTab} />}

            {activeTab === 'contracts' && <ContractsView />}

            {activeTab === 'lifecycle' && <LifecycleView />}

            {activeTab === 'cost_pricing' && <CostPricingView />}

            {activeTab === 'operations' && <OperationsView />}

            {activeTab === 'financials' && <FinancialsView />}

            {activeTab === 'risks_kpi' && <RisksKpiView />}

            {activeTab === 'scenarios' && <ScenarioView />}

            {activeTab === 'reports' && <ReportsView />}

            {activeTab === 'electronic_forms' && <ElectronicFormsView />}

            {activeTab === 'settings' && <SettingsRefView />}

            {activeTab === 'python_colab' && <PythonExportView />}
          </div>
        </main>
      </div>

      {/* Global Modals & Notifications Container */}
      <AddContractModal />
      <AddWorkOrderModal />
      <AddRiskModal />
      <ImportExportModal />
      <ConfirmDeleteModal />
      <ToastContainer />

      {/* Global Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/90 py-5 text-center text-xs text-slate-500 no-print z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-slate-400">
              نظام إدارة وتحليل وتقييم عقود الخدمات الناعمة — لوحة أتحكم والتداول المؤسسي 2026
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Enterprise Soft Services Contract Engineering, Cost Engine & Dynamic Analytics System (42 Sheets XLSX)
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="bg-slate-800 px-2.5 py-1 rounded-lg text-slate-400 border border-slate-700">
              Contract UID Linked Architecture
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}
