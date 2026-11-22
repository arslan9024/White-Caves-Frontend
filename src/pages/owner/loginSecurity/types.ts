export type AttemptStatus = 'all' | 'failed' | 'success' | 'password';

export interface LoginAttempt {
  id: string;
  action:
    | 'login'
    | 'login_failed'
    | 'account_unlocked'
    | 'ip_unlocked'
    | 'password_changed'
    | 'password_change_failed'
    | string;
  description: string;
  createdAt: string;
  userId: string | null;
  user: { id: string; email: string; name: string | null; role: string } | null;
  metadata: Record<string, unknown> | null;
}

export interface AttemptsResponse {
  success: boolean;
  data: LoginAttempt[];
  meta: { count: number; limit: number; sinceMinutes: number; status: string; emailFilter: string | null };
}

export interface SecurityStats {
  totals: {
    logins: number;
    loginFailures: number;
    passwordChanges: number;
    passwordChangeFailures: number;
    accountUnlocks: number;
    ipUnlocks: number;
  };
  uniqueIpCount: number;
  topOffendingIps: Array<{ ip: string; failures: number }>;
  topTargetedEmails: Array<{ email: string; failures: number }>;
  windowMinutes: number;
}

export interface ActiveLockouts {
  windowMinutes: number;
  accountThreshold: number;
  ipThreshold: number;
  accounts: Array<{ userId: string; email: string | null; failures: number; retryAfterSeconds: number }>;
  ips: Array<{ ip: string; failures: number; retryAfterSeconds: number }>;
}
