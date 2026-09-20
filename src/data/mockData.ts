import {
  Client,
  Site,
  ServiceCatalogItem,
  LaborItem,
  MaterialItem,
  EquipmentItem,
  FleetItem,
  Contract,
  ContractLifecycleLog,
  WorkOrder,
  Invoice,
  ChangeOrder,
  Claim,
  RiskItem,
  KpiMetric,
  SystemSettings,
  AuditLogEntry
} from '../types';

export const INITIAL_SETTINGS: SystemSettings = {
  indirectCostRate: 0.12, // 12%
  administrativeExpenseRate: 0.08, // 8%
  contingencyRate: 0.05, // 5%
  vatRate: 0.15, // 15%
  targetProfitMargin: 0.22, // 22%
  laborInsuranceRate: 0.10, // 10%
  vacationReplacementFactor: 0.0833, // ~8.33%
  annualEscalationRate: 0.03, // 3%
  currency: 'ر.س (SAR)'
};

export const MOCK_CLIENTS: Client[] = [
  {
    clientUid: 'CLT-1001',
    name: 'شركة الأبراج القابضة للتطوير العقاري',
    industry: 'إدارة وتطوير العقارات',
    contactPerson: 'م. عبد الله السلمان',
    phone: '+966 50 123 4567',
    email: 'a.salman@abraj-holding.com',
    city: 'الرياض',
    address: 'طريق الملك فهد، برج الأبراج، الدور 18',
    creditLimit: 2500000,
    paymentTermsDays: 45,
    rating: 'A+',
    notes: 'عميل استراتيجي - عقد ناتجة عن مناقصة حكومية/خاصة'
  },
  {
    clientUid: 'CLT-1002',
    name: 'مجموعة المجمعات الطبية الحديثة',
    industry: 'الرعاية الصحية والمستشفيات',
    contactPerson: 'د. خالد العمري',
    phone: '+966 55 987 6543',
    email: 'k.omari@modernmed.sa',
    city: 'جدة',
    address: 'طريق المدينة المنورة، مجمع العيادات',
    creditLimit: 1800000,
    paymentTermsDays: 30,
    rating: 'A',
    notes: 'يتطلب معايير تعقيم وتطهير عالية الجودة وضيافة'
  },
  {
    clientUid: 'CLT-1003',
    name: 'شركة المراكز التجارية والاستثمار',
    industry: 'التجزئة والمجمعات التجارية',
    contactPerson: 'أ. سارة التميمي',
    phone: '+966 54 321 0987',
    email: 's.tamimi@malls-invest.com',
    city: 'الدمام',
    address: 'حي الشاطئ، مول النخيل',
    creditLimit: 1200000,
    paymentTermsDays: 60,
    rating: 'B',
    notes: 'تتطلب خدمات أمن وحراسة ونظافة سريعة في أوقات الذروة'
  }
];

export const MOCK_SITES: Site[] = [
  {
    siteUid: 'STE-2001',
    contractUid: 'CNT-2026-001',
    clientUid: 'CLT-1001',
    siteName: 'برج الأبراج المالي - الرياض',
    locationCity: 'الرياض',
    totalAreaSqm: 45000,
    buildingType: 'برج إداري مالي',
    floorsCount: 32,
    occupancyCount: 1800,
    operatingHoursPerDay: 24,
    shiftType: '3 ورديات (24/7)',
    contactManager: 'م. فهد الخالد'
  },
  {
    siteUid: 'STE-2002',
    contractUid: 'CNT-2026-002',
    clientUid: 'CLT-1002',
    siteName: 'مستشفى الشفاء التخصصي - جدة',
    locationCity: 'جدة',
    totalAreaSqm: 28000,
    buildingType: 'مستشفى ومراكز طبية',
    floorsCount: 8,
    occupancyCount: 1200,
    operatingHoursPerDay: 24,
    shiftType: '3 ورديات (24/7)',
    contactManager: 'أ. طارق عبد العزيز'
  },
  {
    siteUid: 'STE-2003',
    contractUid: 'CNT-2026-003',
    clientUid: 'CLT-1003',
    siteName: 'مول النخيل التجاري - الدمام',
    locationCity: 'الدمام',
    totalAreaSqm: 62000,
    buildingType: 'مركز تجاري وتسوق',
    floorsCount: 4,
    occupancyCount: 5000,
    operatingHoursPerDay: 16,
    shiftType: 'ورديتان (صباحي/مسائي)',
    contactManager: 'سعود الشهري'
  },
  {
    siteUid: 'STE-2004',
    contractUid: 'CNT-2026-004',
    clientUid: 'CLT-1001',
    siteName: 'مجمع الواحة السكني - الرياض',
    locationCity: 'الرياض',
    totalAreaSqm: 35000,
    buildingType: 'مجمع سكني راقي',
    floorsCount: 12,
    occupancyCount: 650,
    operatingHoursPerDay: 24,
    shiftType: '2 ورديات',
    contactManager: 'عادل السليمان'
  },
  {
    siteUid: 'STE-2005',
    contractUid: 'CNT-2026-005',
    clientUid: 'CLT-1002',
    siteName: 'مركز الأبحاث الطبية - الخبر',
    locationCity: 'الخبر',
    totalAreaSqm: 18000,
    buildingType: 'مختبرات ومكاتب أبحاث',
    floorsCount: 5,
    occupancyCount: 400,
    operatingHoursPerDay: 12,
    shiftType: 'وردية واحدة extended',
    contactManager: 'د. يوسف الغامدي'
  }
];

