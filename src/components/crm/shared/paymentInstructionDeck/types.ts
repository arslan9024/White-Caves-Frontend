import { LucideIcon } from 'lucide-react';

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  iban: string;
  swiftCode: string;
  routingCode: string;
  accountType: string;
  branch: string;
  currency: string;
}

export interface PaymentMethodConfig {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

export interface QRCodeDisplayProps {
  amount?: number;
  reference: string;
  onCopy: (text: string, field?: string) => void;
}

export interface ChequeInstructionsProps {
  amount?: number;
  reference: string;
  payeeName?: string;
}

export interface BankTransferDetailsProps {
  amount?: number;
  reference: string;
  onCopy: (text: string, field?: string) => void;
  copied: string | null;
}

export interface PaymentMethodSelectorProps {
  selected: string;
  onSelect: (method: string) => void;
}

export interface PaymentInstructionDeckProps {
  amount?: number;
  reference?: string;
  clientName?: string;
  invoiceId?: string;
  onGenerateMessage?: (message: string, method: string) => void;
  showMethodSelector?: boolean;
}
