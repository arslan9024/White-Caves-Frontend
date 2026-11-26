import React from 'react';

interface QrTabProps {
  qrCode?: string | null;
}

export const WhatsAppQrTab: React.FC<QrTabProps> = ({ qrCode }) => {
  return (
    <div className="settings-section">
      <h3>QR Code Scanner</h3>
      <div className="qr-panel">
        {qrCode ? (
          <div className="qr-container">
            <img
              src={qrCode}
              alt="WhatsApp QR Code"
              className="qr-code-image"
              loading="lazy"
              width={200}
              height={200}
            />
            <p className="qr-instructions">
              1. Open WhatsApp on your phone
              <br />
              2. Go to Settings → Linked Devices
              <br />
              3. Scan this QR code with your phone
            </p>
          </div>
        ) : (
          <div className="qr-placeholder">
            <p>No QR code available yet.</p>
            <p className="muted">Initialize the connection to generate QR code.</p>
          </div>
        )}
      </div>
    </div>
  );
};
