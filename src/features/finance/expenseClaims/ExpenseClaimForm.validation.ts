import {
  EXPENSE_CATEGORIES,
  MAX_LINE_ITEMS,
  type ExpenseClaimFormErrors,
  type ExpenseClaimFormValues,
  type ExpenseClaimLineItem,
} from './ExpenseClaimForm.types';

let idCounter = 0;

function createLineItemId(): string {
  idCounter += 1;
  return `line-item-${Date.now()}-${idCounter}`;
}

export function createEmptyLineItem(): ExpenseClaimLineItem {
  return {
    id: createLineItemId(),
    description: '',
    category: 'other',
    amount: 0,
    incurredOn: '',
  };
}

function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
}

/**
 * Validates the given expense claim form values.
 * Returns an errors object; a claim is valid when every field is `undefined`
 * and `lineItemErrors` is empty.
 */
export function validateExpenseClaim(values: ExpenseClaimFormValues): ExpenseClaimFormErrors {
  const errors: ExpenseClaimFormErrors = { lineItemErrors: {} };

  if (!values.claimantName.trim()) {
    errors.claimantName = 'Claimant name is required.';
  }

  if (!values.department.trim()) {
    errors.department = 'Department is required.';
  }

  if (values.lineItems.length === 0) {
    errors.lineItems = 'At least one expense line item is required.';
  } else if (values.lineItems.length > MAX_LINE_ITEMS) {
    errors.lineItems = `A claim cannot contain more than ${MAX_LINE_ITEMS} line items.`;
  }

  for (const item of values.lineItems) {
    const itemErrors: Partial<Record<keyof ExpenseClaimLineItem, string>> = {};

    if (!item.description.trim()) {
      itemErrors.description = 'Description is required.';
    }

    if (!EXPENSE_CATEGORIES.includes(item.category)) {
      itemErrors.category = 'Select a valid category.';
    }

    if (!Number.isFinite(item.amount) || item.amount <= 0) {
      itemErrors.amount = 'Amount must be a positive number.';
    }

    if (!item.incurredOn || !isValidIsoDate(item.incurredOn)) {
      itemErrors.incurredOn = 'Enter a valid date (YYYY-MM-DD).';
    }

    if (Object.keys(itemErrors).length > 0) {
      errors.lineItemErrors[item.id] = itemErrors;
    }
  }

  return errors;
}

export function hasExpenseClaimErrors(errors: ExpenseClaimFormErrors): boolean {
  return Boolean(
    errors.claimantName ||
    errors.department ||
    errors.lineItems ||
    Object.keys(errors.lineItemErrors).length > 0
  );
}

export function calculateExpenseClaimTotal(lineItems: readonly ExpenseClaimLineItem[]): number {
  return lineItems.reduce((sum, item) => {
    const amount = Number.isFinite(item.amount) ? item.amount : 0;
    return sum + amount;
  }, 0);
}

export function buildInitialValues(
  initialValues?: Partial<ExpenseClaimFormValues>
): ExpenseClaimFormValues {
  return {
    claimantName: initialValues?.claimantName ?? '',
    department: initialValues?.department ?? '',
    notes: initialValues?.notes ?? '',
    lineItems:
      initialValues?.lineItems && initialValues.lineItems.length > 0
        ? initialValues.lineItems
        : [createEmptyLineItem()],
  };
}

