import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, UserPlus, KeyRound, ArrowRight, Sparkles } from 'lucide-react';
import { cleanupHomepageHeroPreload, ensureHomepageHeroPreload } from './homePagePreload';
import './HomePage.css';

const HomePage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    ensureHomepageHeroPreload();
    return () => {
      cleanupHomepageHeroPreload();
    };
  }, []);

  return (
    <main className="crm-command-center wc-landing-portal" data-testid="crm-command-center">
      <header className="crm-command-center__header wc-landing-header">
        <div className="crm-command-center__brand">
          <Building2 size={32} className="wc-brand-icon" />
          <div>
            <h1>White Caves Real Estate</h1>
            <p>Dubai Sovereign Prop-Tech Portal • Enterprise Portal &amp; Client Gateway</p>
          </div>
        </div>
        <div className="crm-command-center__actions">
          <button type="button" className="wc-btn-primary" onClick={() => navigate('/signin')}>
            <ShieldCheck size={18} />
            <span>Sign In</span>
          </button>
          <button type="button" className="wc-btn-secondary" onClick={() => navigate('/signup')}>
            <UserPlus size={18} />
            <span>Create Account</span>
          </button>
        </div>
      </header>

      <section className="wc-welcome-hero" aria-label="Welcome and Authentication Gateway">
        <div className="wc-welcome-card">
          <div className="wc-welcome-badge">
            <Sparkles size={16} />
            <span>Sovereign Real Estate Ecosystem</span>
          </div>
          <h2 className="wc-welcome-title">Welcome to White Caves</h2>
          <p className="wc-welcome-subtitle">
            Access your personal portal, institutional property intelligence, and secure transaction
            hub. Sign in to access your properties, manage investments, or register for full
            platform privileges.
          </p>

          <div className="wc-gateway-actions">
            <div className="wc-gateway-flow-card">
              <div className="wc-flow-icon-wrap">
                <KeyRound size={24} />
              </div>
              <div className="wc-flow-details">
                <h3>Operator &amp; Client Access</h3>
                <p>Secure login with Email, Phone SMS, Biometrics, or Enterprise credentials.</p>
              </div>
              <button type="button" className="wc-flow-cta" onClick={() => navigate('/signin')}>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="wc-gateway-flow-card">
              <div className="wc-flow-icon-wrap">
                <UserPlus size={24} />
              </div>
              <div className="wc-flow-details">
                <h3>New Registration</h3>
                <p>Register as a Buyer, Seller, Landlord, Tenant, or Corporate Partner.</p>
              </div>
              <button
                type="button"
                className="wc-flow-cta wc-flow-cta--secondary"
                onClick={() => navigate('/signup')}
              >
                <span>Sign Up</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
