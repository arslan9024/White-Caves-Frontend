import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Heart, Landmark, Search } from 'lucide-react';

export const BuyerSavedTab: FC = () => (
  <div className="buyer-portal-saved">
    <h2
      style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#f8fafc',
        marginBottom: '1rem',
      }}
    >
      Saved Listings &amp; Searches
    </h2>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Link
        to="/buyer/favorites"
        className="portal-action-btn"
        style={{
          padding: '0.75rem 1.25rem',
          background: '#EF4444',
          color: '#FFFFFF',
          borderRadius: '0.375rem',
          textDecoration: 'none',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Heart size={16} />
        <span>Open My Favorite Listings</span>
      </Link>
      <Link
        to="/buyer/saved-searches"
        className="portal-action-btn"
        style={{
          padding: '0.75rem 1.25rem',
          background: '#1e293b',
          color: '#f8fafc',
          borderRadius: '0.375rem',
          textDecoration: 'none',
          border: '1px solid #475569',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Search size={16} />
        <span>Manage Saved Searches</span>
      </Link>
    </div>
  </div>
);

export const BuyerFinancialToolsTab: FC = () => (
  <div className="buyer-portal-tools">
    <h2
      style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#f8fafc',
        marginBottom: '1rem',
      }}
    >
      Dubai Buyer Financial Tools
    </h2>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
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
        <h3
          style={{
            color: '#f1f5f9',
            fontWeight: 600,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Calculator size={16} color="#38bdf8" />
          <span>Mortgage Calculator</span>
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.5rem 0 1rem' }}>
          Calculate monthly installments, down payment requirements, and interest rates.
        </p>
        <Link
          to="/buyer/mortgage-calculator"
          style={{
            color: '#38bdf8',
            fontSize: '0.85rem',
            textDecoration: 'underline',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <span>Launch Mortgage Calculator</span>
          <ArrowRight size={13} />
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
        <h3
          style={{
            color: '#f1f5f9',
            fontWeight: 600,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Landmark size={16} color="#f59e0b" />
          <span>DLD Fees Estimator</span>
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.5rem 0 1rem' }}>
          Estimate Dubai Land Department 4% transfer fees, trustee admin fees, and VAT.
        </p>
        <Link
          to="/buyer/dld-fees"
          style={{
            color: '#f59e0b',
            fontSize: '0.85rem',
            textDecoration: 'underline',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <span>Launch DLD Fees Estimator</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  </div>
);
