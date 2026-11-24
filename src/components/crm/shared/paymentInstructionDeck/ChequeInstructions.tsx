import { memo } from 'react';
import { ChequeInstructionsProps } from './types';
import { BANK_DETAILS } from './constants';

export const ChequeInstructions = memo(
  ({ amount, reference, payeeName }: ChequeInstructionsProps) => (
    <div className="cheque-instructions">
      <div className="instruction-card">
        <h4>Cheque Payment Instructions</h4>
        <ol className="instruction-list">
          <li>
            Make the cheque payable to: <strong>{payeeName || BANK_DETAILS.accountName}</strong>
          </li>
          <li>
            Amount:{' '}
            <strong>{amount != null ? `AED ${amount.toLocaleString()}` : 'Amount pending'}</strong>{' '}
            (in words on the cheque)
          </li>
          <li>
            Write reference number on the back: <strong>{reference}</strong>
          </li>
          <li>Cross the cheque with &quot;Account Payee Only&quot;</li>
          <li>Date the cheque with today&apos;s date or post-dated as agreed</li>
        </ol>
        <div className="warning-note">
          <strong>Important:</strong> Please ensure the cheque is signed by authorized signatories.
        </div>
      </div>
      <div className="delivery-info">
        <h5>Cheque Delivery Options:</h5>
        <ul>
          <li>Hand delivery to our office (Business Bay)</li>
          <li>Courier to: White Caves Real Estate, Bay Square, Building 12, Dubai</li>
          <li>Bank deposit directly to our account</li>
        </ul>
      </div>
    </div>
  )
);

ChequeInstructions.displayName = 'ChequeInstructions';
