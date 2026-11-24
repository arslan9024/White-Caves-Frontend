// FILE: src/components/crm/LindaWhatsAppCRM/useLindaAccountAutoload.ts
/**
 * White Caves Real Estate LLC - Linda Multi-Account Autoload Engine Hook
 * Standard: AEGIS Canonical 12-Way Architecture Standard (<250 lines)
 */

import { useState, useEffect, useCallback, useTransition } from 'react';
import { apiClient } from '../../../utils/apiClient';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';

export type AccountStatus = 'connected' | 'needs_auth' | 'offline';
export type AccountRole = 'master' | 'employee' | 'servant' | 'all';

export interface AccountOption {
  id: string;
  label: string;
  phone?: string;
  role?: AccountRole;
  status: AccountStatus;
}

export const BASE_ACCOUNT_FILTERS: Omit<AccountOption, 'status'>[] = [
  { id: 'ALL', label: 'All Linked Lines (10-SIM Fleet)', role: 'all' },
  {
    id: '+971505760056',
    label: 'Primary Master Closer: Arslan Malik (+971505760056)',
    phone: '+971505760056',
    role: 'master',
  },
  {
    id: '+971503869886',
    label: 'Hunter SIM 02 — DH2 Discovery (+971503869886)',
    phone: '+971503869886',
    role: 'servant',
  },
  {
    id: '+971505110636',
    label: 'Hunter SIM 03 — DH2 Discovery (+971505110636)',
    phone: '+971505110636',
    role: 'servant',
  },
  {
    id: '+971589969886',
    label: 'Hunter SIM 04 — DH2 Discovery (+971589969886)',
    phone: '+971589969886',
    role: 'servant',
  },
  {
    id: '+971553633595',
    label: 'Hunter SIM 05 — DH2 Discovery (+971553633595)',
    phone: '+971553633595',
    role: 'servant',
  },
  {
    id: '+971559156636',
    label: 'Hunter SIM 06 — DH2 Discovery (+971559156636)',
    phone: '+971559156636',
    role: 'servant',
  },
  {
    id: '+971505845825',
    label: 'Hunter SIM 07 — DH2 Discovery (+971505845825)',
    phone: '+971505845825',
    role: 'servant',
  },
  {
    id: '+971507160096',
    label: 'Hunter SIM 08 — DH2 Discovery (+971507160096)',
    phone: '+971507160096',
    role: 'servant',
  },
  {
    id: '+971553498722',
    label: 'Hunter SIM 09 — DH2 Discovery (+971553498722)',
    phone: '+971553498722',
    role: 'servant',
  },
  {
    id: '+971567160096',
    label: 'Hunter SIM 10 — DH2 Discovery (+971567160096)',
    phone: '+971567160096',
    role: 'servant',
  },
  { id: 'goraha', label: 'GorahaBot Legacy Desk (Synced)', role: 'employee' },
];

