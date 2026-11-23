import React from 'react';
import { MessageCircle, Phone, Mail, Heart, Share2 } from 'lucide-react';
import type { PropertyData, ViewingStatus } from './PropertyDetailModal.types';
import { TIME_SLOTS } from './PropertyDetailModal.constants';

export interface PropertyDetailSidebarProps {
  property: PropertyData;
  isFavorite?: boolean;
  onFavorite?: () => void;
  onWhatsApp: () => void;
  onCall: () => void;
  onEmail: () => void;
  onShare: () => void;
  viewingDate: string;
  setViewingDate: (date: string) => void;
  viewingTime: string;
  setViewingTime: (time: string) => void;
  viewingStatus: ViewingStatus;
  viewingError: string;
  onRequestViewing: () => void;
  onResetViewing: () => void;
}

export function PropertyDetailSidebar({
  property: _property,
  isFavorite,
  onFavorite,
  onWhatsApp,
  onCall,
  onEmail,
  onShare,
  viewingDate,
  setViewingDate,
  viewingTime,
  setViewingTime,
  viewingStatus,
  viewingError,
  onRequestViewing,
  onResetViewing,
}: PropertyDetailSidebarProps): React.ReactElement {
  return (
    <div className="content-sidebar">
      <div className="contact-card">
        <h3>Interested in this property?</h3>
        <p>Contact our team for more information or to schedule a viewing.</p>

        <div className="contact-buttons">
          <button className="contact-btn whatsapp" onClick={onWhatsApp}>
            <MessageCircle size={18} />
            WhatsApp
          </button>
          <button className="contact-btn call" onClick={onCall}>
            <Phone size={18} />
            Call Now
          </button>
          <button className="contact-btn email" onClick={onEmail}>
            <Mail size={18} />
            Email
          </button>
        </div>

        <div className="action-buttons">
          <button className={`action-btn ${isFavorite ? 'active' : ''}`} onClick={onFavorite}>
            <Heart size={18} fill={isFavorite ? '#ef4444' : 'none'} />
            {isFavorite ? 'Saved' : 'Save'}
          </button>
          <button className="action-btn" onClick={onShare}>
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      <div className="agent-card">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Agent"
          className="agent-avatar"
          loading="lazy"
          width={48}
          height={48}
        />
        <div className="agent-info">
          <h4>Mohammed Al Rashid</h4>
          <p>Senior Property Consultant</p>
          <div className="agent-stats">
            <span>50+ Properties</span>
            <span>120+ Deals</span>
          </div>
        </div>
      </div>

      <div className="schedule-card">
        <h4>Schedule a Viewing</h4>

        {viewingStatus === 'success' ? (
          <div className="viewing-success" role="status">
            <p className="viewing-success-msg">
              ✅ Viewing request submitted! Our team will confirm within 24&nbsp;hours.
            </p>
            <button
              className="schedule-btn"
              style={{ marginTop: '0.75rem' }}
              onClick={onResetViewing}
            >
              Book Another Viewing
            </button>
          </div>
        ) : (
          <>
            <label htmlFor="viewing-date" className="sr-only">
              Preferred date
            </label>
            <input
              id="viewing-date"
              type="date"
              className="date-input"
              aria-required="true"
              min={new Date().toISOString().split('T')[0]}
              value={viewingDate}
              onChange={e => setViewingDate(e.target.value)}
            />
            <label htmlFor="viewing-time" className="sr-only">
              Preferred time
            </label>
            <select
              id="viewing-time"
              className="time-select"
              aria-required="true"
              value={viewingTime}
              onChange={e => setViewingTime(e.target.value)}
            >
              <option value="">Select preferred time</option>
              {TIME_SLOTS.map(s => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            {viewingError && (
              <p className="viewing-error" role="alert">
                {viewingError}
              </p>
            )}

            <button
              className="schedule-btn"
              onClick={onRequestViewing}
              disabled={viewingStatus === 'submitting'}
              aria-busy={viewingStatus === 'submitting'}
            >
              {viewingStatus === 'submitting' ? 'Submitting…' : 'Request Viewing'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
