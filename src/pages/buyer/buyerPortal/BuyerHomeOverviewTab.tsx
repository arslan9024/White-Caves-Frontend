import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Heart, Calculator, Landmark } from 'lucide-react';

interface BuyerHomeOverviewTabProps {
  buyerName: string;
}

const BUYER_MILESTONES = [
  { id: 1, label: '1. Property Shortlist', active: true },
  { id: 2, label: '2. Form B Representation', active: false },
  { id: 3, label: '3. Unified Form F / MOU', active: false },
  { id: 4, label: '4. Developer NOC & Escrow', active: false },
  { id: 5, label: '5. Trustee Title Deed Handover', active: false },
];

export const BuyerHomeOverviewTab: FC<BuyerHomeOverviewTabProps> = ({ buyerName }) => (
  <div className="buyer-portal-home">
    <header style={{ marginBottom: '1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
        Welcome back, {buyerName}
      </h1>
      <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.35rem' }}>
        Track your property search, viewings, and purchase milestones in Dubai.
      </p>
    </header>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}
    >
      <div
        style={{
          background: '#1e293b',
          padding: '1.25rem',
          borderRadius: '0.5rem',
          border: '1px solid #334155',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.75rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
          }}
        >
          <Heart size={14} color="#EF4444" />
          <span>Saved Properties</span>
        </div>
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#38bdf8',
            marginTop: '0.25rem',
          }}
        >
          Active List
        </div>
        <Link
          to="/buyer/favorites"
          style={{
            color: '#38bdf8',
            fontSize: '0.75rem',
            textDecoration: 'underline',
            marginTop: '0.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <span>View all favorites</span>
          <ArrowRight size={12} />
        </Link>
      </div>

      <div
        style={{
          background: '#1e293b',
          padding: '1.25rem',
          borderRadius: '0.5rem',
          border: '1px solid #334155',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.75rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
          }}
        >
          <Calculator size={14} color="#10b981" />
          <span>Mortgage Assessment</span>
        </div>
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#10b981',
            marginTop: '0.25rem',
          }}
        >
          Pre-approval
        </div>
        <Link
          to="/buyer/mortgage-calculator"
          style={{
            color: '#10b981',
            fontSize: '0.75rem',
            textDecoration: 'underline',
            marginTop: '0.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <span>Calculate rate &amp; installments</span>
          <ArrowRight size={12} />
        </Link>
      </div>

      <div
        style={{
          background: '#1e293b',
          padding: '1.25rem',
          borderRadius: '0.5rem',
          border: '1px solid #334155',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.75rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
          }}
        >
          <Landmark size={14} color="#f59e0b" />
          <span>DLD Statutory Transfer</span>
        </div>
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#f59e0b',
            marginTop: '0.25rem',
          }}
        >
          4% Fee Model
        </div>
        <Link
          to="/buyer/dld-fees"
          style={{
            color: '#f59e0b',
            fontSize: '0.75rem',
            textDecoration: 'underline',
            marginTop: '0.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <span>Estimate registration costs</span>
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>

    <div
      style={{
        background: '#0f172a',
        borderRadius: '0.5rem',
        padding: '1.25rem',
        border: '1px solid #334155',
      }}
    >
      <h3
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: '#f1f5f9',
          marginBottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <CheckCircle2 size={16} color="#EF4444" />
        <span>Buying Milestone Progress (DLD Standard)</span>
      </h3>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {BUYER_MILESTONES.map(step => (
          <span
            key={step.id}
            style={{
              padding: '0.35rem 0.75rem',
              background: '#1e293b',
              color: step.active ? '#38bdf8' : '#94a3b8',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              border: step.active ? '1px solid #0284c7' : '1px solid transparent',
            }}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  </div>
);
