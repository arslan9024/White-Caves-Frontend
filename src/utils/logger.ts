/**
 * Frontend Logger Utility — White Caves CRM
 * Filters logs by environment: only debug/info in dev, warn/error always.
 * Features:
 *  - Scoped contexts & child loggers (`log.child('Sub')`)
 *  - Performance timer (`const end = log.time('fetch'); ... end();`)
 *  - Grouped logs (`log.group('Batch', () => { ... })`)
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const isDev = import.meta.env.DEV;

export interface FrontendLogger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  child(subContext: string): FrontendLogger;
  time(label: string): () => number;
  group(label: string, fn: () => void): void;
}

function createLogger(context: string): FrontendLogger {
  const prefix = `[${context}]`;

  return {
    debug(message: string, ...args: unknown[]) {
      if (isDev) console.debug(prefix, message, ...args);
    },
    info(message: string, ...args: unknown[]) {
      if (isDev) console.log(prefix, message, ...args);
    },
    warn(message: string, ...args: unknown[]) {
      console.warn(prefix, message, ...args);
    },
    error(message: string, ...args: unknown[]) {
      console.error(prefix, message, ...args);
    },
    child(subContext: string) {
      return createLogger(`${context}:${subContext}`);
    },
    time(label: string) {
      const start = performance.now();
      return () => {
        const ms = Math.round((performance.now() - start) * 100) / 100;
        if (isDev) console.debug(prefix, `${label} (${ms}ms)`);
        return ms;
      };
    },
    group(label: string, fn: () => void) {
      if (!isDev) {
        fn();
        return;
      }
      console.groupCollapsed(`${prefix} ${label}`);
      try {
        fn();
      } finally {
        console.groupEnd();
      }
    },
  };
}

/** Default app logger */
const logger = createLogger('App');

export { createLogger };
export type { LogLevel };
export default logger;
