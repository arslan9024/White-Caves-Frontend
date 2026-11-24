import { FileText, Building2, QrCode } from 'lucide-react';
import { BankDetails, PaymentMethodConfig } from './types';

// Bank details loaded from env vars at build time (not in source control).
// In production, serve via authenticated API: GET /api/payment/bank-details
export const loadBankDetails = (): BankDetails => ({
  bankName: import.meta.env.VITE_BANK_NAME || 'Contact office for details',
  accountName: import.meta.env.VITE_BANK_ACCOUNT_NAME || 'WHITE CAVES REAL ESTATE L.L.C',
  accountNumber: import.meta.env.VITE_BANK_ACCOUNT_NUMBER || 'Provided upon invoice request',
  iban: import.meta.env.VITE_BANK_IBAN || 'Provided upon invoice request',
  swiftCode: import.meta.env.VITE_BANK_SWIFT || 'MSHQAEADXXX',
  routingCode: import.meta.env.VITE_BANK_ROUTING || 'Provided upon invoice request',
  accountType: import.meta.env.VITE_BANK_ACCOUNT_TYPE || 'Corporate Business',
  branch: import.meta.env.VITE_BANK_BRANCH || 'Mashreq NEOBiz Digital',
  currency: 'AED',
});

export const PAYMENT_METHODS: Record<string, PaymentMethodConfig> = {
  qr: {
    id: 'qr',
    name: 'QR Code Payment',
    icon: QrCode,
    description: 'Scan to pay instantly',
  },
  cheque: {
    id: 'cheque',
    name: 'Cheque Payment',
    icon: FileText,
    description: 'Bank cheque instructions',
  },
  transfer: {
    id: 'transfer',
    name: 'Bank Transfer',
    icon: Building2,
    description: 'Direct bank transfer',
  },
};

// Bank details loaded from env vars (no hardcoded secrets in source)
export const BANK_DETAILS: BankDetails = loadBankDetails();
