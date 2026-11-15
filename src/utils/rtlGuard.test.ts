import { describe, it, expect } from 'vitest';
import { getTextDirection, applyDocumentDirection } from './rtlGuard';

describe('rtlGuard (AEG-004)', () => {
  it('returns rtl for Arabic locales and ltr otherwise', () => {
    expect(getTextDirection('ar')).toBe('rtl');
    expect(getTextDirection('ar-AE')).toBe('rtl');
    expect(getTextDirection('en')).toBe('ltr');
    expect(getTextDirection('es')).toBe('ltr');
    expect(getTextDirection('ru')).toBe('ltr');
  });

  it('applies dir and lang attributes to documentElement', () => {
    const dir = applyDocumentDirection('ar');
    expect(dir).toBe('rtl');
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
    expect(document.documentElement.getAttribute('lang')).toBe('ar');
  });
});
