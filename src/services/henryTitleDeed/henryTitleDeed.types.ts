import type { ScanReview } from '../henryScanReview';

export const DEED_LABELS: Record<string, string[]> = {
  certificateNumber: [
    'Certificate Number',
    'Certificate No.',
    'Certificate No',
    'Title Deed Number',
    'Title Deed No.',
    'Title Deed No',
    'رقم الشهادة',
    'رقم سند الملكية',
  ],
  issueDate: ['Issue Date', 'Date of Issue', 'تاريخ الإصدار', 'تاريخ الاصدار'],
  issuingAuthority: ['Issuing Authority', 'جهة الإصدار'],
  propertyType: ['Property Type', 'نوع العقار'],
  community: ['Community', 'Area Name', 'المنطقة', 'اسم المنطقة'],
  plotNumber: ['Plot Number', 'Plot No.', 'Land Number', 'رقم الأرض', 'رقم الارض'],
  municipalityNumber: ['Municipality Number', 'Municipality No.', 'رقم البلدية'],
  buildingNumber: ['Building Number', 'Building No.', 'رقم المبنى'],
  buildingName: ['Building Name', 'اسم المبنى'],
  propertyNumber: ['Property Number', 'Unit Number', 'Unit No.', 'رقم العقار', 'رقم الوحدة'],
  floorNumber: ['Floor Number', 'Floor', 'رقم الطابق', 'الطابق'],
  parkingNumber: ['Parking Number', 'Parking No.', 'رقم الموقف'],
  mortgageStatus: ['Mortgage Status', 'حالة الرهن'],
  suiteAreaSqM: ['Suite Area', 'مساحة الوحدة'],
  balconyAreaSqM: ['Balcony Area', 'مساحة الشرفة'],
  totalAreaSqM: ['Total Area', 'Area SqM', 'المساحة الإجمالية', 'المساحة الاجمالية', 'المساحة'],
  totalAreaSqFt: ['Total Area SqFt', 'Area SqFt', 'المساحة بالقدم المربع'],
  commonAreaSqM: ['Common Area', 'المساحة المشتركة'],
  ownerDldNumber: [
    'Owner DLD Number',
    'Owner Number',
    'Owner No.',
    'Party Number',
    'رقم المالك',
    'رقم الطرف',
  ],
  ownerName: ['Owner Name', 'Owner', 'اسم المالك'],
  ownerSharePercent: ['Ownership Share', 'Owner Share', 'Share Percent', 'نسبة الملكية', 'الحصة'],
  ownedAreaSqM: ['Owned Area', 'المساحة المملوكة'],
  purchasedFrom: ['Purchased From', 'Seller Name', 'اسم البائع', 'تم الشراء من'],
  registrationContractNumber: [
    'Registration Contract Number',
    'Transaction Number',
    'Contract Number',
    'رقم العقد',
    'رقم المعاملة',
  ],
  registrationDate: ['Registration Date', 'Transaction Date', 'تاريخ التسجيل', 'تاريخ المعاملة'],
  purchasePriceAed: [
    'Purchase Price',
    'Purchase Value',
    'Transaction Value',
    'قيمة الشراء',
    'قيمة المعاملة',
  ],
  purchasePriceWordsEn: ['Purchase Price in Words', 'Amount in Words', 'القيمة كتابة'],
};

export interface DeedOwner {
  dldNumber: string;
  nameEn: string;
  nameAr: string;
  sharePercent?: number;
  ownedAreaSqM?: number;
}

export interface DldTitleDeedExtractedData extends ScanReview {
  owners?: DeedOwner[];
  mortgageState?: 'mortgaged' | 'not_mortgaged' | 'unknown';
  // Document Meta
  certificateNumber: string; // e.g. "140764/2023"
  issueDate: string; // e.g. "18/07/2023"
  issuingAuthorityEn: string; // "Government of Dubai - Land Department"
  issuingAuthorityAr: string; // "حكومة دبي - دائرة الأراضي والأملاك"
  isBlockchainVerified: boolean;
  documentFormat?: string;

  // Property Details
  propertyTypeEn: string; // "Hotel Apartment"
  propertyTypeAr: string; // "شقة فندقية"
  communityEn: string; // "Madinat Hind 4" (DAMAC Hills 2)
  communityAr: string; // "مدينة هند 4"
  plotNumber: string; // "5120"
  municipalityNumber: string; // "914 - 18558"
  buildingNumber: string; // "1"
  buildingNameEn: string; // "VIRIDIS A"
  buildingNameAr: string; // "فريديس ايه A"
  propertyNumber: string; // "504" (Unit)
  floorNumber: string; // "5"
  parkingNumber: string; // "P2-56"
  mortgageStatusEn: string; // "Not mortgaged"
  mortgageStatusAr: string; // "غير مرهونة"
  isMortgaged: boolean;

  // Area Measurements
  suiteAreaSqM: number; // 32.48
  balconyAreaSqM: number; // 6.28
  totalAreaSqM: number; // 38.76
  totalAreaSqFt: number; // 417.21
  commonAreaSqM: number; // 12.65

  // Ownership Details
  ownerDldNumber: string; // "6108481"
  ownerNameEn: string; // "AKRAM DIB NEHME"
  ownerNameAr: string; // "أكرم ديب نعمة"
  ownerSharePercent: number; // 100
  ownedAreaSqM: number; // 38.76

  // Conveyancing & Transaction History
  purchasedFromEn: string; // "FRONT LINE INVESTMENT MANAGEMENT L.L.C"
  purchasedFromAr: string; // "شركة الخط الأمامي لإدارة الاستثمار ش.ذ.م.م"
  registrationContractNumber: string; // "131762/2023"
  registrationDate: string; // "18/07/2023"
  purchasePriceAed: number; // 353000
  purchasePriceWordsEn: string; // "Three Hundred Fifty Three Thousand UAE Dirhams only"

  // Extraction Telemetry
  confidenceScore: number; // 0.999
  scannedAt: string; // ISO timestamp
}


