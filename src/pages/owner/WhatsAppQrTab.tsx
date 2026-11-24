import React from 'react';
import QRCode from 'qrcode.react';

interface QrTabProps {
  qrCode: string | null;
  loading: boolean;
  status: any;
  handleRefreshQr: () => void;
}

export const WhatsAppQrTab: React.FC<QrTabProps> = ({
  qrCode,
  loading,
  status,
  handleRefreshQr,
}) => {
  return (
    <div>
        {/* QR CODE TAB */}
        {activeTab === 'qr' && (
          <div className="settings-section">
            <h3>QR Code Scanner</h3>
            <div className="qr-panel">
              {whatsappState.qrCode ? (
                <div className="qr-container">
                  <img 
                    src={whatsappState.qrCode} 
                    alt="WhatsApp QR Code"
                    className="qr-code-image"
                    loading="lazy"
                    width={200}
                    height={200}
                  />
                  <p className="qr-instructions">
                    1. Open WhatsApp on your phone<br/>
                    2. Go to Settings → Linked Devices<br/>
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
        )}

    </div>
  );
};