export const MOCK_SERVICES: ServiceCatalogItem[] = [
  {
    serviceUid: 'SRV-3001',
    serviceName: 'النظافة العامة الداخلية والشاملة',
    category: 'النظافة العامة والشاملة',
    unitOfMeasure: 'متر مربع / شهرياً',
    standardBaseCostPerUnit: 4.5,
    recommendedPricePerUnit: 6.2,
    laborToMaterialRatio: '80% عمالة / 20% مواد ومعدات',
    description: 'تنظيف المكاتب والممرات والسلالم والدورات الصحية بشكل يومي ودوري'
  },
  {
    serviceUid: 'SRV-3002',
    serviceName: 'الحراسات الأمنية والسلامة',
    category: 'الأمن والحراسات',
    unitOfMeasure: 'حارس / شهرياً',
    standardBaseCostPerUnit: 3800,
    recommendedPricePerUnit: 5200,
    laborToMaterialRatio: '95% عمالة / 5% معدات وزي',
    description: 'حراسة الأبواب والمداخل وإدارة الزوار وأنظمة الدخول ومراقبة الكاميرات'
  },
  {
    serviceUid: 'SRV-3003',
    serviceName: 'مكافحة الحشرات والآفات المتقدمة',
    category: 'مكافحة الآفات والحشرات',
    unitOfMeasure: 'زيارة / شهرياً',
    standardBaseCostPerUnit: 2500,
    recommendedPricePerUnit: 3800,
    laborToMaterialRatio: '40% عمالة / 60% مبيدات ومعدات',
    description: 'رش المبيدات الآمنة بيئياً والسيطرة على القوارض والحشرات وفق معايير الصحة'
  },
  {
    serviceUid: 'SRV-3004',
    serviceName: 'العناية بالحدائق والمساحات الخضراء',
    category: 'العناية بالحدائق والمساحات الخضراء',
    unitOfMeasure: 'متر مربع / شهرياً',
    standardBaseCostPerUnit: 2.8,
    recommendedPricePerUnit: 4.2,
    laborToMaterialRatio: '60% عمالة / 40% أسمدة وماء ومعدات',
    description: 'تقليم الأشجار وشبكات الري والأسمدة وزراعة الزهور الموسمية'
  },
  {
    serviceUid: 'SRV-3005',
    serviceName: 'خدمات الضيافة والمكتبية (بوفيه)',
    category: 'الضيافة وخدمات المكاتب',
    unitOfMeasure: 'مضيف / شهرياً',
    standardBaseCostPerUnit: 3200,
    recommendedPricePerUnit: 4500,
    laborToMaterialRatio: '85% عمالة / 15% مستهلكات',
    description: 'تقديم المشروبات للضيوف والموظفين وإدارة البوفيهات واجتماعات الإدارة'
  },
  {
    serviceUid: 'SRV-3006',
    serviceName: 'إدارة وتدوير النفايات الطبية والعامة',
    category: 'إدارة وتدوير النفايات',
    unitOfMeasure: 'طن / شهرياً',
    standardBaseCostPerUnit: 450,
    recommendedPricePerUnit: 680,
    laborToMaterialRatio: '30% عمالة / 70% نقل ونظافة تخصصية',
    description: 'جمع ونقل النفايات والتخلص الآمن وفق الأنظمة البيئية'
  },
  {
    serviceUid: 'SRV-3007',
    serviceName: 'جلي وتلميع الرخام والأرضيات',
    category: 'جلي وتلميع الرخام والأرضيات',
    unitOfMeasure: 'متر مربع / دورياً',
    standardBaseCostPerUnit: 8.5,
    recommendedPricePerUnit: 13.0,
    laborToMaterialRatio: '50% عمالة / 50% أقراص الماسة وكريستال',
    description: 'جلي وتلميع وإعادة معالجة رخام المداخل والبهو الرئيسي'
  },
  {
    serviceUid: 'SRV-3008',
    serviceName: 'نظافة الواجهات الزجاجية الخارجية',
    category: 'نظافة الواجهات الزجاجية',
    unitOfMeasure: 'متر مربع / كل 3 أشهر',
    standardBaseCostPerUnit: 12.0,
    recommendedPricePerUnit: 18.5,
    laborToMaterialRatio: '70% عمالة مدربة / 30% رافعات ومواد',
    description: 'تنظيف الواجهات المرتفعة باستخدام الرافعات وفرق السقالات مع معايير الأمان'
  }
];

