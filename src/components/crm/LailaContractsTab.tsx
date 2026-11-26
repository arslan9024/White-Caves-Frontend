import React from 'react';
import { Users, Calendar, Eye, Download } from 'lucide-react';
import { MOCK_CONTRACTS } from './lailaCompliance.data';

interface ContractsTabProps {
  onValidateContract?: (contract: (typeof MOCK_CONTRACTS)[number]) => void;
}

export const LailaContractsTab: React.FC<ContractsTabProps> = ({ onValidateContract }) => {
  return (
    <div className="contracts-view">
      <h3>Contract Reviews</h3>
      <div className="contract-cards">
        {MOCK_CONTRACTS.map(contract => (
          <div key={contract.id} className="contract-card">
            <div className="contract-header">
              <h4>{contract.title}</h4>
              <span className={`status-badge ${contract.status}`}>
                {contract.status.replace('_', ' ')}
              </span>
            </div>
            <div className="contract-details">
              <span>
                <Users size={14} /> {contract.parties}
              </span>
              {contract.value > 0 && <span>AED {contract.value.toLocaleString()}</span>}
              <span>
                <Calendar size={14} /> {contract.date}
              </span>
            </div>
            <div className="contract-actions">
              <button type="button" onClick={() => onValidateContract?.(contract)}>
                <Eye size={14} /> Review
              </button>
              <button type="button">
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
