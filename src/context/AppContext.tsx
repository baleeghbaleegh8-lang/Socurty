import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Contract,
  WorkOrder,
  Client,
  Site,
  RiskItem,
  Invoice,
  SystemSettings,
  ContractStatus,
  LifecycleStage
} from '../types';
import {
  MOCK_CONTRACTS,
  MOCK_WORK_ORDERS,
  MOCK_CLIENTS,
  MOCK_SITES,
  MOCK_RISKS,
  MOCK_INVOICES,
  INITIAL_SETTINGS
} from '../data/mockData';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface ElectronicFormRecord {
  id: string;
  formType: 'site_survey' | 'work_order' | 'tax_invoice' | 'sla_audit';
  title: string;
  contractUid: string;
  clientName: string;
  date: string;
  createdByName: string;
  status: 'مسودة' | 'معتمد' | 'مرفوض' | 'قيد التوقيع';
  data: Record<string, any>;
}

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  isSidebarPinned: boolean;
  setIsSidebarPinned: (pinned: boolean) => void;

  // Domain Data
  contracts: Contract[];
  workOrders: WorkOrder[];
  clients: Client[];
  sites: Site[];
  risks: RiskItem[];
  invoices: Invoice[];
  settings: SystemSettings;
  electronicForms: ElectronicFormRecord[];

  // Selected Item for Detail / Edit
  selectedContractUid: string | null;
  setSelectedContractUid: (uid: string | null) => void;

  // CRUD Methods
  addContract: (contract: Partial<Contract>) => void;
  updateContract: (contractUid: string, updated: Partial<Contract>) => void;
  deleteContract: (contractUid: string) => void;

  addWorkOrder: (wo: Partial<WorkOrder>) => void;
  updateWorkOrderStatus: (workOrderUid: string, status: WorkOrder['status']) => void;
  deleteWorkOrder: (workOrderUid: string) => void;

  addRisk: (risk: Partial<RiskItem>) => void;
  deleteRisk: (riskUid: string) => void;

  addInvoice: (inv: Partial<Invoice>) => void;
  updateInvoiceStatus: (invoiceUid: string, status: Invoice['status']) => void;

  addElectronicForm: (form: Omit<ElectronicFormRecord, 'id'>) => void;
  deleteElectronicForm: (id: string) => void;

  importDataFromJSON: (jsonData: string) => boolean;

  // Modals visibility
  addContractModalOpen: boolean;
  setAddContractModalOpen: (open: boolean) => void;
  addWorkOrderModalOpen: boolean;
  setAddWorkOrderModalOpen: (open: boolean) => void;
  addRiskModalOpen: boolean;
  setAddRiskModalOpen: (open: boolean) => void;
  importExportModalOpen: boolean;
  setImportExportModalOpen: (open: boolean) => void;

  // Delete modal helper
  deleteConfirm: {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  };
  openDeleteConfirm: (title: string, message: string, onConfirm: () => void) => void;
  closeDeleteConfirm: () => void;

  // Toast System
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isSidebarPinned, setIsSidebarPinned] = useState<boolean>(true);

  // Load state from localStorage if exists
  const [contracts, setContracts] = useState<Contract[]>(() => {
    const saved = localStorage.getItem('app_contracts');
    return saved ? JSON.parse(saved) : MOCK_CONTRACTS;
  });

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(() => {
    const saved = localStorage.getItem('app_work_orders');
    return saved ? JSON.parse(saved) : MOCK_WORK_ORDERS;
  });

  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('app_clients');
    return saved ? JSON.parse(saved) : MOCK_CLIENTS;
  });

  const [sites, setSites] = useState<Site[]>(() => {
    const saved = localStorage.getItem('app_sites');
    return saved ? JSON.parse(saved) : MOCK_SITES;
  });

  const [risks, setRisks] = useState<RiskItem[]>(() => {
    const saved = localStorage.getItem('app_risks');
    return saved ? JSON.parse(saved) : MOCK_RISKS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('app_invoices');
    return saved ? JSON.parse(saved) : MOCK_INVOICES;
  });

  const [settings] = useState<SystemSettings>(INITIAL_SETTINGS);

  const [electronicForms, setElectronicForms] = useState<ElectronicFormRecord[]>(() => {
    const saved = localStorage.getItem('app_electronic_forms');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'FORM-2026-001',
        formType: 'site_survey',
        title: 'استمارة مسح وتحديد احتياجات موقع - برج الأبراج',
        contractUid: 'CNT-2026-001',
        clientName: 'شركة الأبراج القابضة للتطوير العقاري',
        date: '2026-03-15',
        createdByName: 'م. فهد الخالد',
        status: 'معتمد',
        data: {
          totalAreaSqm: 45000,
          buildingType: 'برج إداري مالي',
          requiredLaborCount: 38,
          dailyShiftHours: 24,
          cleanlinessGrade: 'ممتاز',
          surveyNotes: 'الموقع يتطلب 3 ورديات مستمرة مع تركيز على البهو الرئيسي والمصاعد.'
        }
      },
      {
        id: 'FORM-2026-002',
        formType: 'tax_invoice',
        title: 'فاتورة ضريبية إلكترونية - المجمعات الطبية',
        contractUid: 'CNT-2026-002',
        clientName: 'مجموعة المجمعات الطبية الحديثة',
        date: '2026-03-01',
        createdByName: 'المحاسب الرئيسي',
        status: 'معتمد',
        data: {
          invoiceNumber: 'INV-2026-0301',
          grossAmount: 320000,
          vatAmount: 48000,
          netInvoiceAmount: 368000
        }
      }
    ];
  });

  const [selectedContractUid, setSelectedContractUid] = useState<string | null>('CNT-2026-001');

  // Modals State
  const [addContractModalOpen, setAddContractModalOpen] = useState(false);
  const [addWorkOrderModalOpen, setAddWorkOrderModalOpen] = useState(false);
  const [addRiskModalOpen, setAddRiskModalOpen] = useState(false);
  const [importExportModalOpen, setImportExportModalOpen] = useState(false);

  // Delete Confirm Modal State
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  // Toast System State
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('app_contracts', JSON.stringify(contracts));
  }, [contracts]);

  useEffect(() => {
    localStorage.setItem('app_work_orders', JSON.stringify(workOrders));
  }, [workOrders]);

  useEffect(() => {
    localStorage.setItem('app_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('app_sites', JSON.stringify(sites));
  }, [sites]);

  useEffect(() => {
    localStorage.setItem('app_risks', JSON.stringify(risks));
  }, [risks]);

  useEffect(() => {
    localStorage.setItem('app_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('app_electronic_forms', JSON.stringify(electronicForms));
  }, [electronicForms]);

  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    // Auto-close sidebar on unpinned mobile / tablet mode when navigating
    if (!isSidebarPinned) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const openDeleteConfirm = (title: string, message: string, onConfirm: () => void) => {
    setDeleteConfirm({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setDeleteConfirm((prev) => ({ ...prev, isOpen: false }));
      }
    });
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm((prev) => ({ ...prev, isOpen: false }));
  };

  // CRUD Actions
  const addContract = (newContractData: Partial<Contract>) => {
    const nextSeq = contracts.length + 1;
    const contractUid = newContractData.contractUid || `CNT-2026-${String(nextSeq).padStart(3, '0')}`;
    const durationMonths = newContractData.durationMonths || 36;
    const directLaborCost = newContractData.directLaborCost || 1200000;
    const directMaterialsCost = newContractData.directMaterialsCost || 300000;
    const directEquipmentCost = newContractData.directEquipmentCost || 200000;
    const directFleetCost = newContractData.directFleetCost || 100000;
    const totalDirectCost = directLaborCost + directMaterialsCost + directEquipmentCost + directFleetCost;

    const indirectCost = totalDirectCost * settings.indirectCostRate;
    const administrativeCost = totalDirectCost * settings.administrativeExpenseRate;
    const contingencyReserve = totalDirectCost * settings.contingencyRate;
    const totalCost = totalDirectCost + indirectCost + administrativeCost + contingencyReserve;

    const contractPrice = newContractData.contractPrice || Math.round(totalCost / (1 - settings.targetProfitMargin));
    const vatAmount = contractPrice * settings.vatRate;
    const totalPriceWithVat = contractPrice + vatAmount;
    const grossProfit = contractPrice - totalCost;
    const profitMarginPercent = contractPrice > 0 ? (grossProfit / contractPrice) * 100 : 0;
    const markupPercent = totalCost > 0 ? (grossProfit / totalCost) * 100 : 0;

    const fullContract: Contract = {
      contractUid,
      opportunityUid: `OPP-${Math.floor(1000 + Math.random() * 9000)}`,
      clientUid: newContractData.clientUid || 'CLT-1001',
      clientName: newContractData.clientName || 'عميل جديد',
      contractTitle: newContractData.contractTitle || 'عقد خدمات جديد',
      status: (newContractData.status as ContractStatus) || 'نشط',
      lifecycleStage: (newContractData.lifecycleStage as LifecycleStage) || '09_تعاقد',
      startDate: newContractData.startDate || new Date().toISOString().split('T')[0],
      endDate: newContractData.endDate || '2029-12-31',
      durationMonths,
      sitesCount: newContractData.sitesCount || 1,
      assignedManager: newContractData.assignedManager || 'م. أحمد علي',
      directLaborCost,
      directMaterialsCost,
      directEquipmentCost,
      directFleetCost,
      totalDirectCost,
      indirectCost,
      administrativeCost,
      contingencyReserve,
      totalCost,
      contractPrice,
      vatAmount,
      totalPriceWithVat,
      grossProfit,
      profitMarginPercent,
      markupPercent,
      breakEvenRevenue: totalCost
    };

    setContracts((prev) => [fullContract, ...prev]);
    addToast(`تمت إضافة العقد الجديد [${fullContract.contractUid}] بنجاح وحساب معادلات التكلفة آلياً`);
  };

  const updateContract = (contractUid: string, updated: Partial<Contract>) => {
    setContracts((prev) =>
      prev.map((c) => (c.contractUid === contractUid ? { ...c, ...updated } : c))
    );
    addToast(`تم تحديث العقد [${contractUid}] بنجاح`);
  };

  const deleteContract = (contractUid: string) => {
    setContracts((prev) => prev.filter((c) => c.contractUid !== contractUid));
    addToast(`تم حذف العقد [${contractUid}] بنجاح`, 'info');
  };

  const addWorkOrder = (woData: Partial<WorkOrder>) => {
    const seq = workOrders.length + 101;
    const newWo: WorkOrder = {
      workOrderUid: woData.workOrderUid || `WO-2026-${seq}`,
      contractUid: woData.contractUid || 'CNT-2026-001',
      siteUid: woData.siteUid || 'STE-2001',
      siteName: woData.siteName || 'برج الأبراج المالي - الرياض',
      serviceUid: woData.serviceUid || 'SRV-01',
      serviceName: woData.serviceName || 'نظافة شاملة وتعقيم',
      title: woData.title || 'أمر عمل تشغيلي مخصص',
      priority: woData.priority || 'متوسط',
      status: woData.status || 'قيد التنفيذ',
      plannedCost: woData.plannedCost || 15000,
      actualCost: woData.actualCost || 14200,
      costVariance: (woData.plannedCost || 15000) - (woData.actualCost || 14200),
      assignedSupervisor: woData.assignedSupervisor || 'م. خالد السلمي',
      creationDate: new Date().toISOString().split('T')[0],
      completionDate: woData.completionDate || '2026-04-10'
    };
    setWorkOrders((prev) => [newWo, ...prev]);
    addToast(`تمت إضافة أمر العمل [${newWo.workOrderUid}] بنجاح`);
  };

  const updateWorkOrderStatus = (workOrderUid: string, status: WorkOrder['status']) => {
    setWorkOrders((prev) =>
      prev.map((wo) => (wo.workOrderUid === workOrderUid ? { ...wo, status } : wo))
    );
    addToast(`تم تغيير حالة أمر العمل [${workOrderUid}] إلى "${status}"`);
  };

  const deleteWorkOrder = (workOrderUid: string) => {
    setWorkOrders((prev) => prev.filter((wo) => wo.workOrderUid !== workOrderUid));
    addToast(`تم حذف أمر العمل [${workOrderUid}]`);
  };

  const addRisk = (riskData: Partial<RiskItem>) => {
    const seq = risks.length + 101;
    const prob = riskData.probability || 3;
    const impact = riskData.impact || 3;
    const riskScore = prob * impact;
    let riskLevel: RiskItem['riskLevel'] = 'متوسط';
    if (riskScore >= 16) riskLevel = 'حرج';
    else if (riskScore >= 10) riskLevel = 'عالي';
    else if (riskScore >= 5) riskLevel = 'متوسط';
    else riskLevel = 'منخفض';

    const newRisk: RiskItem = {
      riskUid: riskData.riskUid || `RSK-2026-${seq}`,
      contractUid: riskData.contractUid || 'CNT-2026-001',
      category: riskData.category || 'تشغيلية',
      description: riskData.description || 'مخاطرة تشغيلية جديدة',
      cause: riskData.cause || 'تغير في ظروف الموقع',
      probability: prob,
      impact,
      riskScore,
      riskLevel,
      preventiveAction: riskData.preventiveAction || 'مراقبة خطة العمل وتكثيف الإشراف',
      correctiveAction: riskData.correctiveAction || 'توفير عمالة بديلة فورية',
      owner: riskData.owner || 'مدير المشروع',
      dueDate: riskData.dueDate || '2026-06-30',
      status: riskData.status || 'نشط',
      potentialCostImpact: riskData.potentialCostImpact || 25000
    };
    setRisks((prev) => [newRisk, ...prev]);
    addToast(`تم تسجيل الخطر [${newRisk.riskUid}] وحساب درجة الخطورة (${riskScore}) بنجاح`);
  };

  const deleteRisk = (riskUid: string) => {
    setRisks((prev) => prev.filter((r) => r.riskUid !== riskUid));
    addToast(`تم حذف بند الخطر [${riskUid}]`);
  };

  const addInvoice = (invData: Partial<Invoice>) => {
    const seq = invoices.length + 500;
    const grossAmount = invData.grossAmount || 100000;
    const discount = invData.discount || 0;
    const taxableAmount = grossAmount - discount;
    const vatAmount = taxableAmount * settings.vatRate;
    const penalties = invData.penalties || 0;
    const deductions = invData.deductions || 0;
    const netInvoiceAmount = taxableAmount + vatAmount - penalties - deductions;

    const newInv: Invoice = {
      invoiceUid: invData.invoiceUid || `INV-2026-${seq}`,
      contractUid: invData.contractUid || 'CNT-2026-001',
      clientName: invData.clientName || 'عميل محدد',
      invoiceNumber: invData.invoiceNumber || `NVS-${seq}`,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '2026-04-30',
      grossAmount,
      discount,
      taxableAmount,
      vatAmount,
      penalties,
      deductions,
      netInvoiceAmount,
      collectedAmount: 0,
      remainingBalance: netInvoiceAmount,
      status: 'غير مدفوعة',
      agingDays: 0
    };
    setInvoices((prev) => [newInv, ...prev]);
    addToast(`تم إصدار الفاتورة الضريبية [${newInv.invoiceUid}] بقيمة ${netInvoiceAmount.toLocaleString()} ر.س`);
  };

  const updateInvoiceStatus = (invoiceUid: string, status: Invoice['status']) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.invoiceUid === invoiceUid) {
          const collectedAmount = status === 'مدفوعة بالكامل' ? inv.netInvoiceAmount : status === 'مدفوعة جزئياً' ? inv.netInvoiceAmount / 2 : 0;
          const remainingBalance = inv.netInvoiceAmount - collectedAmount;
          return { ...inv, status, collectedAmount, remainingBalance };
        }
        return inv;
      })
    );
    addToast(`تم تحديث حالة الفاتورة [${invoiceUid}] إلى ${status}`);
  };

  const addElectronicForm = (form: Omit<ElectronicFormRecord, 'id'>) => {
    const newFormRecord: ElectronicFormRecord = {
      ...form,
      id: `FORM-2026-${String(electronicForms.length + 1).padStart(3, '0')}`
    };
    setElectronicForms((prev) => [newFormRecord, ...prev]);
    addToast(`تم إنشاء وتوثيق الاستمارة الإلكترونية [${newFormRecord.id}] بنجاح`);
  };

  const deleteElectronicForm = (id: string) => {
    setElectronicForms((prev) => prev.filter((f) => f.id !== id));
    addToast(`تم حذف النموذج الإلكتروني [${id}]`);
  };

  const importDataFromJSON = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.contracts && Array.isArray(parsed.contracts)) {
        setContracts(parsed.contracts);
      }
      if (parsed.workOrders && Array.isArray(parsed.workOrders)) {
        setWorkOrders(parsed.workOrders);
      }
      if (parsed.clients && Array.isArray(parsed.clients)) {
        setClients(parsed.clients);
      }
      if (parsed.risks && Array.isArray(parsed.risks)) {
        setRisks(parsed.risks);
      }
      if (parsed.invoices && Array.isArray(parsed.invoices)) {
        setInvoices(parsed.invoices);
      }
      addToast('تم استيراد البيانات وإعادة تحديث جميع الجداول والمعادلات بنجاح!');
      return true;
    } catch (e) {
      addToast('فشل استيراد البيانات! تأكد من صحة تنسيق JSON', 'error');
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        isSidebarPinned,
        setIsSidebarPinned,
        contracts,
        workOrders,
        clients,
        sites,
        risks,
        invoices,
        settings,
        electronicForms,
        selectedContractUid,
        setSelectedContractUid,
        addContract,
        updateContract,
        deleteContract,
        addWorkOrder,
        updateWorkOrderStatus,
        deleteWorkOrder,
        addRisk,
        deleteRisk,
        addInvoice,
        updateInvoiceStatus,
        addElectronicForm,
        deleteElectronicForm,
        importDataFromJSON,
        addContractModalOpen,
        setAddContractModalOpen,
        addWorkOrderModalOpen,
        setAddWorkOrderModalOpen,
        addRiskModalOpen,
        setAddRiskModalOpen,
        importExportModalOpen,
        setImportExportModalOpen,
        deleteConfirm,
        openDeleteConfirm,
        closeDeleteConfirm,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
