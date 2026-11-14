/**
 * Native RTL/LTR bidirectional direction resolver (Point 38 / AEG-008).
 */
export function getDocumentDirection(language: string): 'rtl' | 'ltr' {
  return language.toLowerCase().startsWith('ar') ? 'rtl' : 'ltr';
}
