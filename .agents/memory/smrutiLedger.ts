/**
 * @file smrutiLedger.ts
 * @description Siddhānta Smṛti (स्मृति) — Autonomous Self-Healing Learning & Mistake Ledger.
 * Records compiler errors, runtime exceptions, schema mismatches, and their verified resolutions
 * so Aegis Sterling and subagents never repeat the same mistake.
 *
 * Governed by: SMRTI-001 (Doctrine of Continuous Learning Memory)
 */
import * as fs from 'fs';
import * as path from 'path';

export interface SmrutiRecord {
  id: string;
  timestamp: string;
  errorSignature: string; // e.g. "TS2820", "TS2322", "ENOENT", "JSON_SYNTAX"
  errorContext: string;
  category: 'TYPESCRIPT' | 'RUNTIME' | 'SCHEMA' | 'SHELL' | 'REGULATORY';
  rootCause: string;
  resolutionPattern: string;
  verifiedFixProof: string;
  preventionRule: string;
  tags: string[];
}

export interface SmrutiLedgerState {
  version: string;
  lastUpdated: string;
  totalErrorsRecorded: number;
  totalErrorsPrevented: number;
  records: SmrutiRecord[];
}

const LEDGER_PATH = path.resolve(process.cwd(), '.agents/memory/siddhanta-smruti-ledger.json');

export class SmrutiLedger {
  private static instance: SmrutiLedger;
  private state: SmrutiLedgerState;

  private constructor() {
    this.state = this.loadLedger();
  }

  public static getInstance(): SmrutiLedger {
    if (!SmrutiLedger.instance) {
      SmrutiLedger.instance = new SmrutiLedger();
    }
    return SmrutiLedger.instance;
  }

  private loadLedger(): SmrutiLedgerState {
    try {
      if (fs.existsSync(LEDGER_PATH)) {
        const raw = fs.readFileSync(LEDGER_PATH, 'utf-8');
        return JSON.parse(raw);
      }
    } catch {
      // Fallback if corrupt or uninitialized
    }
    return {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      totalErrorsRecorded: 0,
      totalErrorsPrevented: 0,
      records: [],
    };
  }

  private saveLedger(): void {
    const dir = path.dirname(LEDGER_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    this.state.lastUpdated = new Date().toISOString();
    fs.writeFileSync(LEDGER_PATH, JSON.stringify(this.state, null, 2), 'utf-8');
  }

  /**
   * Records a new mistake and its verified resolution pattern.
   */
  public record(record: Omit<SmrutiRecord, 'id' | 'timestamp'>): SmrutiRecord {
    const newEntry: SmrutiRecord = {
      id: `SMRTI-${String(this.state.records.length + 1).padStart(4, '0')}`,
      timestamp: new Date().toISOString(),
      ...record,
    };
    this.state.records.push(newEntry);
    this.state.totalErrorsRecorded = this.state.records.length;
    this.saveLedger();
    return newEntry;
  }

  /**
   * Queries existing records by keyword or error code before executing code.
   */
  public query(term: string): SmrutiRecord[] {
    const q = term.toLowerCase();
    const hits = this.state.records.filter(
      r =>
        r.errorSignature.toLowerCase().includes(q) ||
        r.rootCause.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
    );
    if (hits.length > 0) {
      this.state.totalErrorsPrevented += hits.length;
      this.saveLedger();
    }
    return hits;
  }

  /**
   * Returns all recorded rules formatted for immediate prompt injection.
   */
  public getPreventionGuidelines(): string[] {
    return this.state.records.map(
      r => `[${r.errorSignature}] ${r.preventionRule} (Fix: ${r.resolutionPattern})`
    );
  }

  public getState(): SmrutiLedgerState {
    return this.state;
  }
}

export const smrutiLedger = SmrutiLedger.getInstance();
export default smrutiLedger;
