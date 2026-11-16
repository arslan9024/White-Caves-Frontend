import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  UserPlus,
  KeyRound,
  ArrowRight,
  Sparkles,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { cleanupHomepageHeroPreload, ensureHomepageHeroPreload } from './homePagePreload';
import { LandingAuthModal } from './components/LandingAuthModal';
import './HomePage.css';

/** Public website URL — property browsing, lead capture, SEO pages */
const WC_PUBLIC_SITE = 'https://whitecaves.ae';

/** Minimal teaser properties — just enough to entice, not a full inventory grid */
const PROPERTY_TEASERS = [
  {
    title: 'Signature Palm Villa',
    location: 'Palm Jumeirah',
    type: 'Luxury Villa',
    priceLabel: 'AED 38.5M',
  },
  {
    title: 'Downtown Sky Penthouse',
    location: 'Downtown Dubai',
    type: 'Penthouse',
    priceLabel: 'AED 24.9M',
  },
  {
    title: 'Elysian Mansions Estate',
    location: 'Tilal Al Ghaf',
    type: 'Off-Plan Mansion',
    priceLabel: 'AED 42M',
  },
] as const;

const HomePage: FC = () => {
  const navigate = useNavigate();
  const [authModalState, setAuthModalState] = useState<{
    isOpen: boolean;
    mode: 'signin' | 'signup';
  }>({
    isOpen: false,
    mode: 'signin',
  });

  useEffect(() => {
    ensureHomepageHeroPreload();
    return () => {
      cleanupHomepageHeroPreload();
    };
  }, []);

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthModalState({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <main className="crm-command-center wc-landing-portal" data-testid="crm-command-center">
      {/* ─── Top Header Bar ─── */}
      <header className="crm-command-center__header wc-landing-header">
        <div className="crm-command-center__brand">
          <Building2 size={32} className="wc-brand-icon" />
          <div>
            <h1>White Caves Real Estate</h1>
            <p>Dubai Sovereign Prop-Tech Portal &bull; Enterprise Portal &amp; Client Gateway</p>
          </div>
        </div>
        <div className="crm-command-center__actions">
          <button
            type="button"
            className="wc-btn-primary"
            onClick={() => openAuthModal('signin')}
            data-testid="header-signin-btn"
          >
            <ShieldCheck size={18} />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            className="wc-btn-secondary"
            onClick={() => openAuthModal('signup')}
            data-testid="header-signup-btn"
          >
            <UserPlus size={18} />
            <span>Create Account</span>
          </button>
        </div>
      </header>

      {/* ─── Welcome Hero & Auth Gateway ─── */}
      <section className="wc-welcome-hero" aria-label="Welcome and Authentication Gateway">
        <div className="wc-welcome-card">
          <div className="wc-welcome-badge">
            <Sparkles size={16} />
            <span>Sovereign Real Estate Ecosystem</span>
          </div>
          <h2 className="wc-welcome-title">Welcome to White Caves</h2>
          <p className="wc-welcome-subtitle">
            Access your personal portal, institutional property intelligence, and secure transaction
            hub. Sign in to manage your properties, investments, and enterprise operations.
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
              <button
                type="button"
                className="wc-flow-cta"
                onClick={() => openAuthModal('signin')}
                data-testid="gateway-signin-cta"
              >
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
                onClick={() => openAuthModal('signup')}
                data-testid="gateway-signup-cta"
              >
                <span>Sign Up</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Property Teaser — Redirects to whitecaves.ae ─── */}
      <section
        className="wc-property-teaser-section"
        aria-label="Explore Properties on whitecaves.ae"
        data-testid="wc-property-teaser-section"
      >
        <div className="wc-teaser-header">
          <span className="wc-search-section-badge">Live Inventory</span>
          <h3 className="wc-teaser-title">Explore Dubai Prime Residences</h3>
          <p className="wc-teaser-sub">
            Browse verified luxury villas, penthouses, and off-plan investments on our public
            portal.
          </p>
        </div>

        <div className="wc-teaser-cards" data-testid="wc-teaser-cards">
          {PROPERTY_TEASERS.map(prop => (
            <a
              key={prop.title}
              href={`${WC_PUBLIC_SITE}/properties`}
              target="_blank"
              rel="noopener noreferrer"
              className="wc-teaser-card"
              data-testid="wc-teaser-card"
            >
              <div className="wc-teaser-card__type">{prop.type}</div>
              <h4 className="wc-teaser-card__title">{prop.title}</h4>
              <div className="wc-teaser-card__location">
                <MapPin size={13} />
                <span>{prop.location}</span>
              </div>
              <div className="wc-teaser-card__price">{prop.priceLabel}</div>
            </a>
          ))}
        </div>

        <div className="wc-teaser-browse-cta">
          <a
            href={`${WC_PUBLIC_SITE}/properties`}
            target="_blank"
            rel="noopener noreferrer"
            className="wc-browse-all-btn"
            data-testid="wc-browse-all-btn"
          >
            <span>Browse All Properties on whitecaves.ae</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </section>

      {/* ─── Auth Modal ─── */}
      <LandingAuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={closeAuthModal}
      />
    </main>
  );
};

export default HomePage;