export const MOCK_LABOR: LaborItem[] = [
  {
    employeeUid: 'EMP-4001',
    jobUid: 'JOB-01',
    contractUid: 'CNT-2026-001',
    siteUid: 'STE-2001',
    jobTitle: 'مشرف نظافة موقع',
    nationality: 'سعودي',
    count: 2,
    basicSalaryMonthly: 5000,
    housingAllowanceMonthly: 1250,
    transportAllowanceMonthly: 500,
    foodAllowanceMonthly: 300,
    otherAllowancesMonthly: 200,
    overtimeHoursMonthly: 10,
    overtimeHourlyRate: 35,
    insuranceCostMonthly: 600,
    vacationProvisionMonthly: 450,
    replacementCostMonthly: 350,
    trainingCostMonthly: 200,
    totalLaborCostMonthly: 9200,
    totalLaborCostAnnual: 110400
  },
  {
    employeeUid: 'EMP-4002',
    jobUid: 'JOB-02',
    contractUid: 'CNT-2026-001',
    siteUid: 'STE-2001',
    jobTitle: 'عامل نظافة متخصص',
    nationality: 'أجنبي',
    count: 18,
    basicSalaryMonthly: 1800,
    housingAllowanceMonthly: 400,
    transportAllowanceMonthly: 200,
    foodAllowanceMonthly: 300,
    otherAllowancesMonthly: 100,
    overtimeHoursMonthly: 20,
    overtimeHourlyRate: 15,
    insuranceCostMonthly: 250,
    vacationProvisionMonthly: 200,
    replacementCostMonthly: 180,
    trainingCostMonthly: 80,
    totalLaborCostMonthly: 3810,
    totalLaborCostAnnual: 45720
  },
  {
    employeeUid: 'EMP-4003',
    jobUid: 'JOB-03',
    contractUid: 'CNT-2026-002',
    siteUid: 'STE-2002',
    jobTitle: 'مشرف تطهير وتعقيم طبي',
    nationality: 'سعودي',
    count: 1,
    basicSalaryMonthly: 6000,
    housingAllowanceMonthly: 1500,
    transportAllowanceMonthly: 600,
    foodAllowanceMonthly: 400,
    otherAllowancesMonthly: 300,
    overtimeHoursMonthly: 15,
    overtimeHourlyRate: 40,
    insuranceCostMonthly: 750,
    vacationProvisionMonthly: 550,
    replacementCostMonthly: 400,
    trainingCostMonthly: 300,
    totalLaborCostMonthly: 11400,
    totalLaborCostAnnual: 136800
  },
  {
    employeeUid: 'EMP-4004',
    jobUid: 'JOB-04',
    contractUid: 'CNT-2026-003',
    siteUid: 'STE-2003',
    jobTitle: 'حارس أمن سلامة',
    nationality: 'سعودي',
    count: 12,
    basicSalaryMonthly: 3500,
    housingAllowanceMonthly: 875,
    transportAllowanceMonthly: 400,
    foodAllowanceMonthly: 300,
    otherAllowancesMonthly: 150,
    overtimeHoursMonthly: 12,
    overtimeHourlyRate: 25,
    insuranceCostMonthly: 450,
    vacationProvisionMonthly: 320,
    replacementCostMonthly: 280,
    trainingCostMonthly: 150,
    totalLaborCostMonthly: 6725,
    totalLaborCostAnnual: 80700
  }
];

