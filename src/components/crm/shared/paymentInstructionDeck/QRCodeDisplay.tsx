import { memo } from 'react';
import { Copy } from 'lucide-react';
import { QRCodeDisplayProps } from './types';

export const QRCodeDisplay = memo(({ amount, reference, onCopy }: QRCodeDisplayProps) => {
  const displayAmount = amount != null ? `AED ${amount.toLocaleString()}` : 'Amount pending';
  const paymentInfo = `Merchant: WHITE CAVES REAL ESTATE L.L.C\nAmount: ${displayAmount}\nReference: ${reference}\nPayment Method: Aani - Scan with enabled bank apps`;

  return (
    <div className="qr-code-container">
      <div className="qr-code-wrapper">
        <div className="qr-merchant-name">
          <span className="merchant-label">Merchant name</span>
          <h4>WHITE CAVES REAL ESTATE L.L.C</h4>
        </div>
        <img
          src="/images/aani-qr-code.png"
          alt="Aani QR Code - WHITE CAVES REAL ESTATE L.L.C"
          className="aani-qr-image"
          loading="lazy"
          width={200}
          height={200}
        />
        <p className="qr-instruction">Scan and pay using Aani enabled bank apps</p>
      </div>
      <div className="qr-details">
        <p className="qr-amount">
          Amount: <strong>{displayAmount}</strong>
        </p>
        <p className="qr-reference">
          Reference: <strong>{reference}</strong>
        </p>
        <button className="copy-btn" onClick={() => onCopy(paymentInfo)}>
          <Copy size={14} /> Copy Payment Info
        </button>
      </div>
    </div>
  );
});

QRCodeDisplay.displayName = 'QRCodeDisplay';
