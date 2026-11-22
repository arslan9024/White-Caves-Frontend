import { MarketIntelligenceContent } from './types';

export const zoneBadge = (z: string): string => {
  const map: Record<string, string> = {
    premium: 'bg-yellow-100 text-yellow-800',
    prime: 'bg-purple-100 text-purple-800',
    mid: 'bg-blue-100 text-blue-800',
    affordable: 'bg-green-100 text-green-800',
  };
  return map[z] ?? 'bg-gray-100 text-gray-800';
};

export const zoneLabel = (zone: string, isArabic: boolean): string => {
  const map: Record<string, { en: string; ar: string }> = {
    premium: { en: 'Premium', ar: 'فاخر' },
    prime: { en: 'Prime', ar: 'رئيسي' },
    mid: { en: 'Mid-Market', ar: 'متوسط السوق' },
    affordable: { en: 'Affordable', ar: 'ميسور' },
  };

  const label = map[zone];
  if (!label) return zone;
  return isArabic ? label.ar : label.en;
};

export const propertyTypeLabel = (propertyType: string, isArabic: boolean): string => {
  const map: Record<string, { en: string; ar: string }> = {
    apartment: { en: 'Apartment', ar: 'شقة' },
    villa: { en: 'Villa', ar: 'فيلا' },
    townhouse: { en: 'Townhouse', ar: 'تاون هاوس' },
    penthouse: { en: 'Penthouse', ar: 'بنتهاوس' },
    office: { en: 'Office', ar: 'مكتب' },
  };

  const label = map[propertyType.toLowerCase()];
  if (!label) return propertyType;
  return isArabic ? label.ar : label.en;
};

export const formatPercent = (value: number, isArabic: boolean, decimals = 1): string =>
  `${new Intl.NumberFormat(isArabic ? 'ar-AE' : 'en-AE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)}%`;

export const getMarketIntelligenceContent = (isArabic: boolean): MarketIntelligenceContent =>
  isArabic
    ? {
        title: 'ذكاء السوق',
        subtitle: 'مؤشر أسعار عقارات دبي وبيانات المعاملات ومؤشر الإيجارات من ريرا',
        tabs: {
          priceIndex: 'مؤشر الأسعار',
          indicators: 'المؤشرات',
          reraIndex: 'مؤشر ريرا',
          heatmap: 'الخريطة الحرارية',
          competitorPricing: 'أسعار المنافسين',
        },
        errors: {
          priceIndex: 'تعذر تحميل مؤشر الأسعار.',
          indicators: 'تعذر تحميل المؤشرات.',
          rera: 'تعذر تحميل مؤشر ريرا.',
          networkPrice: 'خطأ في الشبكة أثناء تحميل مؤشر الأسعار.',
          networkIndicators: 'خطأ في الشبكة أثناء تحميل المؤشرات.',
          networkRera: 'خطأ في الشبكة أثناء تحميل مؤشر ريرا.',
          competitorPricing: 'تعذر تحميل أسعار المنافسين.',
          networkCompetitorPricing: 'خطأ في الشبكة أثناء تحميل أسعار المنافسين.',
        },
        filters: {
          allZones: 'كل المناطق',
          premium: 'فاخر',
          prime: 'رئيسي',
          mid: 'متوسط السوق',
          affordable: 'ميسور',
          sortYield: 'ترتيب: العائد الإجمالي',
          sortPrice: 'ترتيب: السعر/قدم²',
          areas: 'مناطق',
          allPortals: 'كل المنصات',
          portal: 'المنصة',
          areaPlaceholder: 'بحث حسب المنطقة',
        },
        table: {
          area: 'المنطقة',
          zone: 'الفئة',
          priceSqft: 'السعر/قدم² (درهم)',
          annualRent: 'متوسط الإيجار السنوي',
          grossYield: 'العائد الإجمالي',
          transactions: 'المعاملات',
          type: 'النوع',
          beds: 'غرف النوم',
          avgRent: 'متوسط الإيجار (درهم/سنوياً)',
          maxIncrease: 'الحد الأقصى للزيادة المسموحة',
          competitorPortal: 'منصة المنافس',
          deltaVsWhiteCaves: 'الفارق مقابل وايت كايفز',
          updatedAt: 'آخر تحديث',
        },
        loading: 'جارٍ التحميل…',
        indicators: {
          avgDaysOnMarket: 'متوسط أيام البقاء في السوق',
          days: 'يوماً',
          absorptionRate: 'معدل الامتصاص',
          absorptionNote: 'الوحدات المباعة / القوائم النشطة (%)',
          newListings: 'القوائم الجديدة',
          activeListings: 'القوائم النشطة',
          source: 'المصدر:',
          areasIncluded: 'مناطق مشمولة',
        },
        rera: {
          notice:
            '⚠️ استناداً إلى مؤشر الإيجارات من ريرا لعام 2024. يجب التحقق دائماً من بوابة ريرا الرسمية قبل إصدار النموذج 7 (إشعار زيادة الإيجار).',
          bands: ['<10%', '10-20%', '20-30%', '30-40%', '>40%'],
        },
      }
    : {
        title: 'Market Intelligence',
        subtitle: 'Dubai property price index, transaction data, and RERA rental index',
        tabs: {
          priceIndex: 'Price Index',
          indicators: 'Indicators',
          reraIndex: 'RERA Index',
          heatmap: 'Heatmap',
          competitorPricing: 'Competitor Pricing',
        },
        errors: {
          priceIndex: 'Failed to load price index.',
          indicators: 'Failed to load indicators.',
          rera: 'Failed to load RERA index.',
          networkPrice: 'Network error loading price index.',
          networkIndicators: 'Network error loading indicators.',
          networkRera: 'Network error loading RERA index.',
          competitorPricing: 'Failed to load competitor pricing.',
          networkCompetitorPricing: 'Network error loading competitor pricing.',
        },
        filters: {
          allZones: 'All Zones',
          premium: 'Premium',
          prime: 'Prime',
          mid: 'Mid-Market',
          affordable: 'Affordable',
          sortYield: 'Sort: Gross Yield',
          sortPrice: 'Sort: Price/sqft',
          areas: 'areas',
          allPortals: 'All Portals',
          portal: 'Portal',
          areaPlaceholder: 'Filter by area',
        },
        table: {
          area: 'Area',
          zone: 'Zone',
          priceSqft: 'Price/sqft (AED)',
          annualRent: 'Avg Annual Rent',
          grossYield: 'Gross Yield',
          transactions: 'Transactions',
          type: 'Type',
          beds: 'Beds',
          avgRent: 'Avg Rent (AED/yr)',
          maxIncrease: 'Max Allowed Increase',
          competitorPortal: 'Competitor Portal',
          deltaVsWhiteCaves: 'Delta vs White Caves',
          updatedAt: 'Updated',
        },
        loading: 'Loading…',
        indicators: {
          avgDaysOnMarket: 'Avg Days on Market',
          days: 'days',
          absorptionRate: 'Absorption Rate',
          absorptionNote: 'units sold / active listings (%)',
          newListings: 'New Listings',
          activeListings: 'Active Listings',
          source: 'Source:',
          areasIncluded: 'areas included',
        },
        rera: {
          notice:
            '⚠️ Based on RERA Rental Index 2024. Always verify with the official RERA portal before issuing Form 7 (Rent Increase Notice).',
          bands: ['<10%', '10-20%', '20-30%', '30-40%', '>40%'],
        },
      };
