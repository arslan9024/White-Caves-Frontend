import {
  readDocumentFields,
  normalizeDocumentDate,
  parseDocumentNumber,
  flagDocumentConflicts,
} from '../henryDocumentParsing';
import type { ScannedTenancyContractResult, ScannedTenancyParty } from './types';

export const TENANCY_CONTRACT_FIELD_LABELS: Record<string, string[]> = {
  contractReference: ['Contract Number', 'Contract Reference', 'رقم العقد'],
  contractDate: ['Contract Date', 'تاريخ العقد'],
  'landlord.name': ['Landlord Name', 'Lessor Name', 'Owner Name', 'اسم المؤجر', 'اسم المالك'],
  'tenant.name': ['Tenant Name', 'اسم المستأجر'],
  'landlord.emiratesId': ['Landlord Emirates ID', 'Lessor Emirates ID', 'هوية المؤجر'],
  'tenant.emiratesId': ['Tenant Emirates ID', 'هوية المستأجر'],
  'landlord.phone': ['Landlord Phone', 'هاتف المؤجر'],
  'tenant.phone': ['Tenant Phone', 'هاتف المستأجر'],
  'landlord.email': ['Landlord Email'],
  'tenant.email': ['Tenant Email'],
  'landlord.licenseNo': ['Landlord License Number', 'Lessor License Number'],
  'tenant.licenseNo': ['Tenant License Number'],
  'landlord.licensingAuthority': ['Lessor Licensing Authority'],
  'tenant.licensingAuthority': ['Tenant Licensing Authority'],
  'property.buildingName': ['Building Name', 'اسم المبنى'],
  'property.propertyNumber': [
    'Property Number',
    'Property No',
    'Unit Number',
    'Unit No',
    'رقم العقار',
    'رقم الوحدة',
  ],
  'property.plotNumber': ['Plot Number', 'Plot No', 'رقم الأرض'],
  'property.location': ['Location', 'الموقع'],
  'property.propertyType': ['Property Type', 'نوع العقار'],
  'property.areaSqM': ['Area SqM', 'Area (sqm)', 'المساحة'],
  'property.areaSqFt': ['Area SqFt', 'Area (sqft)'],
  'property.usage': ['Property Usage', 'استخدام العقار'],
  'property.premisesNoDewa': ['DEWA Premises Number'],
  'property.makaniNo': ['Makani Number', 'رقم مكاني'],
  'financials.periodFrom': [
    'Period From',
    'Start Date',
    'Contract Period From',
    'تاريخ البداية',
    'تاريخ بدء العقد',
  ],
  'financials.periodTo': [
    'Period To',
    'End Date',
    'Contract Period To',
    'تاريخ النهاية',
    'تاريخ انتهاء العقد',
  ],
  'financials.annualRentAed': ['Annual Rent', 'Annual Rent AED', 'الإيجار السنوي'],
  'financials.contractValueAed': ['Contract Value', 'قيمة العقد'],
  'financials.securityDepositAed': ['Security Deposit', 'مبلغ التأمين'],
  'financials.modeOfPayment': ['Mode of Payment', 'Payment Method', 'طريقة الدفع'],
  cheques: ['Number of Cheques', 'عدد الشيكات'],
  additionalTerms: ['Additional Terms', 'الشروط الإضافية'],
};

const REQUIRED_CONTRACT_FIELDS = [
  'landlord.name',
  'tenant.name',
  'property.buildingName',
  'property.propertyNumber',
  'financials.periodFrom',
  'financials.periodTo',
  'financials.annualRentAed',
];

export function parseTenancyContractText(text: string): ScannedTenancyContractResult {
  const { values, diagnostics } = readDocumentFields(text, TENANCY_CONTRACT_FIELD_LABELS, [
    'additionalTerms',
  ]);
  const v = (key: string) => values[key]?.[0] || '';
  flagDocumentConflicts(diagnostics);
  const number = (key: string) =>
    /[-−]\s*\d/.test(v(key)) ? undefined : parseDocumentNumber(v(key));
  const n = (key: string) => number(key) ?? 0;
  const party = (key: string): ScannedTenancyParty => ({
    name: v(`${key}.name`),
    emiratesId: v(`${key}.emiratesId`),
    phone: v(`${key}.phone`),
    email: v(`${key}.email`),
    licenseNo: v(`${key}.licenseNo`),
    licensingAuthority: v(`${key}.licensingAuthority`),
  });
  const usage = v('property.usage').toLowerCase();
  const missingFields = REQUIRED_CONTRACT_FIELDS.filter(key => !v(key));
  const countInMode = v('financials.modeOfPayment').match(/(\d+)\s*(?:cheques?|checks?|شيك)/i)?.[1];
  if (countInMode && v('cheques') && Number(countInMode) !== Number(v('cheques'))) {
    diagnostics.fields['financials.modeOfPayment'] = {
      state: 'conflict',
      source: 'text',
      values: [v('financials.modeOfPayment'), `${v('cheques')} CHEQUES`],
    };
  }
  return {
    contractReference: v('contractReference'),
    contractDate: normalizeDocumentDate(v('contractDate')),
    landlord: party('landlord'),
    tenant: party('tenant'),
    property: {
      usage: ['residential', 'سكني'].includes(usage)
        ? 'residential'
        : ['commercial', 'تجاري'].includes(usage)
          ? 'commercial'
          : ['industrial', 'صناعي'].includes(usage)
            ? 'industrial'
            : '',
      buildingName: v('property.buildingName'),
      propertyNumber: v('property.propertyNumber'),
      plotNumber: v('property.plotNumber'),
      propertyType: v('property.propertyType'),
      location: v('property.location'),
      areaSqM: number('property.areaSqM'),
      areaSqFt: number('property.areaSqFt'),
      makaniNo: v('property.makaniNo'),
      premisesNoDewa: v('property.premisesNoDewa'),
    },
    financials: {
      periodFrom: normalizeDocumentDate(v('financials.periodFrom')),
      periodTo: normalizeDocumentDate(v('financials.periodTo')),
      annualRentAed: n('financials.annualRentAed'),
      contractValueAed: number('financials.contractValueAed'),
      securityDepositAed: number('financials.securityDepositAed'),
      modeOfPayment:
        v('financials.modeOfPayment') || (v('cheques') ? `${v('cheques')} CHEQUES` : ''),
    },
    additionalTerms: values.additionalTerms || [],
    signatures: { hasTenantSigned: false, hasLessorSigned: false },
    isFilled: !missingFields.length,
    fillScorePercent: Math.round(diagnostics.coverage * 100),
    totalFieldsCount: Object.keys(values).length,
    filledFieldsCount: Object.values(values).filter(items => items.length).length,
    missingFields,
    classification: Object.values(values).some(items => items.length)
      ? 'partially_filled'
      : 'blank_template',
    confidenceScore: 0,
    scannedAt: new Date().toISOString(),
    demoOnly: false,
    reviewConfirmed: false,
    diagnostics,
  };
}
