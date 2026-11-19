import React, { memo, useState } from 'react';
import { Send, Users } from 'lucide-react';

interface Props {
  onDispatch: (data: { template: string; selectedAccounts: string[] }) => void;
}

export const LindaBatchCampaignComposer: React.FC<Props> = memo(({ onDispatch }) => {
  const [template, setTemplate] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(['+971505760056']);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '10px',
        padding: '14px',
      }}
    >
      <h4
        style={{
          margin: '0 0 10px 0',
          fontSize: '13px',
          color: '#25D366',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <Users size={14} /> Multi-Account Batch Broadcast
      </h4>
      <textarea
        value={template}
        onChange={e => setTemplate(e.target.value)}
        placeholder="Enter broadcast template with {name} and {cluster} spintax tags..."
        style={{
          width: '100%',
          height: '65px',
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '6px',
          color: '#fff',
          fontSize: '11px',
          padding: '8px',
          outline: 'none',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
        <button
          onClick={() => onDispatch({ template, selectedAccounts })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 14px',
            color: '#fff',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Send size={12} /> Dispatch Broadcast
        </button>
      </div>
    </div>
  );
});

export default LindaBatchCampaignComposer;