export const MOCK_MATERIALS: MaterialItem[] = [
  {
    materialUid: 'MAT-5001',
    contractUid: 'CNT-2026-001',
    siteUid: 'STE-2001',
    serviceUid: 'SRV-3001',
    materialName: 'منظفات ومطهرات أرضيات مركزة (درام 20 لتر)',
    category: 'مواد نظافة كيميائية',
    unit: 'درام',
    monthlyQuantity: 15,
    unitPrice: 280,
    durationMonths: 12,
    totalCost: 50400
  },
  {
    materialUid: 'MAT-5002',
    contractUid: 'CNT-2026-002',
    siteUid: 'STE-2002',
    serviceUid: 'SRV-3001',
    materialName: 'مطهرات طبية ومعقمات أيدي معتمدة من وزارة الصحة',
    category: 'تعقيم طبي',
    unit: 'كرتون (12 عبوة)',
    monthlyQuantity: 25,
    unitPrice: 420,
    durationMonths: 12,
    totalCost: 126000
  },
  {
    materialUid: 'MAT-5003',
    contractUid: 'CNT-2026-003',
    siteUid: 'STE-2003',
    serviceUid: 'SRV-3003',
    materialName: 'مبيدات حشرية وطعوم آمنة للبيئة والمحلات التجارية',
    category: 'مكافحة آفات',
    unit: 'عبوة 5 كجم',
    monthlyQuantity: 10,
    unitPrice: 350,
    durationMonths: 12,
    totalCost: 42000
  }
];

export const MOCK_EQUIPMENT: EquipmentItem[] = [
  {
    equipmentUid: 'EQP-6001',
    contractUid: 'CNT-2026-001',
    siteUid: 'STE-2001',
    serviceUid: 'SRV-3001',
    equipmentName: 'ماكينة غسيل أرضيات راكبة (Ride-on Scrubber)',
    acquisitionType: 'إيجار',
    count: 2,
    monthlyCostPerUnit: 2200,
    maintenanceMonthlyPerUnit: 300,
    depreciationMonthlyPerUnit: 0,
    durationMonths: 12,
    totalCost: 60000
  },
  {
    equipmentUid: 'EQP-6002',
    contractUid: 'CNT-2026-001',
    siteUid: 'STE-2001',
    serviceUid: 'SRV-3007',
    equipmentName: 'ماكينة جلي وتلميع رخام إيطالية (Single Disc)',
    acquisitionType: 'شراء',
    count: 3,
    monthlyCostPerUnit: 0,
    maintenanceMonthlyPerUnit: 250,
    depreciationMonthlyPerUnit: 450,
    durationMonths: 12,
    totalCost: 25200
  }
];

export const MOCK_FLEET: FleetItem[] = [
  {
    vehicleUid: 'FLT-7001',
    contractUid: 'CNT-2026-001',
    vehicleType: 'حافلة نقل عمالة (30 راكب)',
    count: 1,
    monthlyRentalOrDepreciation: 3800,
    monthlyFuelCost: 1200,
    monthlyMaintenanceCost: 500,
    driverSalaryMonthly: 3500,
    durationMonths: 12,
    totalCost: 108000
  },
  {
    vehicleUid: 'FLT-7002',
    contractUid: 'CNT-2026-003',
    vehicleType: 'سيارة نقل بضائع ومعدات (وانيت)',
    count: 1,
    monthlyRentalOrDepreciation: 2200,
    monthlyFuelCost: 800,
    monthlyMaintenanceCost: 300,
    driverSalaryMonthly: 2800,
    durationMonths: 12,
    totalCost: 73200
  }
];

