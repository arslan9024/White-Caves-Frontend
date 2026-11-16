// FILE: src/components/crm/LindaWhatsAppCRM/useLindaAccountAutoload.ts
/**
 * White Caves Real Estate LLC - Linda Multi-Account Autoload Engine Hook
 * Standard: AEGIS Canonical 12-Way Architecture Standard (<250 lines)
 */

import { useState, useEffect, useCallback, useTransition } from 'react';
import { apiClient } from '../../../utils/apiClient';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';

export type AccountStatus = 'connected' | 'needs_auth' | 'offline';

export interface AccountOption {
  id: string;
  label: string;
  phone?: string;
  status: AccountStatus;
}

export const BASE_ACCOUNT_FILTERS: Omit<AccountOption, 'status'>[] = [
  { id: 'ALL', label: 'All Linked Lines' },
  { id: '+971505760056', label: 'Primary Master +971505760056', phone: '+971505760056' },
  { id: 'goraha', label: 'Goraha Secondary Line', phone: '+971553633545' },
  { id: 'outreach', label: 'Outreach Campaign Line', phone: 'outreach' },
];

export function useLindaAccountAutoload(
  conversations: LindaConversationItem[],
  selectedConvId: string,
  setSelectedConvId: (id: string) => void
) {
  const [selectedAccount, setSelectedAccountState] = useState<string>('ALL');
  const [isLoadingAccount, setIsLoadingAccount] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  const [accountConversations, setAccountConversations] = useState<
    Record<string, LindaConversationItem[]>
  >({});
  const [accountStatuses, setAccountStatuses] = useState<Record<string, AccountStatus>>({
    ALL: 'connected',
    '+971505760056': 'connected',
    goraha: 'connected',
    outreach: 'needs_auth',
  });

  const setSelectedAccount = useCallback((newAcc: string) => {
    startTransition(() => {
      setSelectedAccountState(newAcc);
    });
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

  const accountOptions: AccountOption[] = [
    ...BASE_ACCOUNT_FILTERS.map(f => ({
      ...f,
      status: accountStatuses[f.id] || (f.id === '+971505760056' ? 'connected' : 'offline'),
    })),
  ];

  return {
    selectedAccount,
    setSelectedAccount,
    accountOptions,
    accountStatuses,
    accountConversations,
    refreshStatuses,
    isLoadingAccount,
  };
}
