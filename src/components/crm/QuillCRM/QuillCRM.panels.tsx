import React from 'react';
import { Eye, Download, Send, Search, Plus, FileText, FileEdit } from 'lucide-react';
import { RecentDocument, DocumentTemplate } from './QuillCRM.types';
import { statusColors, TEMPLATES, TEMPLATE_CATEGORIES } from './QuillCRM.data';

interface RecentDocsTabPanelProps {
  recentDocs: RecentDocument[];
}

export const RecentDocsTabPanel: React.FC<RecentDocsTabPanelProps> = ({ recentDocs }) => (
  <div className="tab-content">
    <table className="data-table">
      <thead>
        <tr>
          <th>Document</th>
          <th>Type</th>
          <th>Created</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {recentDocs.map(d => (
          <tr key={d.id}>
            <td
              style={{
                maxWidth: 240,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <strong>{d.title}</strong>
            </td>
            <td>
              <span className="status-badge">{d.type}</span>
            </td>
            <td style={{ fontSize: 12, color: 'var(--text-secondary, #6b7280)' }}>{d.created}</td>
            <td>
              <span
                className="status-badge"
                style={{
                  background: `${statusColors[d.status]}22`,
                  color: statusColors[d.status],
                }}
              >
                {d.status}
              </span>
            </td>
            <td>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="action-btn" style={{ fontSize: 11, padding: '4px 8px' }}>
                  <Eye size={11} />
                </button>
                <button className="action-btn" style={{ fontSize: 11, padding: '4px 8px' }}>
                  <Download size={11} />
                </button>
                <button className="action-btn" style={{ fontSize: 11, padding: '4px 8px' }}>
                  <Send size={11} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface TemplatesTabPanelProps {
  search: string;
  setSearch: (s: string) => void;
  catFilter: string;
  setCatFilter: (c: string) => void;
  filteredTemplates: DocumentTemplate[];
}

export const TemplatesTabPanel: React.FC<TemplatesTabPanelProps> = ({
  search,
  setSearch,
  catFilter,
  setCatFilter,
  filteredTemplates,
}) => (
  <div className="tab-content">
    <div className="tab-toolbar">
      <div className="search-box">
        <Search size={16} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search templates…"
        />
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {TEMPLATE_CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            style={{
              padding: '6px 12px',
              borderRadius: 20,
              border: `1px solid ${catFilter === c ? '#64748B' : '#e5e7eb'}`,
              background: catFilter === c ? '#64748B' : '#fff',
              color: catFilter === c ? '#fff' : '#374151',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
    {filteredTemplates.map(t => (
      <div
        key={t.id}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: 10,
          padding: '12px 16px',
          marginBottom: 10,
        }}
      >
        <FileText size={18} color="#64748B" />
        <div style={{ flex: 1 }}>
          <strong>{t.name}</strong>
          <div
            style={{
              fontSize: 12,
              color: 'var(--text-secondary, #6b7280)',
              marginTop: 2,
            }}
          >
            {t.category} · {t.lang} · {t.uses} uses
          </div>
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-secondary, #9ca3af)' }}>
          Used {t.lastUsed}
        </span>
        <button className="action-btn primary" style={{ fontSize: 12, padding: '6px 14px' }}>
          <Plus size={12} /> Generate
        </button>
      </div>
    ))}
  </div>
);

export const GenerateTabPanel: React.FC = () => (
  <div className="tab-content">
    <h3 style={{ marginBottom: 16 }}>Quick Document Generator</h3>
    <div style={{ display: 'grid', gap: 14 }}>
      {[
        {
          label: 'Document Template',
          type: 'select',
          options: TEMPLATES.map(t => t.name),
        },
        {
          label: 'Client Name',
          type: 'text',
          placeholder: 'e.g. Ahmad Al Rashidi',
        },
        { label: 'Property', type: 'text', placeholder: 'e.g. Palm Villa G-12' },
        {
          label: 'Transaction Amount (AED)',
          type: 'text',
          placeholder: 'e.g. 8500000',
        },
        {
          label: 'Output Language',
          type: 'select',
          options: ['English', 'Arabic', 'Bilingual EN/AR'],
        },
      ].map(f => (
        <div key={f.label}>
          <label
            style={{
              fontSize: 13,
              color: 'var(--text-secondary, #6b7280)',
              marginBottom: 6,
              display: 'block',
            }}
          >
            {f.label}
          </label>
          {f.type === 'select' ? (
            <select
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                fontSize: 14,
              }}
            >
              {f.options?.map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder={f.placeholder}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                fontSize: 14,
              }}
            />
          )}
        </div>
      ))}
      <button
        className="action-btn primary"
        style={{ marginTop: 4, padding: '10px 20px', fontSize: 14 }}
      >
        <FileEdit size={16} /> Generate Document
      </button>
    </div>
  </div>
);
