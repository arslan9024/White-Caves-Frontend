import React, { memo } from 'react';

export const LindaBroadcastRecipientFilterSelector: React.FC<{
  selected?: string;
  onSelect?: (s: string) => void;
}> = memo(({ selected = 'ALL', onSelect }) => (
  <select
    value={selected}
    onChange={e => onSelect?.(e.target.value)}
    style={{
      background: '#1E293B',
      border: '1px solid #334155',
      color: '#E2E8F0',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '10px',
      outline: 'none',
    }}
  >
    <option value="ALL">All Contacts (DH2 Owners)</option>
    <option value="AMAZON">Amazon Cluster Only</option>
    <option value="COURSETIA">Coursetia Cluster Only</option>
    <option value="VERIFIED_CASH">Verified Cash Buyers</option>
  </select>
));
export default LindaBroadcastRecipientFilterSelector;