export const MOCK_CONTRACTS: Contract[] = [
  {
    contractUid: 'CNT-2026-001',
    opportunityUid: 'OPP-9001',
    clientUid: 'CLT-1001',
    clientName: 'شركة الأبراج القابضة للتطوير العقاري',
    contractTitle: 'عقد إدارة ونظافة وضيافة برج الأبراج المالي',
    status: 'نشط',
    lifecycleStage: '10_تهيئة_وتشغيل',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    durationMonths: 12,
    sitesCount: 1,
    assignedManager: 'م. أحمد منصور',
    directLaborCost: 957600,
    directMaterialsCost: 50400,
    directEquipmentCost: 85200,
    directFleetCost: 108000,
    totalDirectCost: 1201200,
    indirectCost: 144144, // 12%
    administrativeCost: 96096, // 8%
    contingencyReserve: 60060, // 5%
    totalCost: 1501500,
    contractPrice: 1925000,
    vatAmount: 288750, // 15%
    totalPriceWithVat: 2213750,
    grossProfit: 423500,
    profitMarginPercent: 22.0,
    markupPercent: 28.2,
    breakEvenRevenue: 1501500,
    isTestData: true
  },
  {
    contractUid: 'CNT-2026-002',
    opportunityUid: 'OPP-9002',
    clientUid: 'CLT-1002',
    clientName: 'مجموعة المجمعات الطبية الحديثة',
    contractTitle: 'عقد التطهير والتعقيم والخدمات المساندة لمستشفى الشفاء',
    status: 'نشط',
    lifecycleStage: '11_رقابة_وجودة',
    startDate: '2026-02-01',
    endDate: '2027-01-31',
    durationMonths: 12,
    sitesCount: 1,
    assignedManager: 'د. سامي القحطاني',
    directLaborCost: 780000,
    directMaterialsCost: 126000,
    directEquipmentCost: 48000,
    directFleetCost: 36000,
    totalDirectCost: 990000,
    indirectCost: 118800,
    administrativeCost: 79200,
    contingencyReserve: 49500,
    totalCost: 1237500,
    contractPrice: 1610000,
    vatAmount: 241500,
    totalPriceWithVat: 1851500,
    grossProfit: 372500,
    profitMarginPercent: 23.1,
    markupPercent: 30.1,
    breakEvenRevenue: 1237500,
    isTestData: true
  },
  {
    contractUid: 'CNT-2026-003',
    opportunityUid: 'OPP-9003',
    clientUid: 'CLT-1003',
    clientName: 'شركة المراكز التجارية والاستثمار',
    contractTitle: 'عقد الحراسات الأمنية والنظافة ومكافحة الآفات لمول النخيل',
    status: 'نشط',
    lifecycleStage: '12_فوترة',
    startDate: '2026-03-01',
    endDate: '2027-02-28',
    durationMonths: 12,
    sitesCount: 1,
    assignedManager: 'أ. خالد الشمري',
    directLaborCost: 1162000,
    directMaterialsCost: 42000,
    directEquipmentCost: 36000,
    directFleetCost: 73200,
    totalDirectCost: 1313200,
    indirectCost: 157584,
    administrativeCost: 105056,
    contingencyReserve: 65660,
    totalCost: 1641500,
    contractPrice: 2080000,
    vatAmount: 312000,
    totalPriceWithVat: 2392000,
    grossProfit: 438500,
    profitMarginPercent: 21.1,
    markupPercent: 26.7,
    breakEvenRevenue: 1641500,
    isTestData: true
  },
  {
    contractUid: 'CNT-2026-004',
    opportunityUid: 'OPP-9004',
    clientUid: 'CLT-1001',
    clientName: 'شركة الأبراج القابضة للتطوير العقاري',
    contractTitle: 'عقد صيانة الحدائق والنظافة العامة لمجمع الواحة السكني',
    status: 'قيد التفاوض',
    lifecycleStage: '07_تفاوض',
    startDate: '2026-05-01',
    endDate: '2027-04-30',
    durationMonths: 12,
    sitesCount: 1,
    assignedManager: 'م. حسام العلي',
    directLaborCost: 420000,
    directMaterialsCost: 35000,
    directEquipmentCost: 28000,
    directFleetCost: 24000,
    totalDirectCost: 507000,
    indirectCost: 60840,
    administrativeCost: 40560,
    contingencyReserve: 25350,
    totalCost: 633750,
    contractPrice: 810000,
    vatAmount: 121500,
    totalPriceWithVat: 931500,
    grossProfit: 176250,
    profitMarginPercent: 21.8,
    markupPercent: 27.8,
    breakEvenRevenue: 633750,
    isTestData: true
  },
  {
    contractUid: 'CNT-2026-005',
    opportunityUid: 'OPP-9005',
    clientUid: 'CLT-1002',
    clientName: 'مجموعة المجمعات الطبية الحديثة',
    contractTitle: 'عقد خدمات إدارة وتدوير النفايات الطبية لمركز الأبحاث',
    status: 'قريب من الانتهاء',
    lifecycleStage: '16_تجديد_وتمديد',
    startDate: '2025-10-01',
    endDate: '2026-09-30',
    durationMonths: 12,
    sitesCount: 1,
    assignedManager: 'م. ناصر الزهراني',
    directLaborCost: 310000,
    directMaterialsCost: 80000,
    directEquipmentCost: 20000,
    directFleetCost: 30000,
    totalDirectCost: 440000,
    indirectCost: 52800,
    administrativeCost: 35200,
    contingencyReserve: 22000,
    totalCost: 550000,
    contractPrice: 700000,
    vatAmount: 105000,
    totalPriceWithVat: 805000,
    grossProfit: 150000,
    profitMarginPercent: 21.4,
    markupPercent: 27.3,
    breakEvenRevenue: 550000,
    isTestData: true
  }
];

