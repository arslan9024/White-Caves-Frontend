/**
 * AEGIS V5.0 Native Arabic RTL Guard (AEG-004)
 */

export type SupportedLocale = 'en' | 'ar' | 'es' | 'ru';

export function getTextDirection(locale: string): 'rtl' | 'ltr' {
  return locale.toLowerCase().startsWith('ar') ? 'rtl' : 'ltr';
}

export function applyDocumentDirection(locale: string): 'rtl' | 'ltr' {
  const dir = getTextDirection(locale);
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', locale);
  }
  return dir;
}
