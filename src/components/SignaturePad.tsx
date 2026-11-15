import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export interface SignaturePadProps {
  onSave?: (data: {
    signature: string;
    signerName: string;
    signerRole: string;
    timestamp: string;
  }) => void;
  onCancel?: () => void;
  onSignatureChange?: (data: { signature: string } | null) => void;
  signerName?: string;
  signerRole?: string;
  disabled?: boolean;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  onSave,
  onCancel,
  onSignatureChange,
  signerName = 'Signer',
  signerRole = 'Party',
  disabled = false,
}) => {
  const sigCanvas = useRef<any>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClear = () => {
    if (disabled) return;
    sigCanvas.current?.clear();
    setIsEmpty(true);
    if (onSignatureChange) onSignatureChange(null);
  };

  const handleSave = () => {
    if (isEmpty || disabled) return;
    const signatureData = sigCanvas.current?.getTrimmedCanvas()?.toDataURL('image/png') || '';
    if (onSave) {
      onSave({
        signature: signatureData,
        signerName,
        signerRole,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handleEnd = () => {
    const empty = sigCanvas.current?.isEmpty() ?? true;
    setIsEmpty(empty);
    if (onSignatureChange && !empty) {
      const signatureData = sigCanvas.current?.getTrimmedCanvas()?.toDataURL('image/png') || '';
      onSignatureChange({ signature: signatureData });
    }
  };

  return (
    <div className="signature-pad-container" style={{ padding: 16 }}>
      <div className="signature-pad-header" style={{ marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>Digital Signature</h3>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-secondary, #64748b)' }}>
          Sign as: <strong>{signerName}</strong> ({signerRole})
        </p>
      </div>

      <div
        className="signature-canvas-wrapper"
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: 8,
          background: '#ffffff',
          overflow: 'hidden',
          marginBottom: 12,
        }}
      >
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: 'signature-canvas',
            style: { width: '100%', height: 180, display: 'block' },
          }}
          onEnd={handleEnd}
          penColor="#0a0a0f"
          backgroundColor="rgba(255, 255, 255, 1)"
        />
        <div
          className="signature-line"
          style={{
            borderTop: '1px dashed #cbd5e1',
            padding: '4px 8px',
            textAlign: 'center',
            fontSize: 11,
            color: '#94a3b8',
          }}
        >
          <span>Sign above this line</span>
        </div>
      </div>

      <div
        className="signature-actions"
        style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginBottom: 8 }}
      >
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClear}
          disabled={disabled}
        >
          Clear
        </button>
        {onCancel && (
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={disabled}>
            Cancel
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isEmpty || disabled}
        >
          Apply Signature
        </button>
      </div>

      <p
        className="signature-disclaimer"
        style={{ margin: 0, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}
      >
        By signing, I confirm that I am the authorized signatory and agree to the terms of this
        contract.
      </p>
    </div>
  );
};

export default SignaturePad;
