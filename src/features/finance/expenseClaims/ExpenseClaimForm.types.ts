/**
 * Supported expense categories for a claim line item.
 */
export type ExpenseCategory =
  'travel' | 'accommodation' | 'meals' | 'supplies' | 'software' | 'other';

export const EXPENSE_CATEGORIES: readonly ExpenseCategory[] = [
  'travel',
  'accommodation',
  'meals',
  'supplies',
  'software',
  'other',
];

/**
 * A single line item within an expense claim.
 */
export interface ExpenseClaimLineItem {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  incurredOn: string; // ISO date string (YYYY-MM-DD)
}

/**
 * The full payload submitted when a user creates/updates an expense claim.
 */
export interface ExpenseClaimFormValues {
  claimantName: string;
  department: string;
  notes: string;
  lineItems: ExpenseClaimLineItem[];
}

export interface ExpenseClaimFormErrors {
  claimantName?: string;
  department?: string;
  lineItems?: string;
  lineItemErrors: Record<string, Partial<Record<keyof ExpenseClaimLineItem, string>>>;
}

export interface ExpenseClaimFormProps {
  /** Initial values used to prefill the form (e.g. when editing a draft claim). */
  initialValues?: Partial<ExpenseClaimFormValues>;
  /** Called with the validated, normalized form values on successful submit. */
  onSubmit: (values: ExpenseClaimFormValues) => void;
  /** Called when the user cancels editing. */
  onCancel?: () => void;
  /** Disables all inputs and hides submit/cancel actions while true. */
  isSubmitting?: boolean;
}

export const MAX_NOTES_LENGTH = 1000;
export const MAX_LINE_ITEMS = 50;

