import React from 'react';
import { Home, DollarSign, Calendar, Phone, Mail } from 'lucide-react';
import { RENTAL_INQUIRIES, MAINTENANCE_REQUESTS } from './DaisyLeasingCRM.data';

export const DaisyInquiriesView: React.FC = () => {
  return (
    <div className="inquiries-view">
      <h3>Rental Inquiries</h3>
      <div className="inquiry-cards">
        {RENTAL_INQUIRIES.map(inquiry => (
          <div key={inquiry.id} className="inquiry-card">
            <div className="inquiry-header">
              <h4>{inquiry.name}</h4>
              <span className={`status-badge ${inquiry.status}`}>
                {inquiry.status.replace('_', ' ')}
              </span>
            </div>
            <div className="inquiry-details">
              <span>
                <Home size={14} /> {inquiry.property}
              </span>
              <span>
                <DollarSign size={14} /> {inquiry.budget} AED/year
              </span>
              <span>
                <Calendar size={14} /> {inquiry.date}
              </span>
            </div>
            <div className="inquiry-actions">
              <button>
                <Phone size={14} /> Call
              </button>
              <button>
                <Mail size={14} /> Email
              </button>
              <button>
                <Calendar size={14} /> Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DaisyMaintenanceView: React.FC = () => {
  return (
    <div className="maintenance-view">
      <h3>Maintenance Requests</h3>
      <div className="maintenance-list">
        {MAINTENANCE_REQUESTS.map(request => (
          <div key={request.id} className={`maintenance-card ${request.priority}`}>
            <div className="maintenance-header">
              <span className="unit">{request.unit}</span>
              <span className={`priority-badge ${request.priority}`}>{request.priority}</span>
            </div>
            <p className="issue">{request.issue}</p>
            <div className="maintenance-footer">
              <span className={`status ${request.status}`}>
                {request.status.replace('_', ' ')}
              </span>
              <span className="date">{request.created}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

