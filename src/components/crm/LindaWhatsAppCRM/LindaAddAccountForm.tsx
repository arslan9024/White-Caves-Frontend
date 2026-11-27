// FILE: src/components/crm/LindaWhatsAppCRM/LindaAddAccountForm.tsx
/**
 * Linda Add Account Form
 * Inline form to dynamically register a new WhatsApp line.
 * Calls addAccount() from useLindaAccountAutoload hook.
 * POSTs to /api/linda/session/register to persist server-side.
 * Upgrade #5 — white-caves-frontend
 */
import React, { memo, useState } from 'react';
import type { AccountRole } from './useLindaAccountAutoload';

interface LindaAddAccountFormProps {
  onAddAccount: (phone: string, role: AccountRole) => void;
}

const ROLE_OPTIONS: { value: AccountRole; label: string }[] = [
  { value: 'master', label: '👑 Master' },
  { value: 'employee', label: '🏢 Employee' },
  { value: 'servant', label: '📡 Servant/Outreach' },
];

export const LindaAddAccountForm = memo<LindaAddAccountFormProps>(({ onAddAccount }) => {
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<AccountRole>('employee');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.trim().replace(/\s/g, '');
    if (!cleanPhone.match(/^\+?[0-9]{9,15}$/)) {
      setMsg('❌ Invalid phone number. Use format: +971XXXXXXXXX');
      return;
    }
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch('/api/linda/session/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, role }),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      onAddAccount(cleanPhone, role);
      setMsg('✅ Account registered!');
      setPhone('');
    } catch {
      setMsg('❌ Failed to register account (server error)');
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(null), 4000);
    }
  };

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        style={{
          padding: '6px 14px',
          background: 'rgba(37,211,102,0.1)',
          border: '1px dashed rgba(37,211,102,0.4)',
          borderRadius: '8px',
          color: '#25D366',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 600,
        }}
      >
        + Add Account
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}
    >
      <input
        type="text"
        placeholder="+971XXXXXXXXX"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        style={{
          padding: '6px 10px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '12px',
          width: '150px',
        }}
      />
      <select
        value={role}
        onChange={e => setRole(e.target.value as AccountRole)}
        style={{
          padding: '6px 8px',
          background: '#1a1a2e',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '12px',
        }}
      >
        {ROLE_OPTIONS.map(r => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '6px 14px',
          background: 'linear-gradient(135deg,#25D366,#128C7E)',
          border: 'none',
          borderRadius: '8px',
          color: '#fff',
          fontWeight: 700,
          fontSize: '12px',
          cursor: 'pointer',
        }}
      >
        {loading ? '…' : 'Register'}
      </button>
      <button
        type="button"
        onClick={() => setExpanded(false)}
        style={{
          padding: '6px 10px',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '12px',
          cursor: 'pointer',
        }}
      >
        ✕
      </button>
      {msg && (
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: msg.startsWith('✅') ? '#25D366' : '#FFA500',
          }}
        >
          {msg}
        </span>
      )}
    </form>
  );
});

LindaAddAccountForm.displayName = 'LindaAddAccountForm';
export default LindaAddAccountForm;
