import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Lock, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface LandingAuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
}

export const LandingAuthModal: React.FC<LandingAuthModalProps> = ({
  isOpen,
  initialMode = 'signin',
  onClose,
}) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signin') {
      navigate('/signin');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="wc-modal-backdrop" onClick={onClose} data-testid="wc-landing-auth-modal">
      <div
        className="wc-modal-card"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          className="wc-modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="wc-modal-header">
          <div className="wc-modal-icon-badge">
            <ShieldCheck size={26} color="#EF4444" />
          </div>
          <h3 id="modal-title" className="wc-modal-title">
            {mode === 'signin' ? 'Sign In to White Caves' : 'Register Sovereign Account'}
          </h3>
          <p className="wc-modal-desc">
            {mode === 'signin'
              ? 'Institutional access to luxury portfolio & transactions'
              : 'Join Dubai’s premier luxury real estate ecosystem'}
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="wc-modal-mode-tabs">
          <button
            type="button"
            className={`wc-modal-tab ${mode === 'signin' ? 'wc-modal-tab--active' : ''}`}
            onClick={() => setMode('signin')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`wc-modal-tab ${mode === 'signup' ? 'wc-modal-tab--active' : ''}`}
            onClick={() => setMode('signup')}
          >
            Create Account
          </button>
        </div>

        {/* Auth method selection */}
        <div className="wc-modal-method-toggle">
          <button
            type="button"
            className={`wc-method-btn ${authMethod === 'email' ? 'wc-method-btn--active' : ''}`}
            onClick={() => setAuthMethod('email')}
          >
            <Mail size={14} />
            <span>Email</span>
          </button>
          <button
            type="button"
            className={`wc-method-btn ${authMethod === 'phone' ? 'wc-method-btn--active' : ''}`}
            onClick={() => setAuthMethod('phone')}
          >
            <Phone size={14} />
            <span>Phone SMS</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="wc-modal-form">
          {authMethod === 'email' ? (
            <>
              <div className="wc-modal-field">
                <label htmlFor="modal-email">Email Address</label>
                <div className="wc-input-with-icon">
                  <Mail size={16} />
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="name@domain.ae"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="wc-modal-field">
                <label htmlFor="modal-pass">Password</label>
                <div className="wc-input-with-icon">
                  <Lock size={16} />
                  <input
                    id="modal-pass"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="wc-modal-field">
              <label htmlFor="modal-phone">Phone Number</label>
              <div className="wc-input-with-icon">
                <Phone size={16} />
                <input
                  id="modal-phone"
                  type="tel"
                  required
                  placeholder="+971 50 000 0000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </div>
          )}

          <button type="submit" className="wc-modal-submit-btn">
            {mode === 'signin' ? 'Access Portal' : 'Register Now'}
          </button>
        </form>

        <div className="wc-modal-footer">
          <span className="wc-modal-footer-text">
            Prefer direct full-page gateway?{' '}
            <button
              type="button"
              className="wc-modal-link"
              onClick={() => navigate(mode === 'signin' ? '/signin' : '/signup')}
            >
              Open {mode === 'signin' ? 'SignIn' : 'SignUp'} Page
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};
