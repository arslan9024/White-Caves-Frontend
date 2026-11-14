/**
 * TransactionManager — CSS Stylesheet
 * Standard: Mary Allen Wilkes Protocol (.styles.ts)
 */

export const transactionManagerStyles = `
  .transactions-view {
    padding: 24px;
    background: var(--surface-primary, #fff);
    min-height: 100%;
  }
  
  .transactions-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .transactions-header h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary, #1A1A1A);
    margin: 0;
  }
  
  .subtitle {
    color: var(--text-muted, #64748b);
    font-size: 0.875rem;
    margin: 4px 0 0 34px;
  }
  
  .header-actions {
    display: flex;
    gap: 10px;
  }
  
  .action-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }
  
  .action-btn.primary {
    background: linear-gradient(135deg, #1A1A1A, #1a2d52);
    color: #fff;
  }
  
  .action-btn.primary:hover {
    background: linear-gradient(135deg, #0d2248, #243a63);
    transform: translateY(-1px);
  }
  
  .action-btn.secondary {
    background: var(--surface-secondary, #f8fafc);
    color: var(--text-primary, #1A1A1A);
    border: 1px solid var(--border-color, #e2e8f0);
  }
  
  .action-btn.secondary:hover {
    background: #f1f5f9;
  }
  
  .import-btn {
    cursor: pointer;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .stat-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px;
    background: var(--surface-secondary, #f8fafc);
    border-radius: 12px;
    border: 1px solid var(--border-color, #e2e8f0);
  }
  
  .stat-card.highlight {
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
    border-color: rgba(212, 175, 55, 0.3);
  }
  
  .stat-icon {
    color: #B03737;
  }
  
  .stat-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary, #1A1A1A);
  }
  
  .stat-label {
    font-size: 0.75rem;
    color: var(--text-muted, #64748b);
  }
  
  .filters-panel {
    background: var(--surface-secondary, #f8fafc);
    border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    overflow: hidden;
  }
  
  .filters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
  }

  .filter-item label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary, #475569);
    margin-bottom: 6px;
  }

  .filter-item input,
  .filter-item select {
    width: 100%;
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid var(--border-color, #e2e8f0);
    background: #fff;
    font-size: 0.875rem;
  }

  .filter-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }

  .clear-btn {
    padding: 8px 16px;
    background: none;
    border: 1px solid var(--border-color, #cbd5e1);
    border-radius: 6px;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .table-container {
    overflow-x: auto;
    background: #fff;
    border-radius: 12px;
    border: 1px solid var(--border-color, #e2e8f0);
  }

  .transactions-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.875rem;
  }

  .transactions-table th {
    padding: 12px 16px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
  }

  .transactions-table td {
    padding: 12px 16px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
  }

  .row-actions {
    display: flex;
    gap: 8px;
  }

  .icon-btn {
    padding: 6px;
    border-radius: 6px;
    border: none;
    background: #f1f5f9;
    cursor: pointer;
    color: #475569;
  }

  .icon-btn:hover {
    background: #e2e8f0;
    color: #0f172a;
  }

  .icon-btn.delete:hover {
    background: #fee2e2;
    color: #ef4444;
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
  }

  .pagination button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    border: 1px solid #e2e8f0;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
  }

  .pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: #fff;
    border-radius: 16px;
    max-width: 600px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    padding: 24px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }
`;
