import { Config } from '../../../config/constants';
import type { PropertyData } from './PropertyDetailModal.types';

export function openWhatsAppContact(property: PropertyData): void {
  const message = `Hi, I'm interested in the property: ${property.title} in ${property.location}`;
  window.open(
    `https://wa.me/${Config.COMPANY.WHATSAPP}?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer'
  );
}

export function openPhoneContact(): void {
  window.open(`tel:${Config.COMPANY.PHONE.replace(/\s/g, '')}`, '_self');
}

export function openEmailInquiry(property: PropertyData): void {
  const subject = `Inquiry: ${property.title}`;
  const body = `Hi,\n\nI'm interested in the property: ${property.title} located in ${property.location}.\n\nPlease contact me with more details.\n\nThank you.`;
  window.open(
    `mailto:${Config.COMPANY.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    '_self'
  );
}

export function shareProperty(property: PropertyData): void {
  if (typeof navigator !== 'undefined' && navigator.share) {
    navigator.share({ title: property.title, url: window.location.href }).catch(() => {});
  } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
    alert('Listing link copied to clipboard!');
  }
}
