export interface TaxFilingFormData {
  firstName: string;
  lastName: string;
  taxId: string;
  businessName: string;
  totalRevenue: string;
  grossProfit: string;
  totalExpenses: string;
  deductibleExpenses: string;
  documents: File[];
  agreement: boolean;
}

export interface TaxFilingWizardProps {
  onSubmit?: (data: TaxFilingFormData) => void;
  onCancel?: () => void;
}

export interface WizardStep {
  number: number;
  title: string;
  icon: string;
}

export type FormErrors = Partial<Record<keyof TaxFilingFormData, string>>;
