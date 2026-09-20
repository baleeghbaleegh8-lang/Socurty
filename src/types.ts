/**
 * Types & Domain Models for Enterprise Soft Services Contract Management System
 * نظام إدارة وتحليل وتقييم عقود الخدمات الناعمة
 */

export type LifecycleStage =
  | '01_فرصة'
  | '02_تأهيل'
  | '03_دراسة_جدوى'
  | '04_مسح_موقع'
  | '05_تسعير'
  | '06_عرض_سعر'
  | '07_تفاوض'
  | '08_ترسية'
  | '09_تعاقد'
  | '10_تهيئة_وتشغيل'
  | '11_رقابة_وجودة'
  | '12_فوترة'
  | '13_تحصيل'
  | '14_تغيير_نطاق'
  | '15_مطالبات'
  | '16_تجديد_وتمديد'
  | '17_إغلاق'
  | '18_تقييم_بعد_العقد'
  | '19_أرشفة';

export type ContractStatus = 'نشط' | 'قيد التفاوض' | 'مكتمل' | 'معلق' | 'ملغى' | 'قريب من الانتهاء';

export type ServiceCategory =
  | 'النظافة العامة والشاملة'
  | 'الأمن والحراسات'
  | 'مكافحة الآفات والحشرات'
  | 'العناية بالحدائق والمساحات الخضراء'
  | 'الضيافة وخدمات المكاتب'
  | 'إدارة وتدوير النفايات'
  | 'جلي وتلميع الرخام والأرضيات'
  | 'نظافة الواجهات الزجاجية'
  | 'المغاسل والكي'
  | 'خدمات أخرى';

export interface SystemSettings {
  indirectCostRate: number; // e.g. 0.12 (12%)
  administrativeExpenseRate: number; // e.g. 0.08 (8%)
  contingencyRate: number; // e.g. 0.05 (5%)
  vatRate: number; // e.g. 0.15 (15%)
  targetProfitMargin: number; // e.g. 0.20 (20%)
  laborInsuranceRate: number; // e.g. 0.10 (10%)
  vacationReplacementFactor: number; // e.g. 0.0833 (1 month/yr)
  annualEscalationRate: number; // e.g. 0.03 (3%)
  currency: string; // 'SAR'
}

export interface Client {
  clientUid: string;
  name: string;
  industry: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  creditLimit: number;
  paymentTermsDays: number;
  rating: 'A+' | 'A' | 'B' | 'C';
  notes: string;
}

export interface Site {
  siteUid: string;
  contractUid: string;
  clientUid: string;
  siteName: string;
  locationCity: string;
  totalAreaSqm: number;
  buildingType: string;
  floorsCount: number;
  occupancyCount: number;
  operatingHoursPerDay: number;
  shiftType: string;
  contactManager: string;
}

export interface ServiceCatalogItem {
  serviceUid: string;
  serviceName: string;
  category: ServiceCategory;
  unitOfMeasure: string;
  standardBaseCostPerUnit: number;
  recommendedPricePerUnit: number;
  laborToMaterialRatio: string;
  description: string;
}

export interface LaborItem {
  employeeUid: string;
  jobUid: string;
  contractUid: string;
  siteUid: string;
  jobTitle: string;
  nationality: string;
  count: number;
  basicSalaryMonthly: number;
  housingAllowanceMonthly: number;
  transportAllowanceMonthly: number;
  foodAllowanceMonthly: number;
  otherAllowancesMonthly: number;
  overtimeHoursMonthly: number;
  overtimeHourlyRate: number;
  insuranceCostMonthly: number;
  vacationProvisionMonthly: number;
  replacementCostMonthly: number;
  trainingCostMonthly: number;
  totalLaborCostMonthly: number;
  totalLaborCostAnnual: number;
}

export interface MaterialItem {
  materialUid: string;
  contractUid: string;
  siteUid: string;
  serviceUid: string;
  materialName: string;
  category: string;
  unit: string;
  monthlyQuantity: number;
  unitPrice: number;
  durationMonths: number;
  totalCost: number;
}

export interface EquipmentItem {
  equipmentUid: string;
  contractUid: string;
  siteUid: string;
  serviceUid: string;
  equipmentName: string;
  acquisitionType: 'شراء' | 'إيجار';
  count: number;
  monthlyCostPerUnit: number;
  maintenanceMonthlyPerUnit: number;
  depreciationMonthlyPerUnit: number;
  durationMonths: number;
  totalCost: number;
}

export interface FleetItem {
  vehicleUid: string;
  contractUid: string;
  vehicleType: string;
  count: number;
  monthlyRentalOrDepreciation: number;
  monthlyFuelCost: number;
  monthlyMaintenanceCost: number;
  driverSalaryMonthly: number;
  durationMonths: number;
  totalCost: number;
}

