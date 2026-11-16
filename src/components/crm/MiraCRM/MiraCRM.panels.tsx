import React from 'react';
import { TRANSLATIONS, LANGUAGES, STATUS_COLORS, DEMO_TRANSLATIONS } from './MiraCRM.data';

export const TranslationQueuePanel: React.FC = () => {
  return (
    <div className="tab-content">
      <table className="data-table">
        <thead>
          <tr>
            <th>Document</th>
            <th>From</th>
            <th>To</th>
            <th>Pages</th>
            <th>Requested By</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {TRANSLATIONS.map(t => (
            <tr key={t.id}>
              <td
                style={{
                  maxWidth: 200,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <strong>{t.doc}</strong>
              </td>
              <td>{t.from}</td>
              <td>{t.to}</td>
              <td>{t.pages}</td>
              <td>{t.requestedBy}</td>
              <td style={{ fontSize: 12, color: 'var(--text-secondary, #6b7280)' }}>{t.time}</td>
              <td>
                <span
                  className="status-badge"
                  style={{
                    background: `${STATUS_COLORS[t.status]}22`,
                    color: STATUS_COLORS[t.status],
                  }}
                >
                  {t.status.replace('_', ' ')}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const LiveTranslatePanel: React.FC<{
  fromLang: string;
  setFromLang: (val: string) => void;
  toLang: string;
  setToLang: (val: string) => void;
  inputText: string;
  setInputText: (val: string) => void;
}> = ({ fromLang, setFromLang, toLang, setToLang, inputText, setInputText }) => {
  return (
    <div className="tab-content">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <label style={{ fontSize: 13, color: 'var(--text-secondary, #6b7280)' }}>From:</label>
            <select
              value={fromLang}
              onChange={e => setFromLang(e.target.value)}
              style={{
                fontSize: 13,
                padding: '4px 8px',
                borderRadius: 6,
                border: '1px solid #e5e7eb',
              }}
            >
              <option>English</option>
              {LANGUAGES.map(l => (
                <option key={l.code}>{l.name}</option>
              ))}
            </select>
          </div>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            rows={6}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              fontSize: 14,
              resize: 'vertical',
            }}
          />
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <label style={{ fontSize: 13, color: 'var(--text-secondary, #6b7280)' }}>To:</label>
            <select
              value={toLang}
              onChange={e => setToLang(e.target.value)}
              style={{
                fontSize: 13,
                padding: '4px 8px',
                borderRadius: 6,
                border: '1px solid #e5e7eb',
              }}
            >
              {LANGUAGES.map(l => (
                <option key={l.code}>{l.name}</option>
              ))}
            </select>
          </div>
          <div
            dir={toLang === 'Arabic' || toLang === 'Urdu' ? 'rtl' : 'ltr'}
            style={{
              width: '100%',
              minHeight: 140,
              padding: 12,
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              fontSize: 14,
              background: '#f9fafb',
              lineHeight: 1.8,
            }}
          >
            {DEMO_TRANSLATIONS[toLang] || 'Translation not available for demo.'}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 11,
          color: 'var(--text-secondary, #9ca3af)',
          textAlign: 'center',
        }}
      >
        Demo translation. Production uses DeepL + custom real-estate terminology dictionary.
      </div>
    </div>
  );
};

export const LanguagesGridPanel: React.FC = () => {
  return (
    <div className="tab-content">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 14,
        }}
      >
        {LANGUAGES.map(l => (
          <div
            key={l.code}
            style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: 16,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 8 }}>{l.flag}</div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{l.name}</div>
            <div
              style={{
                fontSize: 12,
                color: 'var(--text-secondary, #6b7280)',
                marginTop: 4,
              }}
            >
              {l.docs} documents this month
            </div>
            {l.rtl && (
              <span
                style={{
                  marginTop: 8,
                  display: 'inline-block',
                  background: '#EEF2FF',
                  color: '#4F46E5',
                  borderRadius: 20,
                  padding: '2px 8px',
                  fontSize: 11,
                }}
              >
                RTL
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

