import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import {
  MOCK_CONTRACTS,
  MOCK_CLIENTS,
  MOCK_SITES,
  MOCK_SERVICES,
  MOCK_LABOR,
  MOCK_MATERIALS,
  MOCK_EQUIPMENT,
  MOCK_FLEET,
  MOCK_WORK_ORDERS,
  MOCK_INVOICES,
  MOCK_CHANGE_ORDERS,
  MOCK_CLAIMS,
  MOCK_RISKS,
  MOCK_KPIS,
  MOCK_AUDIT_LOG,
  INITIAL_SETTINGS,
  DATA_DICTIONARY
} from '../data/mockData';

export async function exportToExcelSystem() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'نظام إدارة عقود الخدمات الناعمة Enterprise System';
  workbook.lastModifiedBy = 'مدير النظام';
  workbook.created = new Date();

  // All 42 sheets requested
  const sheetsNames = [
    '01_الرئيسية',
    '02_لوحة_التحكم',
    '03_العملاء',
    '04_الفرص',
    '05_التأهيل_والجدوى',
    '06_العقود',
    '07_دورة_حياة_العقد',
    '08_المواقع',
    '09_كتالوج_الخدمات',
    '10_دراسة_الموقع',
    '11_العمالة_والوظائف',
    '12_الورديات_والساعات',
    '13_المواد_والمستهلكات',
    '14_المعدات_والأدوات',
    '15_النقل_والوقود',
    '16_التكاليف_المباشرة',
    '17_التكاليف_غير_المباشرة',
    '18_المصاريف_الإدارية',
    '19_الالتزامات_والضرائب',
    '20_محرك_التكلفة',
    '21_التسعير',
    '22_الربحية',
    '23_أوامر_العمل',
    '24_التشغيل_الفعلي',
    '25_الفوترة',
    '26_التحصيل',
    '27_الانحرافات',
    '28_إدارة_التغيير',
    '29_المطالبات',
    '30_المخاطر',
    '31_KPI_SLA',
    '32_الجودة_والسلامة',
    '33_التجديد_والتمديد',
    '34_الإغلاق',
    '35_التقييم_بعد_العقد',
    '36_السيناريوهات',
    '37_المقارنات',
    '38_التقارير',
    '39_القوائم_والمرجعيات',
    '40_قاموس_البيانات',
    '41_سجل_التدقيق',
    '42_الإعدادات'
  ];

  const worksheetsMap: Record<string, ExcelJS.Worksheet> = {};

  // Create all sheets with RTL view
  sheetsNames.forEach((sName) => {
    const ws = workbook.addWorksheet(sName, {
      views: [{ rightToLeft: true }]
    });
    worksheetsMap[sName] = ws;

    // Add Header Banner
    const cleanTitle = sName.replace('_', ' ');
    ws.mergeCells('A1:J1');
    const titleCell = ws.getCell('A1');
    titleCell.value = `نظام إدارة وتحليل عقود الخدمات الناعمة | ${cleanTitle}`;
    titleCell.font = { name: 'Calibri', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(1).height = 35;

    ws.mergeCells('A2:J2');
    const subCell = ws.getCell('A2');
    subCell.value = 'نظام مؤسسي متكامل - جميع البيانات مشفرة بواسطة Contract UID - بيانات اختبارية Test Data';
    subCell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFE2E8F0' } };
    subCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2563EB' } };
    subCell.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(2).height = 22;
  });

  // Populate 42_الإعدادات
  const wsSettings = worksheetsMap['42_الإعدادات'];
  const setHeaders = ['رمز الإعداد', 'اسم الإعداد النظامي', 'القيمة', 'الوحدة', 'ملاحظات الاستخدام'];
  wsSettings.getRow(4).values = setHeaders;
  styleHeaderRow(wsSettings.getRow(4));

  const settingsRows = [
    ['SET_01', 'نسبة التكاليف غير المباشرة (Indirect Cost Rate)', INITIAL_SETTINGS.indirectCostRate, 'نسبة مئوية', 'تُطبق على التكاليف المباشرة'],
    ['SET_02', 'نسبة المصاريف الإدارية (Administrative SG&A Rate)', INITIAL_SETTINGS.administrativeExpenseRate, 'نسبة مئوية', 'مصاريف إدارة ودعم'],
    ['SET_03', 'احتياطي الطوارئ والمخاطر (Contingency Reserve Rate)', INITIAL_SETTINGS.contingencyRate, 'نسبة مئوية', 'احتياطي للمخاطر المفاجئة'],
    ['SET_04', 'نسبة ضريبة القيمة المضافة (VAT Rate)', INITIAL_SETTINGS.vatRate, 'نسبة مئوية', 'ضريبة القيمة المضافة بالتعليمات'],
    ['SET_05', 'هامش الربح المستهدف (Target Profit Margin Rate)', INITIAL_SETTINGS.targetProfitMargin, 'نسبة مئوية', 'الهامش المستهدف للتسعير القياسي'],
    ['SET_06', 'نسبة التأمينات للعمالة (Labor Insurance Rate)', INITIAL_SETTINGS.laborInsuranceRate, 'نسبة مئوية', 'تأمينات اجتماعية وصحية'],
    ['SET_07', 'معامل بدلاء الإجازات (Vacation Replacement Factor)', INITIAL_SETTINGS.vacationReplacementFactor, 'معامل سنوي', 'لتغطية بدلاء الإجازات السنوية'],
    ['SET_08', 'معدل التضخم السنوي (Annual Escalation Rate)', INITIAL_SETTINGS.annualEscalationRate, 'نسبة مئوية', 'لتعديل التكلفة سنويًا'],
    ['SET_09', 'العملة الرسمية (System Currency)', INITIAL_SETTINGS.currency, 'رمز العملة', 'العملة الرسمية المعتمدة للنظام']
  ];

  settingsRows.forEach((r, idx) => {
    const row = wsSettings.getRow(5 + idx);
    row.values = r;
    if (typeof r[2] === 'number') {
      row.getCell(3).numFmt = '0.00%';
    }
    styleBodyRow(row);
  });

  // Populate 06_العقود
  const wsContracts = worksheetsMap['06_العقود'];
  const cntHeaders = [
    'Contract UID',
    'Client UID',
    'اسم العميل',
    'عنوان العقد',
    'حالة العقد',
    'مرحلة دورة الحياة',
    'تاريخ البداية',
    'تاريخ النهاية',
    'المدة (شهر)',
    'التكلفة المباشرة',
    'التكلفة غير المباشرة',
    'إجمالي التكلفة',
    'سعر العقد الإجمالي',
    'الربح الإجمالي',
    'هامش الربح %'
  ];
  wsContracts.getRow(4).values = cntHeaders;
  styleHeaderRow(wsContracts.getRow(4));

  MOCK_CONTRACTS.forEach((c, idx) => {
    const rowNum = 5 + idx;
    const row = wsContracts.getRow(rowNum);
    row.values = [
      c.contractUid,
      c.clientUid,
      c.clientName,
      c.contractTitle,
      c.status,
      c.lifecycleStage,
      c.startDate,
      c.endDate,
      c.durationMonths,
      c.totalDirectCost,
      { formula: `J${rowNum}*'42_الإعدادات'!$C$5` }, // Formula referencing Indirect Cost Rate
      { formula: `J${rowNum}+K${rowNum}` }, // Formula: Direct + Indirect
      c.contractPrice,
      { formula: `M${rowNum}-L${rowNum}` }, // Formula: Price - Total Cost
      { formula: `N${rowNum}/M${rowNum}` } // Formula: Profit / Price
    ];

    row.getCell(10).numFmt = '#,##0 "ر.س"';
    row.getCell(11).numFmt = '#,##0 "ر.س"';
    row.getCell(12).numFmt = '#,##0 "ر.س"';
    row.getCell(13).numFmt = '#,##0 "ر.س"';
    row.getCell(14).numFmt = '#,##0 "ر.س"';
    row.getCell(15).numFmt = '0.00%';
    styleBodyRow(row);
  });

  // Populate 03_العملاء
  const wsClients = worksheetsMap['03_العملاء'];
  wsClients.getRow(4).values = ['Client UID', 'اسم العميل', 'القطاع/الصناعة', 'الشخص المسؤول', 'الهاتف', 'البريد الإلكتروني', 'المدينة', 'الحد الائتماني', 'شروط الدفع (يوم)', 'التقييم'];
  styleHeaderRow(wsClients.getRow(4));
  MOCK_CLIENTS.forEach((cl, idx) => {
    const row = wsClients.getRow(5 + idx);
    row.values = [cl.clientUid, cl.name, cl.industry, cl.contactPerson, cl.phone, cl.email, cl.city, cl.creditLimit, cl.paymentTermsDays, cl.rating];
    row.getCell(8).numFmt = '#,##0 "ر.س"';
    styleBodyRow(row);
  });

  // Populate 08_المواقع
  const wsSites = worksheetsMap['08_المواقع'];
  wsSites.getRow(4).values = ['Site UID', 'Contract UID', 'Client UID', 'اسم الموقع', 'المدينة', 'المساحة (م²)', 'نوع المبنى', 'عدد الأدوار', 'ساعات التشغيل', 'نوع الورديات'];
  styleHeaderRow(wsSites.getRow(4));
  MOCK_SITES.forEach((st, idx) => {
    const row = wsSites.getRow(5 + idx);
    row.values = [st.siteUid, st.contractUid, st.clientUid, st.siteName, st.locationCity, st.totalAreaSqm, st.buildingType, st.floorsCount, st.operatingHoursPerDay, st.shiftType];
    row.getCell(6).numFmt = '#,##0';
    styleBodyRow(row);
  });

  // Populate 09_كتالوج_الخدمات
  const wsServices = worksheetsMap['09_كتالوج_الخدمات'];
  wsServices.getRow(4).values = ['Service UID', 'اسم الخدمة', 'فئة الخدمة', 'وحدة القياس', 'التكلفة الأساسية القياسية', 'السعر الموصى به', 'نسبة العمالة للمواد', 'الوصف'];
  styleHeaderRow(wsServices.getRow(4));
  MOCK_SERVICES.forEach((srv, idx) => {
    const row = wsServices.getRow(5 + idx);
    row.values = [srv.serviceUid, srv.serviceName, srv.category, srv.unitOfMeasure, srv.standardBaseCostPerUnit, srv.recommendedPricePerUnit, srv.laborToMaterialRatio, srv.description];
    row.getCell(5).numFmt = '#,##0.00 "ر.س"';
    row.getCell(6).numFmt = '#,##0.00 "ر.س"';
    styleBodyRow(row);
  });

  // Populate 11_العمالة_والوظائف
  const wsLabor = worksheetsMap['11_العمالة_والوظائف'];
  wsLabor.getRow(4).values = ['Employee UID', 'Contract UID', 'Site UID', 'المسمى الوظيفي', 'الجنسية', 'العدد', 'الراتب الأساسي', 'البدلات الشهرية', 'التأمينات الشهرية', 'إجمالي التكلفة الشهرية', 'إجمالي التكلفة السنوية'];
  styleHeaderRow(wsLabor.getRow(4));
  MOCK_LABOR.forEach((lab, idx) => {
    const row = wsLabor.getRow(5 + idx);
    const allowances = lab.housingAllowanceMonthly + lab.transportAllowanceMonthly + lab.foodAllowanceMonthly + lab.otherAllowancesMonthly;
    row.values = [lab.employeeUid, lab.contractUid, lab.siteUid, lab.jobTitle, lab.nationality, lab.count, lab.basicSalaryMonthly, allowances, lab.insuranceCostMonthly, lab.totalLaborCostMonthly, lab.totalLaborCostAnnual];
    row.getCell(7).numFmt = '#,##0 "ر.س"';
    row.getCell(8).numFmt = '#,##0 "ر.س"';
    row.getCell(9).numFmt = '#,##0 "ر.س"';
    row.getCell(10).numFmt = '#,##0 "ر.س"';
    row.getCell(11).numFmt = '#,##0 "ر.س"';
    styleBodyRow(row);
  });

  // Populate 13_المواد_والمستهلكات
  const wsMat = worksheetsMap['13_المواد_والمستهلكات'];
  wsMat.getRow(4).values = ['Material UID', 'Contract UID', 'Site UID', 'اسم المادة', 'الفئة', 'الوحدة', 'الكمية الشهرية', 'سعر الوحدة', 'المدة (شهر)', 'إجمالي التكلفة'];
  styleHeaderRow(wsMat.getRow(4));
  MOCK_MATERIALS.forEach((mat, idx) => {
    const row = wsMat.getRow(5 + idx);
    row.values = [mat.materialUid, mat.contractUid, mat.siteUid, mat.materialName, mat.category, mat.unit, mat.monthlyQuantity, mat.unitPrice, mat.durationMonths, mat.totalCost];
    row.getCell(8).numFmt = '#,##0 "ر.س"';
    row.getCell(10).numFmt = '#,##0 "ر.س"';
    styleBodyRow(row);
  });

  // Populate 23_أوامر_العمل
  const wsWo = worksheetsMap['23_أوامر_العمل'];
  wsWo.getRow(4).values = ['Work Order UID', 'Contract UID', 'الموقع', 'عنوان أمر العمل', 'الأولوية', 'الحالة', 'التكلفة المخططة', 'التكلفة الفعلية', 'انحراف التكلفة', 'المشرف المسؤول', 'تاريخ الإنجاز'];
  styleHeaderRow(wsWo.getRow(4));
  MOCK_WORK_ORDERS.forEach((wo, idx) => {
    const row = wsWo.getRow(5 + idx);
    row.values = [wo.workOrderUid, wo.contractUid, wo.siteName, wo.title, wo.priority, wo.status, wo.plannedCost, wo.actualCost, wo.costVariance, wo.assignedSupervisor, wo.completionDate];
    row.getCell(7).numFmt = '#,##0 "ر.س"';
    row.getCell(8).numFmt = '#,##0 "ر.س"';
    row.getCell(9).numFmt = '#,##0 "ر.س"';
    styleBodyRow(row);
  });

  // Populate 25_الفوترة
  const wsInv = worksheetsMap['25_الفوترة'];
  wsInv.getRow(4).values = ['Invoice UID', 'Contract UID', 'اسم العميل', 'رقم الفاتورة', 'تاريخ الإصدار', 'تاريخ الاستحقاق', 'القيمة قبل الضريبة', 'الضريبة 15%', 'صافي الفاتورة', 'المبلغ المحصل', 'المتبقي', 'الحالة'];
  styleHeaderRow(wsInv.getRow(4));
  MOCK_INVOICES.forEach((inv, idx) => {
    const row = wsInv.getRow(5 + idx);
    row.values = [inv.invoiceUid, inv.contractUid, inv.clientName, inv.invoiceNumber, inv.issueDate, inv.dueDate, inv.taxableAmount, inv.vatAmount, inv.netInvoiceAmount, inv.collectedAmount, inv.remainingBalance, inv.status];
    row.getCell(7).numFmt = '#,##0.00 "ر.س"';
    row.getCell(8).numFmt = '#,##0.00 "ر.س"';
    row.getCell(9).numFmt = '#,##0.00 "ر.س"';
    row.getCell(10).numFmt = '#,##0.00 "ر.س"';
    row.getCell(11).numFmt = '#,##0.00 "ر.س"';
    styleBodyRow(row);
  });

  // Populate 30_المخاطر
  const wsRisk = worksheetsMap['30_المخاطر'];
  wsRisk.getRow(4).values = ['Risk UID', 'Contract UID', 'الفئة', 'وصف الخطر', 'الاحتمالية (1-5)', 'التأثير (1-5)', 'درجة الخطر (P×I)', 'مستوى الخطر', 'الإجراء الوقائي', 'المسؤول', 'الحالة'];
  styleHeaderRow(wsRisk.getRow(4));
  MOCK_RISKS.forEach((rsk, idx) => {
    const row = wsRisk.getRow(5 + idx);
    row.values = [rsk.riskUid, rsk.contractUid, rsk.category, rsk.description, rsk.probability, rsk.impact, rsk.riskScore, rsk.riskLevel, rsk.preventiveAction, rsk.owner, rsk.status];
    styleBodyRow(row);
  });

  // Populate 31_KPI_SLA
  const wsKpi = worksheetsMap['31_KPI_SLA'];
  wsKpi.getRow(4).values = ['KPI UID', 'Contract UID', 'اسم المؤشر', 'الفئة', 'الوحدة', 'المستهدف', 'الفعلي', 'الانحراف', 'نسبة الالتزام بالـ SLA %', 'الحالة'];
  styleHeaderRow(wsKpi.getRow(4));
  MOCK_KPIS.forEach((k, idx) => {
    const row = wsKpi.getRow(5 + idx);
    row.values = [k.kpiUid, k.contractUid, k.metricName, k.category, k.unit, k.targetValue, k.actualValue, k.variance, k.slaCompliancePercent / 100, k.status];
    row.getCell(9).numFmt = '0.0%';
    styleBodyRow(row);
  });

  // Populate 40_قاموس_البيانات
  const wsDict = worksheetsMap['40_قاموس_البيانات'];
  wsDict.getRow(4).values = ['اسم الحقل / المتغير', 'نوع البيانات', 'المسار والربط', 'الوصف والمنطق الحسابي'];
  styleHeaderRow(wsDict.getRow(4));
  DATA_DICTIONARY.forEach((dict, idx) => {
    const row = wsDict.getRow(5 + idx);
    row.values = [dict.field, dict.type, dict.type.includes('PK') ? 'مفتاح رئيسي' : 'مفتاح فرعي', dict.description];
    styleBodyRow(row);
  });

  // Populate 41_سجل_التدقيق
  const wsAudit = worksheetsMap['41_سجل_التدقيق'];
  wsAudit.getRow(4).values = ['معرف السجل', 'التاريخ والوقت', 'فئة الفحص', 'درجة الأهمية', 'تفاصيل التنبيه أو الفحص', 'UID المرتبط', 'الحالة'];
  styleHeaderRow(wsAudit.getRow(4));
  MOCK_AUDIT_LOG.forEach((aud, idx) => {
    const row = wsAudit.getRow(5 + idx);
    row.values = [aud.auditId, aud.timestamp, aud.ruleCategory, aud.severity, aud.message, aud.affectedUid, aud.status];
    styleBodyRow(row);
  });

  // Populate 02_لوحة_التحكم
  const wsDash = worksheetsMap['02_لوحة_التحكم'];
  wsDash.getRow(4).values = ['مؤشرات الأداء الرئسية (KPI Dashboard)', '', '', '', '', '', '', ''];
  wsDash.getRow(5).values = ['إجمالي عدد العقود', { formula: "COUNTA('06_العقود'!A5:A9)" }, 'العقود النشطة', { formula: 'COUNTIF(\'06_العقود\'!E5:E9, "نشط")' }, 'إجمالي قيم العقود', { formula: "SUM('06_العقود'!M5:M9)" }, 'إجمالي الأرباح', { formula: "SUM('06_العقود'!N5:N9)" }];
  styleHeaderRow(wsDash.getRow(4));

  // Auto-adjust column widths for all sheets
  Object.values(worksheetsMap).forEach((ws) => {
    if (ws.columns) {
      ws.columns.forEach((col) => {
        let maxLen = 0;
        if (col && col.eachCell) {
          col.eachCell({ includeEmpty: false }, (cell, rowNumber) => {
            if (rowNumber > 2 && cell.value !== undefined && cell.value !== null) {
              const valStr = String(cell.value);
              if (valStr.length > maxLen) maxLen = valStr.length;
            }
          });
        }
        col.width = Math.max(maxLen + 4, 14);
      });
    }
  });

  // Generate buffer and trigger download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'نظام_إدارة_وتحليل_عقود_الخدمات_الناعمة.xlsx');
}

function styleHeaderRow(row: ExcelJS.Row) {
  row.height = 24;
  row.eachCell((cell) => {
    cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
      bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
      left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
      right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
    };
  });
}

function styleBodyRow(row: ExcelJS.Row) {
  row.height = 20;
  row.eachCell((cell) => {
    cell.font = { name: 'Calibri', size: 10, color: { argb: 'FF1E293B' } };
    cell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
    };
  });
}
