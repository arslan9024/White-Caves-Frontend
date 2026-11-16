import React from 'react';
import { TenancyAgreement, AgreementSignature } from './TenancyAgreementSigning.types';

export const getStatusBadge = (agreement: TenancyAgreement) => {
  if (agreement.status === 'REJECTED') {
    return <span className="status-badge rejected">✗ Rejected</span>;
  } else if (agreement.status === 'FULLY_SIGNED') {
    return <span className="status-badge fully-signed">✓ Fully Signed</span>;
  } else if (agreement.status === 'PARTIALLY_SIGNED') {
    return <span className="status-badge partially-signed">⚠ Partially Signed</span>;
  } else {
    return <span className="status-badge pending">⏳ Pending Signatures</span>;
  }
};

export const getSignatureStatus = (signature: AgreementSignature) => {
  if (signature.status === 'REJECTED') {
    return <span className="sig-status rejected">✗ Rejected</span>;
  } else if (signature.status === 'SIGNED' || signature.signed) {
    return <span className="sig-status signed">✓ Signed</span>;
  } else {
    return <span className="sig-status pending">⏳ Pending</span>;
  }
};