export const MOCK_LIFECYCLE_LOGS: ContractLifecycleLog[] = [
  {
    logId: 'LOG-001',
    contractUid: 'CNT-2026-001',
    stage: '01_فرصة',
    stageDate: '2025-11-01',
    responsiblePerson: 'أ. محمد العتيبي (مدير المبيعات)',
    status: 'مكتمل',
    durationDays: 5,
    startDate: '2025-11-01',
    endDate: '2025-11-05',
    delayDays: 0,
    notes: 'استلام كراسة الشروط والمواصفات من العميل',
    financialImpact: 0,
    riskAssessment: 'منخفض'
  },
  {
    logId: 'LOG-002',
    contractUid: 'CNT-2026-001',
    stage: '04_مسح_موقع',
    stageDate: '2025-11-12',
    responsiblePerson: 'م. أحمد منصور (مهندس التشغيل)',
    status: 'مكتمل',
    durationDays: 3,
    startDate: '2025-11-12',
    endDate: '2025-11-15',
    delayDays: 0,
    notes: 'إجراء دراسة مسح ميداني للبرج وتحديد كفاءة العمالة المطلوبة',
    financialImpact: 5000,
    riskAssessment: 'منخفض'
  },
  {
    logId: 'LOG-003',
    contractUid: 'CNT-2026-001',
    stage: '05_تسعير',
    stageDate: '2025-11-20',
    responsiblePerson: 'أ. ياسر الحربي (محلل التكاليف)',
    status: 'مكتمل',
    durationDays: 4,
    startDate: '2025-11-20',
    endDate: '2025-11-24',
    delayDays: 0,
    notes: 'حساب التكاليف المباشرة وغير المباشرة وتطبيق هامش ربح 22%',
    financialImpact: 0,
    riskAssessment: 'متوسط'
  },
  {
    logId: 'LOG-004',
    contractUid: 'CNT-2026-001',
    stage: '10_تهيئة_وتشغيل',
    stageDate: '2026-01-01',
    responsiblePerson: 'م. أحمد منصور',
    status: 'قيد التنفيذ',
    durationDays: 365,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    delayDays: 0,
    notes: 'تأمين العمالة والمعدات وبدء تنفيذ العمليات بالموقع',
    financialImpact: 1925000,
    riskAssessment: 'متوسط'
  }
];

export const MOCK_WORK_ORDERS: WorkOrder[] = [
  {
    workOrderUid: 'WO-2026-101',
    contractUid: 'CNT-2026-001',
    siteUid: 'STE-2001',
    siteName: 'برج الأبراج المالي',
    serviceUid: 'SRV-3007',
    serviceName: 'جلي وتلميع رخام البهو الرئيسي',
    title: 'تلميع دوري شامل لرخام المداخل والبهو الرئيسي قبل زيارة الوفد',
    priority: 'عالي جداً',
    status: 'مكتمل',
    plannedCost: 8500,
    actualCost: 8200,
    costVariance: -300,
    assignedSupervisor: 'م. فهد الخالد',
    creationDate: '2026-01-10',
    completionDate: '2026-01-12'
  },
  {
    workOrderUid: 'WO-2026-102',
    contractUid: 'CNT-2026-002',
    siteUid: 'STE-2002',
    siteName: 'مستشفى الشفاء التخصصي',
    serviceUid: 'SRV-3001',
    serviceName: 'تعقيم غرف العمليات والعناية',
    title: 'تعقيم طارئ وشامل للقسم الشرقي لغرف العمليات',
    priority: 'عالي جداً',
    status: 'مكتمل',
    plannedCost: 12000,
    actualCost: 12500,
    costVariance: 500,
    assignedSupervisor: 'أ. طارق عبد العزيز',
    creationDate: '2026-02-05',
    completionDate: '2026-02-06'
  },
  {
    workOrderUid: 'WO-2026-103',
    contractUid: 'CNT-2026-003',
    siteUid: 'STE-2003',
    siteName: 'مول النخيل التجاري',
    serviceUid: 'SRV-3003',
    serviceName: 'رش وتطهير منطقة المطاعم',
    title: 'حملة مكافحة الآفات الشهرية الشاملة لمنطقة المطاعم (Food Court)',
    priority: 'عالي',
    status: 'قيد التنفيذ',
    plannedCost: 4500,
    actualCost: 4500,
    costVariance: 0,
    assignedSupervisor: 'سعود الشهري',
    creationDate: '2026-03-01',
    completionDate: '2026-03-02'
  }
];

