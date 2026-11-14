/**
 * TransactionManager — Presentational View Layer
 * Standard: Mary Allen Wilkes Protocol (.view.tsx)
 * Single Purpose File Law: < 350 lines
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Receipt,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Edit2,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Building,
  MapPin,
  Home,
  DollarSign,
  Calendar,
  ArrowUpDown,
  RefreshCw,
  FileSpreadsheet,
} from 'lucide-react';
import { useTransactionManagerLogic } from './TransactionManager.logic';
import {
  PROPERTY_TYPES,
  ROOM_OPTIONS,
  formatCurrency,
  formatDate,
} from './TransactionManager.data';
import { transactionManagerStyles } from './TransactionManager.styles';

export const TransactionManagerView: React.FC = () => {
  const logic = useTransactionManagerLogic();

  return (
    <div className="transactions-view" data-testid="transactions-view">
      <style>{transactionManagerStyles}</style>

      {/* Header */}
      <div className="transactions-header">
        <div className="header-left">
          <h2>
            <Receipt size={24} /> DLD Transactions
          </h2>
          <div className="subtitle">Official Dubai Land Department registry records</div>
        </div>
        <div className="header-actions">
          <label className="action-btn secondary import-btn">
            <Upload size={16} /> {logic.importing ? 'Importing...' : 'Import CSV'}
            <input
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              onChange={logic.handleImport}
              disabled={logic.importing}
            />
          </label>
          <button
            className="action-btn secondary"
            onClick={() => logic.setShowFilters(!logic.showFilters)}
          >
            <Filter size={16} /> Filters
          </button>
          <button className="action-btn primary" onClick={logic.handleCreate}>
            <Plus size={16} /> Add Transaction
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {logic.stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <FileSpreadsheet className="stat-icon" size={24} />
            <div>
              <div className="stat-value">
                {logic.stats.totalTransactions?.toLocaleString() || 0}
              </div>
              <div className="stat-label">Total Transactions</div>
            </div>
          </div>
          <div className="stat-card highlight">
            <DollarSign className="stat-icon" size={24} />
            <div>
              <div className="stat-value">{formatCurrency(logic.stats.totalValue)}</div>
              <div className="stat-label">Total Volume</div>
            </div>
          </div>
          <div className="stat-card">
            <Building className="stat-icon" size={24} />
            <div>
              <div className="stat-value">
                AED {Math.round(logic.stats.avgPricePerSqFt || 0).toLocaleString()}
              </div>
              <div className="stat-label">Avg Price / Sq.Ft</div>
            </div>
          </div>
          <div className="stat-card">
            <Home className="stat-icon" size={24} />
            <div>
              <div className="stat-value">{Math.round((logic.stats.offplanRatio || 0) * 100)}%</div>
              <div className="stat-label">Off-Plan Share</div>
            </div>
          </div>
        </div>
      )}

      {/* Filters Dropdown */}
      <AnimatePresence>
        {logic.showFilters && (
          <motion.div
            className="filters-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="filters-grid">
              <div className="filter-item">
                <label>Search Query</label>
                <input
                  type="text"
                  placeholder="Area, Project, Transaction #..."
                  value={logic.filters.search}
                  onChange={e => logic.handleFilterChange('search', e.target.value)}
                />
              </div>
              <div className="filter-item">
                <label>Area</label>
                <input
                  type="text"
                  placeholder="Dubai Marina, Downtown..."
                  value={logic.filters.area}
                  onChange={e => logic.handleFilterChange('area', e.target.value)}
                />
              </div>
              <div className="filter-item">
                <label>Property Sub-Type</label>
                <select
                  value={logic.filters.propSubType}
                  onChange={e => logic.handleFilterChange('propSubType', e.target.value)}
                >
                  <option value="">All Types</option>
                  {PROPERTY_TYPES.map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-item">
                <label>Rooms</label>
                <select
                  value={logic.filters.rooms}
                  onChange={e => logic.handleFilterChange('rooms', e.target.value)}
                >
                  <option value="">All Rooms</option>
                  {ROOM_OPTIONS.map(r => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="filter-actions">
              <button className="clear-btn" onClick={logic.clearFilters}>
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transactions Table & Empty State */}
      {logic.loading ? (
        <div style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
          Loading transactions...
        </div>
      ) : logic.transactions.length === 0 ? (
        <div
          className="empty-state"
          style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}
        >
          <FileSpreadsheet size={48} style={{ margin: '0 auto 12px' }} />
          <h3>No Transactions Found</h3>
          <p>Import a CSV file or add transactions manually</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th onClick={() => logic.handleSort('transactionNumber')}>Transaction #</th>
                <th onClick={() => logic.handleSort('instanceDate')}>Date</th>
                <th onClick={() => logic.handleSort('area')}>Area</th>
                <th onClick={() => logic.handleSort('propSubType')}>Type</th>
                <th onClick={() => logic.handleSort('rooms')}>Rooms</th>
                <th onClick={() => logic.handleSort('transValue')}>Value (AED)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {logic.transactions.map(t => (
                <tr key={t._id}>
                  <td style={{ fontWeight: 600 }}>{t.transactionNumber}</td>
                  <td>{formatDate(t.instanceDate)}</td>
                  <td>{t.area}</td>
                  <td>{t.propSubType}</td>
                  <td>{t.rooms}</td>
                  <td style={{ fontWeight: 600 }}>{formatCurrency(t.transValue)}</td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-btn" onClick={() => logic.handleView(t)} title="View">
                        <Eye size={15} />
                      </button>
                      <button className="icon-btn" onClick={() => logic.handleEdit(t)} title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button
                        className="icon-btn delete"
                        onClick={() => logic.handleDelete(t._id)}
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {logic.pagination.pages > 1 && (
        <div className="pagination">
          <button
            disabled={logic.pagination.page === 1}
            onClick={() =>
              logic.setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))
            }
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <span>
            Page {logic.pagination.page} of {logic.pagination.pages}
          </span>
          <button
            disabled={logic.pagination.page === logic.pagination.pages}
            onClick={() => logic.setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Modal Dialog for View / Edit / Create */}
      <AnimatePresence>
        {logic.showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => logic.setShowModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>
                  {logic.modalMode === 'view' && 'Transaction Details'}
                  {logic.modalMode === 'edit' && 'Edit Transaction'}
                  {logic.modalMode === 'create' && 'New Transaction'}
                </h3>
                <button
                  onClick={() => logic.setShowModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              {logic.modalMode === 'view' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <strong>Number:</strong> {logic.selectedTransaction?.transactionNumber}
                  </div>
                  <div>
                    <strong>Value:</strong> {formatCurrency(logic.selectedTransaction?.transValue)}
                  </div>
                  <div>
                    <strong>Area:</strong> {logic.selectedTransaction?.area}
                  </div>
                  <div>
                    <strong>Type:</strong> {logic.selectedTransaction?.propSubType}
                  </div>
                  <div>
                    <strong>Rooms:</strong> {logic.selectedTransaction?.rooms}
                  </div>
                  <div>
                    <strong>Date:</strong> {formatDate(logic.selectedTransaction?.instanceDate)}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label>
                    Area:
                    <input
                      type="text"
                      value={logic.editForm.area || ''}
                      onChange={e => logic.setEditForm(prev => ({ ...prev, area: e.target.value }))}
                      style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                    />
                  </label>
                  <label>
                    Transaction Value (AED):
                    <input
                      type="number"
                      value={logic.editForm.transValue || 0}
                      onChange={e =>
                        logic.setEditForm(prev => ({
                          ...prev,
                          transValue: Number(e.target.value),
                        }))
                      }
                      style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                    />
                  </label>
                  <label>
                    Rooms:
                    <select
                      value={logic.editForm.rooms || '1 B/R'}
                      onChange={e =>
                        logic.setEditForm(prev => ({ ...prev, rooms: e.target.value }))
                      }
                      style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                    >
                      {ROOM_OPTIONS.map(r => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}

              <div className="modal-actions">
                <button className="action-btn secondary" onClick={() => logic.setShowModal(false)}>
                  Close
                </button>
                {logic.modalMode !== 'view' && (
                  <button className="action-btn primary" onClick={logic.handleSave}>
                    {logic.modalMode === 'create' ? 'Create Transaction' : 'Save Changes'}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast / Status Banners */}
      {logic.toasts.length > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            pointerEvents: 'none',
          }}
        >
          {logic.toasts.map(t => (
            <div
              key={t.id}
              role={t.color === '#10B981' ? 'status' : 'alert'}
              data-testid="transactions-status-banner"
              style={{
                background: t.color,
                color: '#FFFFFF',
                padding: '12px 18px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.85rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                maxWidth: '360px',
              }}
            >
              {t.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionManagerView;
