import { TranslationJob, LanguageInfo } from './MiraCRM.types';

export const TRANSLATIONS: TranslationJob[] = [
  {
    id: 1,
    doc: 'Sale & Purchase Agreement — Palm Villa G12',
    from: 'English',
    to: 'Arabic',
    status: 'completed',
    pages: 12,
    requestedBy: 'Sophia',
    time: '30m ago',
  },
  {
    id: 2,
    doc: 'Property Listing — Marina Gate 2BR',
    from: 'English',
    to: 'Russian',
    status: 'in_progress',
    pages: 2,
    requestedBy: 'Olivia',
    time: '1h ago',
  },
  {
    id: 3,
    doc: 'Tenancy Contract — JVC Studio',
    from: 'English',
    to: 'Chinese',
    status: 'completed',
    pages: 8,
    requestedBy: 'Daisy',
    time: '2h ago',
  },
  {
    id: 4,
    doc: 'KYC Form — Client Fatima Al Suwaidi',
    from: 'Arabic',
    to: 'English',
    status: 'pending',
    pages: 3,
    requestedBy: 'Laila',
    time: '3h ago',
  },
  {
    id: 5,
    doc: 'Investment Brochure — Emirates Hills',
    from: 'English',
    to: 'French',
    status: 'completed',
    pages: 6,
    requestedBy: 'Maven',
    time: '4h ago',
  },
];

export const LANGUAGES: LanguageInfo[] = [
  { code: 'AR', name: 'Arabic', flag: '🇦🇪', docs: 18, rtl: true },
  { code: 'ZH', name: 'Chinese', flag: '🇨🇳', docs: 9 },
  { code: 'RU', name: 'Russian', flag: '🇷🇺', docs: 7 },
  { code: 'FR', name: 'French', flag: '🇫🇷', docs: 5 },
  { code: 'HI', name: 'Hindi', flag: '🇮🇳', docs: 4 },
  { code: 'UR', name: 'Urdu', flag: '🇵🇰', docs: 3 },
];

export const STATUS_COLORS: Record<string, string> = {
  completed: '#22C55E',
  in_progress: '#3B82F6',
  pending: '#F59E0B',
};

export const DEMO_TRANSLATIONS: Record<string, string> = {
  Arabic: 'مرحباً بكم في شركة وايت كيفز للعقارات. نحن متخصصون في العقارات الفاخرة في دبي.',
  Chinese: '欢迎来到白洞房地产。我们专注于迪拜豪华房产。',
  Russian:
    'Добро пожаловать в White Caves Real Estate. Мы специализируемся на элитной недвижимости Дубая.',
  French:
    "Bienvenue chez White Caves Real Estate. Nous sommes spécialisés dans l'immobilier de luxe à Dubaï.",
  Hindi:
    'व्हाइट केव्स रियल एस्टेट में आपका स्वागत है। हम दुबई की लग्जरी संपत्तियों में विशेषज्ञ हैं।',
  Urdu: 'وائٹ کیوز ریل اسٹیٹ میں خوش آمدید۔ ہم دبئی میں لگژری پراپرٹیز میں مہارت رکھتے ہیں۔',
};

export const MIRA_TABS = [
  { id: 'queue', label: '📄 Translation Queue' },
  { id: 'live', label: '⚡ Live Translate' },
  { id: 'languages', label: '🌍 Languages' },
  { id: 'docs', label: '📚 Docs' },
  { id: 'lifecycle', label: '🔄 Lifecycle' },
];