export const MOCK_INVOICES: Invoice[] = [
  {
    invoiceUid: 'INV-2026-501',
    contractUid: 'CNT-2026-001',
    clientName: 'شركة الأبراج القابضة للتطوير العقاري',
    invoiceNumber: 'INV-2026-01',
    issueDate: '2026-01-31',
    dueDate: '2026-03-15',
    grossAmount: 160416.67,
    discount: 0,
    taxableAmount: 160416.67,
    vatAmount: 24062.50,
    penalties: 0,
    deductions: 0,
    netInvoiceAmount: 184479.17,
    collectedAmount: 184479.17,
    remainingBalance: 0,
    status: 'مدفوعة بالكامل',
    agingDays: 0
  },
  {
    invoiceUid: 'INV-2026-502',
    contractUid: 'CNT-2026-001',
    clientName: 'شركة الأبراج القابضة للتطوير العقاري',
    invoiceNumber: 'INV-2026-02',
    issueDate: '2026-02-28',
    dueDate: '2026-04-14',
    grossAmount: 160416.67,
    discount: 0,
    taxableAmount: 160416.67,
    vatAmount: 24062.50,
    penalties: 0,
    deductions: 0,
    netInvoiceAmount: 184479.17,
    collectedAmount: 100000.00,
    remainingBalance: 84479.17,
    status: 'مدفوعة جزئياً',
    agingDays: 15
  },
  {
    invoiceUid: 'INV-2026-503',
    contractUid: 'CNT-2026-002',
    clientName: 'مجموعة المجمعات الطبية الحديثة',
    invoiceNumber: 'INV-MED-01',
    issueDate: '2026-02-28',
    dueDate: '2026-03-30',
    grossAmount: 134166.67,
    discount: 0,
    taxableAmount: 134166.67,
    vatAmount: 20125.00,
    penalties: 1500,
    deductions: 0,
    netInvoiceAmount: 152791.67,
    collectedAmount: 0,
    remainingBalance: 152791.67,
    status: 'غير مدفوعة',
    agingDays: 42
  }
];

export const MOCK_CHANGE_ORDERS: ChangeOrder[] = [
  {
    changeUid: 'CHG-8001',
    contractUid: 'CNT-2026-001',
    requestDate: '2026-02-10',
    reason: 'إضافة دورين إضافيين بالبرج (نطاق جديد)',
    description: 'توفير 4 عمال نظافة إضافيين مع مستهلكاتهم',
    costVariance: 18000,
    revenueVariance: 24000,
    profitImpact: 6000,
    timeImpactDays: 0,
    approvalStatus: 'معتمد'
  }
];

export const MOCK_CLAIMS: Claim[] = [
  {
    claimUid: 'CLM-8501',
    contractUid: 'CNT-2026-002',
    submissionDate: '2026-02-20',
    claimant: 'المقاول',
    cause: 'تعويض عن زيادة أسعار المطهرات الطبية المستوردة بنسبة 15%',
    claimedAmount: 18500,
    settledAmount: 12000,
    status: 'مسواة',
    legalImpact: 'تم توقيع الملحق المالي للتسوية بالتراضي'
  }
];

export const MOCK_RISKS: RiskItem[] = [
  {
    riskUid: 'RSK-6001',
    contractUid: 'CNT-2026-001',
    category: 'عمالة',
    description: 'تسرب أو غياب بعض العمالة في أوقات الأعياد والمواسم',
    cause: 'نقص خطة الاستبدال السريعة في الإجازات',
    probability: 3,
    impact: 4,
    riskScore: 12,
    riskLevel: 'عالي',
    preventiveAction: 'توفير كادر احتياطي (Floater staff) بنسبة 10% وتطبيق حوافز مواسم',
    correctiveAction: 'استدعاء عمالة من عقود مساندة مجاورة خلال 3 ساعات',
    owner: 'م. أحمد منصور',
    dueDate: '2026-06-30',
    status: 'نشط',
    potentialCostImpact: 25000
  },
  {
    riskUid: 'RSK-6002',
    contractUid: 'CNT-2026-002',
    category: 'سلامة وجودة',
    description: 'مخاطر انتقال العدوى أو قصور التطهير في غرف العناية',
    cause: 'عدم الالتزام بدليل معايير التعقيم الطبي القياسي',
    probability: 2,
    impact: 5,
    riskScore: 10,
    riskLevel: 'عالي',
    preventiveAction: 'تدريب مكثف وفحص دوري من الاستشاري البيئي بالمستشفى',
    correctiveAction: 'إعادة التعقيم فوراً وفرض غرامة على المشرف المسؤول',
    owner: 'د. سامي القحطاني',
    dueDate: '2026-12-31',
    status: 'تم التخفيف',
    potentialCostImpact: 50000
  },
  {
    riskUid: 'RSK-6003',
    contractUid: 'CNT-2026-003',
    category: 'مالية',
    description: 'تأخر العميل في سداد المستخلصات لأكثر من 60 يوماً',
    cause: 'الدورة المستندية الطويلة للعميل',
    probability: 4,
    impact: 3,
    riskScore: 12,
    riskLevel: 'عالي',
    preventiveAction: 'ربط رفع الاعتماد بمواعيد محددة ومتابعة أسبوعية مع قسم الحسابات',
    correctiveAction: 'إرسال خطاب إشعار رسمي وتطبيق شرط الدفع المؤجل',
    owner: 'أ. خالد الشمري',
    dueDate: '2026-05-15',
    status: 'نشط',
    potentialCostImpact: 40000
  }
];

