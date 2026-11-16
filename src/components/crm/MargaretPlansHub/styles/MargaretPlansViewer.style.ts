import styled from 'styled-components';

export const ViewerOverlay = styled.div`
  background: var(--bg-card, #ffffff);
  color: #0f172a;
  border-radius: 16px;
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 2rem;
  margin-top: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  .doc-container {
    font-family: 'Inter', -apple-system, sans-serif;
    line-height: 1.65;
  }
  .doc-header-badge {
    font-size: 0.75rem;
    font-weight: 800;
    color: #d97706;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }
  .doc-title {
    font-size: 1.85rem;
    font-weight: 900;
    color: #0f172a;
    margin: 0 0 1rem 0;
  }
  .doc-lead {
    font-size: 1.05rem;
    color: #475569;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  .doc-section-heading {
    font-size: 1.3rem;
    font-weight: 800;
    color: #0f172a;
    margin: 2rem 0 1rem 0;
    border-bottom: 2px solid #f1f5f9;
    padding-bottom: 0.5rem;
  }
  .doc-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .doc-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 1rem;
  }
  .doc-card-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
  }
  .doc-card-value {
    font-size: 1.25rem;
    font-weight: 900;
    color: #0f172a;
    margin: 0.25rem 0;
  }
  .doc-card-sub {
    font-size: 0.75rem;
    color: #94a3b8;
  }
  .doc-table-wrap {
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  .doc-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }
  .doc-table th {
    background: #f1f5f9;
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 800;
    color: #0f172a;
    border-bottom: 2px solid #cbd5e1;
  }
  .doc-table td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e2e8f0;
    color: #334155;
  }
  .status-pill {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 800;
  }
  .status-pill.green {
    background: #dcfce7;
    color: #15803d;
  }
  .status-pill.blue {
    background: #dbeafe;
    color: #1d4ed8;
  }
  .status-pill.gray {
    background: #f1f5f9;
    color: #64748b;
  }
  .code-block {
    background: #0f172a;
    color: #38bdf8;
    padding: 1rem;
    border-radius: 8px;
    font-family: monospace;
    font-size: 0.85rem;
    overflow-x: auto;
    margin: 1rem 0;
  }
`;

export const ViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 1rem;
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid ${(p) => (p.$variant === 'primary' ? '#f59e0b' : '#cbd5e1')};
  background: ${(p) => (p.$variant === 'primary' ? '#f59e0b' : '#ffffff')};
  color: ${(p) => (p.$variant === 'primary' ? '#0f172a' : '#1e293b')};
  transition: all 0.2s;

  &:hover {
    background: ${(p) => (p.$variant === 'primary' ? '#d97706' : '#f1f5f9')};
  }
`;