export interface Contract {
  contractUid: string;
  opportunityUid: string;
  clientUid: string;
  clientName: string;
  contractTitle: string;
  status: ContractStatus;
  lifecycleStage: LifecycleStage;
  startDate: string; // YYYY-MM-DD
  endDate: string;
  durationMonths: number;
  sitesCount: number;
  assignedManager: string;
  // Calculated financial summaries
  directLaborCost: number;
  directMaterialsCost: number;
  directEquipmentCost: number;
  directFleetCost: number;
  totalDirectCost: number;
  indirectCost: number;
  administrativeCost: number;
  contingencyReserve: number;
  totalCost: number;
  contractPrice: number;
  vatAmount: number;
  totalPriceWithVat: number;
  grossProfit: number;
  profitMarginPercent: number;
  markupPercent: number;
  breakEvenRevenue: number;
  isTestData?: boolean;
}

export interface ContractLifecycleLog {
  logId: string;
  contractUid: string;
  stage: LifecycleStage;
  stageDate: string;
  responsiblePerson: string;
  status: 'مكتمل' | 'قيد التنفيذ' | 'مطلوب اتخاذ إجراء';
  durationDays: number;
  startDate: string;
  endDate: string;
  delayDays: number;
  notes: string;
  financialImpact: number;
  riskAssessment: string;
}

export interface WorkOrder {
  workOrderUid: string;
  contractUid: string;
  siteUid: string;
  siteName: string;
  serviceUid: string;
  serviceName: string;
  title: string;
  priority: 'عالي جداً' | 'عالي' | 'متوسط' | 'منخفض';
  status: 'مكتمل' | 'قيد التنفيذ' | 'معلق' | 'مرفوض';
  plannedCost: number;
  actualCost: number;
  costVariance: number;
  assignedSupervisor: string;
  creationDate: string;
  completionDate: string;
}

export interface Invoice {
  invoiceUid: string;
  contractUid: string;
  clientName: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  grossAmount: number;
  discount: number;
  taxableAmount: number;
  vatAmount: number;
  penalties: number;
  deductions: number;
  netInvoiceAmount: number;
  collectedAmount: number;
  remainingBalance: number;
  status: 'مدفوعة بالكامل' | 'مدفوعة جزئياً' | 'غير مدفوعة' | 'متأخرة';
  agingDays: number;
}

export interface ChangeOrder {
  changeUid: string;
  contractUid: string;
  requestDate: string;
  reason: string;
  description: string;
  costVariance: number;
  revenueVariance: number;
  profitImpact: number;
  timeImpactDays: number;
  approvalStatus: 'معتمد' | 'قيد المراجعة' | 'مرفوض';
}

export interface Claim {
  claimUid: string;
  contractUid: string;
  claimant: 'المقاول' | 'العميل';
  submissionDate: string;
  cause: string;
  claimedAmount: number;
  settledAmount: number;
  status: 'مفتوحة' | 'قيد التفاوض' | 'مسواة' | 'مرفوضة';
  legalImpact: string;
}

export interface RiskItem {
  riskUid: string;
  contractUid: string;
  category: 'مالية' | 'تشغيلية' | 'قانونية' | 'عمالة' | 'سلاسل الإمداد' | 'سلامة وجودة';
  description: string;
  cause: string;
  probability: number; // 1 to 5
  impact: number; // 1 to 5
  riskScore: number; // prob * impact
  riskLevel: 'منخفض' | 'متوسط' | 'عالي' | 'حرج';
  preventiveAction: string;
  correctiveAction: string;
  owner: string;
  dueDate: string;
  status: 'نشط' | 'تم التخفيف' | 'مغلق';
  potentialCostImpact: number;
}

export interface KpiMetric {
  kpiUid: string;
  contractUid: string;
  metricName: string;
  category: 'جودة الخدمة' | 'الالتزام بالوقت' | 'الإنتاجية والسلامة' | 'رضا العميل' | 'الامتثال للـ SLA';
  unit: string;
  targetValue: number;
  actualValue: number;
  variance: number;
  slaCompliancePercent: number;
  status: 'ممتاز' | 'مقبول' | 'يحتاج تحسين' | 'حرج';
}

export interface ScenarioParams {
  laborCostMultiplier: number; // e.g. 1.05 for +5%
  materialCostMultiplier: number;
  fuelCostMultiplier: number;
  equipmentCostMultiplier: number;
  overheadCostMultiplier: number;
  priceMultiplier: number;
}

export interface AuditLogEntry {
  auditId: string;
  timestamp: string;
  ruleCategory: 'UID Validation' | 'Formula Integrity' | 'Missing Link' | 'Contract Expiry' | 'Billing Anomaly';
  severity: 'تنبيه' | 'خطأ' | 'معلومات';
  message: string;
  affectedUid: string;
  status: 'تمت المعالجة' | 'يتطلب مراجعة';
}
