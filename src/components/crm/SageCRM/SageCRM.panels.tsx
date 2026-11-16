import React from 'react';
import { MortgageApplication, BankInfo } from './SageCRM.types';
import { statusColors } from './SageCRM.data';

interface ApplicationsTabPanelProps {
  applications: MortgageApplication[];
}

export const ApplicationsTabPanel: React.FC<ApplicationsTabPanelProps> = ({ applications }) => (
  <div className="tab-content">
    <table className="data-table">
      <thead>
        <tr>
          <th>Client</th>
          <th>Bank</th>
          <th>Amount</th>
          <th>Rate</th>
          <th>LTV</th>
          <th>Term</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {applications.map(a => (
          <tr key={a.id}>
            <td>
              <strong>{a.client}</strong>
            </td>
            <td>{a.bank}</td>
            <td>{a.amount}</td>
            <td>{a.rate}</td>
            <td>{a.ltv}</td>
            <td>{a.term}yr</td>
            <td>
              <span
                className="status-badge"
                style={{
                  background: `${statusColors[a.status] || '#6b7280'}22`,
                  color: statusColors[a.status] || '#6b7280',
                }}
              >
                {a.status.replace('_', ' ')}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface CalculatorTabPanelProps {
  calcPrice: number;
  setCalcPrice: (v: number) => void;
  calcDown: number;
  setCalcDown: (v: number) => void;
  calcRate: number;
  setCalcRate: (v: number) => void;
  calcYears: number;
  setCalcYears: (v: number) => void;
  loanAmt: number;
  monthly: number;
  totalCost: number;
}

export const CalculatorTabPanel: React.FC<CalculatorTabPanelProps> = ({
  calcPrice,
  setCalcPrice,
  calcDown,
  setCalcDown,
  calcRate,
  setCalcRate,
  calcYears,
  setCalcYears,
  loanAmt,
  monthly,
  totalCost,
}) => {
  const fields = [
    {
      label: 'Property Price (AED)',
      key: 'calcPrice',
      val: calcPrice,
      setter: setCalcPrice,
      min: 100000,
      max: 50000000,
      step: 50000,
    },
    {
      label: 'Down Payment (%)',
      key: 'calcDown',
      val: calcDown,
      setter: setCalcDown,
      min: 20,
      max: 50,
      step: 1,
    },
    {
      label: 'Interest Rate (%)',
      key: 'calcRate',
      val: calcRate,
      setter: setCalcRate,
      min: 1,
      max: 10,
      step: 0.01,
    },
    {
      label: 'Term (Years)',
      key: 'calcYears',
      val: calcYears,
      setter: setCalcYears,
      min: 5,
      max: 25,
      step: 1,
    },
  ];

  return (
    <div className="tab-content">
      <h3 style={{ marginBottom: 16 }}>UAE Mortgage Calculator</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {fields.map(f => (
          <div key={f.key}>
            <label
              style={{
                fontSize: 13,
                color: 'var(--text-secondary, #6b7280)',
                marginBottom: 4,
                display: 'block',
              }}
            >
              {f.label}
            </label>
            <input
              type="number"
              value={f.val}
              min={f.min}
              max={f.max}
              step={f.step}
              onChange={e => f.setter(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                fontSize: 14,
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: 12,
          padding: 20,
        }}
      >
        <h4 style={{ marginBottom: 16, color: 'var(--color-0369a1, #0369A1)' }}>Results</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { label: 'Loan Amount', value: `AED ${Math.round(loanAmt).toLocaleString()}` },
            {
              label: 'Monthly Payment',
              value: `AED ${Math.round(monthly).toLocaleString()}`,
            },
            { label: 'Total Cost', value: `AED ${Math.round(totalCost).toLocaleString()}` },
          ].map(r => (
            <div
              key={r.label}
              style={{
                textAlign: 'center',
                background: '#fff',
                borderRadius: 8,
                padding: 14,
                border: '1px solid #e0f2fe',
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: 'var(--color-0ea5e9, #0EA5E9)',
                }}
              >
                {r.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--text-secondary, #6b7280)',
                  marginTop: 4,
                }}
              >
                {r.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface BanksTabPanelProps {
  banks: BankInfo[];
}

export const BanksTabPanel: React.FC<BanksTabPanelProps> = ({ banks }) => (
  <div className="tab-content">
    {banks.map(b => (
      <div
        key={b.name}
        style={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          <div>
            <strong style={{ fontSize: 15 }}>{b.name}</strong>
            {b.sharia && (
              <span
                style={{
                  marginLeft: 8,
                  background: '#F0FDF4',
                  color: '#166534',
                  borderRadius: 20,
                  padding: '2px 8px',
                  fontSize: 11,
                }}
              >
                Sharia
              </span>
            )}
          </div>
          <span style={{ color: 'var(--color-e31e24, #E31E24)', fontWeight: 700 }}>
            From {b.minRate}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 16,
            fontSize: 13,
            color: '#374151',
            flexWrap: 'wrap',
          }}
        >
          <span>Max LTV: {b.maxLTV}</span>
          <span>Processing: {b.processingDays} days</span>
          <span>Min Salary: {b.minSalary}</span>
          <span>Expats: {b.expats ? '✅' : '❌'}</span>
        </div>
      </div>
    ))}
  </div>
);

