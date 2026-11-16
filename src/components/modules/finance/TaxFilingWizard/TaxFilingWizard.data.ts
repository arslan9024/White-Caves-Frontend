import { WizardStep, TaxFilingFormData } from './TaxFilingWizard.types';

export const TAX_WIZARD_STEPS: WizardStep[] = [
  { number: 1, title: 'Basic Info', icon: '👤' },
  { number: 2, title: 'Revenue & Expenses', icon: '💰' },
  { number: 3, title: 'Review', icon: '✓' },
  { number: 4, title: 'Documents', icon: '📄' },
  { number: 5, title: 'Submit', icon: '✈️' },
];

export const INITIAL_FORM_DATA: TaxFilingFormData = {
  firstName: '',
  lastName: '',
  taxId: '',
  businessName: '',
  totalRevenue: '',
  grossProfit: '',
  totalExpenses: '',
  deductibleExpenses: '',
  documents: [],
  agreement: false,
};