export const MOCK_KPIS: KpiMetric[] = [
  {
    kpiUid: 'KPI-7001',
    contractUid: 'CNT-2026-001',
    metricName: 'نسبة الالتزام بمستويات الخدمة (SLA Compliance)',
    category: 'الامتثال للـ SLA',
    unit: '%',
    targetValue: 98,
    actualValue: 98.5,
    variance: 0.5,
    slaCompliancePercent: 100.5,
    status: 'ممتاز'
  },
  {
    kpiUid: 'KPI-7002',
    contractUid: 'CNT-2026-001',
    metricName: 'متوسط زمن الاستجابة للبلاغات الطارئة',
    category: 'الالتزام بالوقت',
    unit: 'دقيقة',
    targetValue: 15,
    actualValue: 12,
    variance: -3,
    slaCompliancePercent: 120,
    status: 'ممتاز'
  },
  {
    kpiUid: 'KPI-7003',
    contractUid: 'CNT-2026-002',
    metricName: 'درجة التقييم الفني للنظافة والتعقيم بالمستشفى',
    category: 'جودة الخدمة',
    unit: '%',
    targetValue: 95,
    actualValue: 96.2,
    variance: 1.2,
    slaCompliancePercent: 101.2,
    status: 'ممتاز'
  },
  {
    kpiUid: 'KPI-7004',
    contractUid: 'CNT-2026-003',
    metricName: 'نسبة انتظام وحضور الحراسات الأمنية بالمول',
    category: 'الإنتاجية والسلامة',
    unit: '%',
    targetValue: 99,
    actualValue: 97.5,
    variance: -1.5,
    slaCompliancePercent: 98.4,
    status: 'مقبول'
  }
];

export const MOCK_AUDIT_LOG: AuditLogEntry[] = [
  {
    auditId: 'AUD-001',
    timestamp: '2026-03-10 10:15',
    ruleCategory: 'UID Validation',
    severity: 'معلومات',
    message: 'تم التحقق من سلامة كافة معرفات الـ UID (عدم وجود تكرار) عبر 42 ورقة عمل',
    affectedUid: 'ALL_SYSTEM_UIDS',
    status: 'تمت المعالجة'
  },
  {
    auditId: 'AUD-002',
    timestamp: '2026-03-11 14:30',
    ruleCategory: 'Billing Anomaly',
    severity: 'تنبيه',
    message: 'تأخر سداد الفاتورة INV-MED-01 لمستشفى الشفاء لمدة 42 يوماً تجاوز الحد الائتماني المسموح (30 يوماً)',
    affectedUid: 'INV-MED-01',
    status: 'يتطلب مراجعة'
  },
  {
    auditId: 'AUD-003',
    timestamp: '2026-03-12 09:00',
    ruleCategory: 'Contract Expiry',
    severity: 'تنبيه',
    message: 'العقد CNT-2026-005 سينتهي خلال أقل من 180 يوماً - يجب بدء إجراءات التجديد والتمديد',
    affectedUid: 'CNT-2026-005',
    status: 'يتطلب مراجعة'
  }
];

export const DATA_DICTIONARY = [
  { field: 'Contract UID', type: 'String (PK)', description: 'المفتاح المركزي الموحد للربط بين جميع جداول العقد' },
  { field: 'Client UID', type: 'String (FK)', description: 'معرف العميل المرتبط بالعقد' },
  { field: 'Site UID', type: 'String (FK)', description: 'معرف الموقع أو المنشأة التشغيلية' },
  { field: 'Service UID', type: 'String (FK)', description: 'معرف نوع الخدمة من كتالوج الخدمات الناعمة' },
  { field: 'Total Direct Cost', type: 'Currency (SAR)', description: 'التكاليف المباشرة = عمالة + مواد + معدات + نقل' },
  { field: 'Total Indirect Cost', type: 'Currency (SAR)', description: 'التكاليف غير المباشرة = نسبة مئوية محددة في الإعدادات' },
  { field: 'Break-Even Revenue', type: 'Currency (SAR)', description: 'نقطة التعادل المالية حيث يتعادل إجمالي الإيراد مع التكاليف' },
  { field: 'Profit Margin %', type: 'Percentage', description: 'نسبة هامش الربح = (صافي الربح ÷ إجمالي سعر العقد) × 100' }
];
