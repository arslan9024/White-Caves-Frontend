import { memo } from 'react';
import { Building2, Copy, Check } from 'lucide-react';
import { BankTransferDetailsProps } from './types';
import { BANK_DETAILS } from './constants';

export const BankTransferDetails = memo(
  ({ amount, reference, onCopy, copied }: BankTransferDetailsProps) => (
    <div className="bank-transfer-details">
      <div className="bank-header">
        <Building2 size={24} />
        <div>
          <h4>{BANK_DETAILS.bankName}</h4>
          <p>{BANK_DETAILS.branch}</p>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-row">
          <span className="detail-label">Account Holder Name</span>
          <span className="detail-value">{BANK_DETAILS.accountName}</span>
          <button
            className="copy-icon"
            onClick={() => onCopy(BANK_DETAILS.accountName, 'accountName')}
            aria-label="Copy account holder name"
          >
            {copied === 'accountName' ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        <div className="detail-row">
          <span className="detail-label">Account Number</span>
          <span className="detail-value">{BANK_DETAILS.accountNumber}</span>
          <button
            className="copy-icon"
            onClick={() => onCopy(BANK_DETAILS.accountNumber, 'accountNumber')}
            aria-label="Copy account number"
          >
            {copied === 'accountNumber' ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        <div className="detail-row">
          <span className="detail-label">IBAN</span>
          <span className="detail-value">{BANK_DETAILS.iban}</span>
          <button
            className="copy-icon"
            onClick={() => onCopy(BANK_DETAILS.iban, 'iban')}
            aria-label="Copy IBAN"
          >
            {copied === 'iban' ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        <div className="detail-row">
          <span className="detail-label">Account Type</span>
          <span className="detail-value">{BANK_DETAILS.accountType}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Routing Code</span>
          <span className="detail-value">{BANK_DETAILS.routingCode}</span>
          <button
            className="copy-icon"
            onClick={() => onCopy(BANK_DETAILS.routingCode, 'routing')}
            aria-label="Copy routing code"
          >
            {copied === 'routing' ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        <div className="detail-row">
          <span className="detail-label">SWIFT Code</span>
          <span className="detail-value">{BANK_DETAILS.swiftCode}</span>
          <button
            className="copy-icon"
            onClick={() => onCopy(BANK_DETAILS.swiftCode, 'swift')}
            aria-label="Copy SWIFT code"
          >
            {copied === 'swift' ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        <div className="detail-row">
          <span className="detail-label">Currency</span>
          <span className="detail-value">{BANK_DETAILS.currency}</span>
        </div>
        <div className="detail-row highlight">
          <span className="detail-label">Amount</span>
          <span className="detail-value">
            {amount != null ? `AED ${amount.toLocaleString()}` : 'Amount pending'}
          </span>
        </div>
        <div className="detail-row highlight">
          <span className="detail-label">Reference</span>
          <span className="detail-value">{reference}</span>
          <button
            className="copy-icon"
            onClick={() => onCopy(reference, 'reference')}
            aria-label="Copy payment reference"
          >
            {copied === 'reference' ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      <div className="transfer-note">
        Please include the reference number in your transfer description for faster processing.
      </div>
    </div>
  )
);

BankTransferDetails.displayName = 'BankTransferDetails';
