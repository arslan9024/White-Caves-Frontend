import type { JourneySession } from '../../types/journey';

const STORAGE_KEY = 'white_caves_active_journey_sessions_v1';
const HISTORY_KEY = 'white_caves_journey_lifecycle_history_v1';

export class JourneyStorageService {
  // -------------------------------------------------------------

  public static saveSession(session: JourneySession): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      const sessions = this.getStoredSessions();
      sessions[session.sessionId] = session;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch {
      // Safe fallback if local storage is unavailable
    }
  }

  public static getStoredSessions(): Record<string, JourneySession> {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return {};
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  public static getActiveSessionForJourney(journeyId: string): JourneySession | null {
    const sessions = this.getStoredSessions();
    const matches = Object.values(sessions).filter(
      s => s.journeyId === journeyId && s.state !== 'COMPLETED' && s.state !== 'CANCELLED'
    );
    if (matches.length === 0) return null;
    // Sort by latest updated
    matches.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return matches[0];
  }

  public static deleteSession(sessionId: string): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      const sessions = this.getStoredSessions();
      delete sessions[sessionId];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch {
      // Safe fallback
    }
  }

  public static appendToLifecycleHistory(session: JourneySession): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      const raw = window.localStorage.getItem(HISTORY_KEY);
      const history: JourneySession[] = raw ? JSON.parse(raw) : [];
      history.unshift(session);
      // Keep last 100 lifecycle records
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 100)));
    } catch {
      // Safe fallback
    }
  }

  public static getLifecycleHistory(entityId?: string): JourneySession[] {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return [];
      const raw = window.localStorage.getItem(HISTORY_KEY);
      const history: JourneySession[] = raw ? JSON.parse(raw) : [];
      if (!entityId) return history;
      return history.filter(
        s =>
          s.entityContext?.propertyId === entityId ||
          s.entityContext?.landlordId === entityId ||
          s.entityContext?.tenantId === entityId ||
          s.entityContext?.dealId === entityId
      );
    } catch {
      return [];
    }
  }
}
