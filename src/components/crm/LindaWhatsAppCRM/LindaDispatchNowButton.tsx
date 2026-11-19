// FILE: src/components/crm/LindaWhatsAppCRM/LindaDispatchNowButton.tsx
/**
 * Linda "Dispatch Campaign Now" Button
 * POSTs to /api/linda/campaign/dispatch-now with cluster + account selection.
 * Shows live dispatch feedback toast.
 * Upgrade #3 — white-caves-frontend
 */
import React, { memo, useState } from 'react';
import { apiClient } from '../../../utils/apiClient';

interface LindaDispatchNowButtonProps {
  campaignId?: string;
  cluster?: string;
  accountPhone?: string;
  label?: string;
  onSuccess?: (data: unknown) => void;
}

export const LindaDispatchNowButton = memo<LindaDispatchNowButtonProps>(
  ({ campaignId, cluster = 'ALL', accountPhone, label = '⚡ Dispatch Now', onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleDispatch = async () => {
      if (loading) return;
      setLoading(true);
      setResult(null);
      try {
        const res = await (apiClient as any)
          .post('/linda/campaign/dispatch-now', {
            cluster,
            campaignId,
            accountPhone,
          })
          .catch(() =>
            fetch('/api/linda/campaign/dispatch-now', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ cluster, campaignId, accountPhone }),
            }).then(r => r.json())
          );
        const data = res?.data ?? res;
        setResult('✅ Dispatched!');
        onSuccess?.(data);
      } catch {
        setResult('❌ Dispatch failed');
      } finally {
        setLoading(false);
        setTimeout(() => setResult(null), 3500);
      }
    };

    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={handleDispatch}
          disabled={loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 16px',
            background: loading
              ? 'rgba(37,211,102,0.3)'
              : 'linear-gradient(135deg,#25D366,#128C7E)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 700,
            fontSize: '12px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: loading ? 'none' : '0 2px 12px rgba(37,211,102,0.4)',
          }}
        >
          {loading ? (
            <>
              <span
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite',
                }}
              />
              Dispatching…
            </>
          ) : (
            label
          )}
        </button>
        {result && (
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: result.startsWith('✅') ? '#25D366' : '#FF5252',
            }}
          >
            {result}
          </span>
        )}
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }
);

LindaDispatchNowButton.displayName = 'LindaDispatchNowButton';
export default LindaDispatchNowButton;
