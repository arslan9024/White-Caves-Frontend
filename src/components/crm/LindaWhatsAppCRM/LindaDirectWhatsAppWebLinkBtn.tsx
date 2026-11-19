import React, { memo } from 'react';
import { ExternalLink } from 'lucide-react';

export const LindaDirectWhatsAppWebLinkBtn: React.FC<{ phone: string }> = memo(({ phone }) => (
  <a
    href={`https://web.whatsapp.com/send?phone=${phone.replace(/\D/g, '')}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3px',
      textDecoration: 'none',
      color: '#25D366',
      fontSize: '10px',
    }}
  >
    <span>Open Native Web</span>
    <ExternalLink size={10} />
  </a>
));
export default LindaDirectWhatsAppWebLinkBtn;
