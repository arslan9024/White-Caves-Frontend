import React from 'react';
import { Star, AlertCircle, CheckCircle, MessageSquare } from 'lucide-react';
import { NPS_DATA, REVIEWS, sentimentColors, totalNpsResponses, npsScore } from './HaloCRM.data';

export const HaloNpsTab: React.FC = () => {
  return (
    <div className="tab-content">
      <div
        style={{
          textAlign: 'center',
          padding: '20px 0 28px',
          borderBottom: '1px solid #e5e7eb',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: npsScore >= 50 ? '#22C55E' : '#F59E0B',
            lineHeight: 1,
          }}
        >
          {npsScore}
        </div>
        <div style={{ fontSize: 16, color: 'var(--text-secondary, #6b7280)', marginTop: 8 }}>
          Net Promoter Score
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary, #9ca3af)', marginTop: 4 }}>
          World-class: 70+ · Excellent: 50–69 · Good: 30–49
        </div>
      </div>
      {NPS_DATA.map(d => (
        <div
          key={d.range}
          style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}
        >
          <d.icon size={18} color={d.color} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{d.range}</span>
              <span style={{ fontWeight: 700, color: d.color }}>
                {d.count} ({Math.round((d.count / totalNpsResponses) * 100)}%)
              </span>
            </div>
            <div
              style={{
                height: 8,
                background: 'var(--color-e5e7eb, #e5e7eb)',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(d.count / totalNpsResponses) * 100}%`,
                  height: '100%',
                  background: d.color,
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const HaloReviewsTab: React.FC = () => {
  return (
    <div className="tab-content">
      {REVIEWS.map(r => (
        <div
          key={r.id}
          style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <strong>{r.client}</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill={i < Math.round(r.score / 2) ? '#F59E0B' : 'none'}
                    color="#F59E0B"
                  />
                ))}
              </div>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{r.score}/10</span>
            </div>
          </div>
          <p
            style={{
              margin: '0 0 8px',
              fontSize: 13,
              fontStyle: 'italic',
              color: 'var(--text-secondary, #374151)',
            }}
          >
            &ldquo;{r.comment}&rdquo;
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: 'var(--text-secondary, #9ca3af)' }}>{r.date}</span>
            <span
              className="status-badge"
              style={{
                background: `${sentimentColors[r.sentiment]}22`,
                color: sentimentColors[r.sentiment],
              }}
            >
              {r.sentiment}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const HaloAlertsTab: React.FC = () => {
  const detractors = REVIEWS.filter(r => r.sentiment === 'negative' || r.score <= 6);
  const promoters = REVIEWS.filter(r => r.sentiment !== 'negative' && r.score > 6);

  return (
    <div className="tab-content">
      <h3 style={{ marginBottom: 16 }}>Action Required</h3>
      {detractors.map(r => (
        <div
          key={r.id}
          style={{
            background: '#fff7f7',
            border: '1px solid #fecaca',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <AlertCircle
              size={18}
              color="var(--color-e31e24, #E31E24)"
              style={{ flexShrink: 0, marginTop: 2 }}
            />
            <div>
              <strong>{r.client}</strong> — Score {r.score}/10
              <p
                style={{
                  margin: '4px 0',
                  fontSize: 13,
                  color: 'var(--text-secondary, #374151)',
                }}
              >
                &ldquo;{r.comment}&rdquo;
              </p>
              <button
                className="action-btn primary"
                style={{ fontSize: 12, padding: '6px 14px', marginTop: 6 }}
              >
                <MessageSquare size={12} /> Reach Out
              </button>
            </div>
          </div>
        </div>
      ))}
      {promoters.length > 0 && (
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: 12,
            padding: 16,
          }}
        >
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <CheckCircle size={18} color="#22C55E" />
            <span style={{ fontSize: 13 }}>
              {promoters.length} promoters — consider requesting Google/Bayut reviews.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

