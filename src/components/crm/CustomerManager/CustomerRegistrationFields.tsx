import React, { FC } from 'react';
import { CustomerType, LeadSource } from './CustomerManager.types';
import { lblStyle as lbl, inpStyle as inp, gridRowStyle } from './CustomerRegistrationDrawer.styles';

export interface CustomerRegistrationFieldsProps {
  fullName: string;
  setFullName: (val: string) => void;
  customerCode: string;
  setCustomerCode: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  customerType: CustomerType;
  setCustomerType: (val: CustomerType) => void;
  preferredCommunity: string;
  setPreferredCommunity: (val: string) => void;
  budgetAED: number;
  setBudgetAED: (val: number) => void;
  assignedAgentName: string;
  setAssignedAgentName: (val: string) => void;
  source: LeadSource;
  setSource: (val: LeadSource) => void;
}

export const CustomerRegistrationFields: FC<CustomerRegistrationFieldsProps> = ({
  fullName,
  setFullName,
  customerCode,
  setCustomerCode,
  email,
  setEmail,
  phone,
  setPhone,
  customerType,
  setCustomerType,
  preferredCommunity,
  setPreferredCommunity,
  budgetAED,
  setBudgetAED,
  assignedAgentName,
  setAssignedAgentName,
  source,
  setSource,
}) => {
  return (
    <>
      <div>
        <label style={lbl}>Full Legal Name *</label>
        <input
          type="text"
          required
          data-testid="customer-name-input"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="e.g. Fatima Al-Mansoor"
          style={inp}
        />
      </div>

      <div>
        <label style={lbl}>Client ID Code</label>
        <input
          type="text"
          data-testid="customer-code-input"
          value={customerCode}
          onChange={e => setCustomerCode(e.target.value)}
          placeholder="Leave blank for auto-code"
          style={inp}
        />
      </div>

      <div style={gridRowStyle}>
        <div>
          <label style={lbl}>Email *</label>
          <input
            type="email"
            required
            data-testid="customer-email-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="client@whitecaves.ae"
            style={inp}
          />
        </div>
        <div>
          <label style={lbl}>Phone Number</label>
          <input
            type="text"
            data-testid="customer-phone-input"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+971 50 123 4567"
            style={inp}
          />
        </div>
      </div>

      <div style={gridRowStyle}>
        <div>
          <label style={lbl}>Customer Type</label>
          <select
            value={customerType}
            onChange={e => setCustomerType(e.target.value as CustomerType)}
            style={inp}
          >
            <option value="LEAD">LEAD</option>
            <option value="BUYER">BUYER</option>
            <option value="TENANT">TENANT</option>
            <option value="LANDLORD">LANDLORD</option>
            <option value="INVESTOR">INVESTOR</option>
          </select>
        </div>
        <div>
          <label style={lbl}>Lead Source</label>
          <select
            value={source}
            onChange={e => setSource(e.target.value as LeadSource)}
            style={inp}
          >
            <option value="PROPERTY_FINDER">Property Finder</option>
            <option value="BAYUT">Bayut</option>
            <option value="DUBIZZLE">Dubizzle</option>
            <option value="REFERRAL">Referral</option>
            <option value="WHATSAPP">WhatsApp</option>
            <option value="DIRECT">Direct</option>
          </select>
        </div>
      </div>

      <div style={gridRowStyle}>
        <div>
          <label style={lbl}>Preferred Community</label>
          <input
            type="text"
            value={preferredCommunity}
            onChange={e => setPreferredCommunity(e.target.value)}
            style={inp}
          />
        </div>
        <div>
          <label style={lbl}>Budget (AED)</label>
          <input
            type="number"
            value={budgetAED}
            onChange={e => setBudgetAED(Number(e.target.value))}
            style={inp}
          />
        </div>
      </div>

      <div>
        <label style={lbl}>Assigned Consultant</label>
        <input
          type="text"
          value={assignedAgentName}
          onChange={e => setAssignedAgentName(e.target.value)}
          style={inp}
        />
      </div>
    </>
  );
};