export function useLindaAccountAutoload(
  conversations: LindaConversationItem[],
  selectedConvId: string,
  setSelectedConvId: (id: string) => void
) {
  const [selectedAccount, setSelectedAccountState] = useState<string>('ALL');
  const [isLoadingAccount, setIsLoadingAccount] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  const [customAccounts, setCustomAccounts] = useState<Omit<AccountOption, 'status'>[]>(() => {
    try {
      const saved = localStorage.getItem('wc_linda_custom_accounts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [accountConversations, setAccountConversations] = useState<
    Record<string, LindaConversationItem[]>
  >({});
  const [accountStatuses, setAccountStatuses] = useState<Record<string, AccountStatus>>({
    ALL: 'connected',
    '+971505760056': 'connected',
    '+971503869886': 'connected',
    '+971505110636': 'connected',
    '+971589969886': 'connected',
    '+971553633595': 'connected',
  });

  const setSelectedAccount = useCallback((newAcc: string) => {
    startTransition(() => {
      setSelectedAccountState(newAcc);
    });
  }, []);

  const addAccount = useCallback((account: Omit<AccountOption, 'status'>) => {
    setCustomAccounts(prev => {
      const exists = prev.some(
        a => a.id === account.id || (account.phone && a.phone === account.phone)
      );
      if (exists) return prev;
      const updated = [...prev, account];
      try {
        localStorage.setItem('wc_linda_custom_accounts', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setAccountStatuses(prev => ({ ...prev, [account.id]: 'connected' }));
  }, []);

  // Poll / synchronize status badges
  const refreshStatuses = useCallback(async () => {
    try {
      const res = (await apiClient.get('/linda/status')) as {
        success?: boolean;
        data?: {
          isConnected?: boolean;
          status?: string;
          sessions?: Array<{
            phone?: string;
            botId?: string;
            isConnected?: boolean;
            status?: string;
          }>;
        };
      };
      if (res?.data) {
        setAccountStatuses(prev => {
          const next = { ...prev };
          if (res.data?.isConnected) {
            next['+971505760056'] = 'connected';
            next['ALL'] = 'connected';
          }
          if (Array.isArray(res.data?.sessions)) {
            for (const s of res.data.sessions) {
              const id = s.phone || s.botId;
              if (id) {
                next[id] = s.isConnected
                  ? 'connected'
                  : s.status === 'reconnecting'
                    ? 'needs_auth'
                    : 'offline';
              }
            }
          }
          return next;
        });
      }
    } catch {
      // Offline fallback: Maintain resilient active states
    }
  }, []);

  useEffect(() => {
    void refreshStatuses();
    const interval = setInterval(refreshStatuses, 30000);
    return () => clearInterval(interval);
  }, [refreshStatuses]);

  // Query /api/linda/conversations?accountPhone=<phone> on account switch
  useEffect(() => {
    if (selectedAccount === 'ALL') {
      setIsLoadingAccount(false);
      return;
    }

    let cancelled = false;
    setIsLoadingAccount(true);
    const cleanPhone = selectedAccount.replace(/\D/g, '') || selectedAccount;

    // Filter local fallback immediately so user sees zero delay
    const localMatches = conversations.filter(c => {
      const cAcc = (c as LindaConversationItem & { accountPhone?: string }).accountPhone;
      return cAcc === selectedAccount || (selectedAccount.includes('505760056') && !cAcc);
    });

    if (localMatches.length > 0) {
      setAccountConversations(prev => {
        if (!prev[selectedAccount]) {
          return { ...prev, [selectedAccount]: localMatches };
        }
        return prev;
      });
      if (!localMatches.some(m => m.id === selectedConvId)) {
        setSelectedConvId(localMatches[0].id);
      }
    }

    apiClient
      .get(`/linda/conversations?accountPhone=${encodeURIComponent(cleanPhone)}`)
      .then((res: unknown) => {
        if (cancelled) return;
        const resData = res as {
          success?: boolean;
          data?: { conversations?: LindaConversationItem[] };
        };
        const items = resData?.data?.conversations;
        if (Array.isArray(items) && items.length > 0) {
          setAccountConversations(prev => ({ ...prev, [selectedAccount]: items }));
          // Auto-select first conversation
          if (items[0]?.id) {
            setSelectedConvId(items[0].id);
          }
        }
      })
      .catch(() => {
        // Fallback already assigned smoothly above
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoadingAccount(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedAccount, conversations, setSelectedConvId, selectedConvId]);

  const allFilters = [...BASE_ACCOUNT_FILTERS, ...customAccounts];

  const accountOptions: AccountOption[] = allFilters.map(f => ({
    ...f,
    status: accountStatuses[f.id] || (f.id === '+971505760056' ? 'connected' : 'connected'),
  }));

  return {
    selectedAccount,
    setSelectedAccount,
    accountOptions,
    accountStatuses,
    accountConversations,
    refreshStatuses,
    isLoadingAccount,
    addAccount,
  };
}
