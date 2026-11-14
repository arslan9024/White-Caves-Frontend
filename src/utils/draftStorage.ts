/**
 * Auto-saving form drafts helper (Point 44).
 */
export function saveFormDraft<T>(key: string, data: T): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`wc_draft_${key}`, JSON.stringify({ data, savedAt: Date.now() }));
    }
  } catch {
    // Ignore storage quota errors
  }
}

export function loadFormDraft<T>(key: string): T | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(`wc_draft_${key}`);
    if (!raw) return null;
    return (JSON.parse(raw) as { data: T }).data ?? null;
  } catch {
    return null;
  }
}
