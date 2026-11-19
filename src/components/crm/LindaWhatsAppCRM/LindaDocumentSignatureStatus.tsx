import React, { memo } from 'react';
import { FileCheck, Clock } from 'lucide-react';

export const LindaDocumentSignatureStatus: React.FC<{ signed?: boolean }> = memo(
  ({ signed = false }) => (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '10px',
        color: signed ? '#25D366' : '#FFA500',
      }}
    >
      {signed ? <FileCheck size={12} /> : <Clock size={12} />}
      <span>Form F (MoU): {signed ? 'Signed via UAE PASS' : 'Pending Signature'}</span>
    </div>
  )
);
export default LindaDocumentSignatureStatus;
