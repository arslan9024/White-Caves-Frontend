import React, { useCallback, useMemo, useState } from 'react';
import {
  EXPENSE_CATEGORIES,
  MAX_LINE_ITEMS,
  MAX_NOTES_LENGTH,
  type ExpenseCategory,
  type ExpenseClaimFormErrors,
  type ExpenseClaimFormProps,
  type ExpenseClaimFormValues,
  type ExpenseClaimLineItem,
} from './ExpenseClaimForm.types';
import {
  buildInitialValues,
  calculateExpenseClaimTotal,
  createEmptyLineItem,
  hasExpenseClaimErrors,
  validateExpenseClaim,
} from './ExpenseClaimForm.validation';

export * from './ExpenseClaimForm.types';
export {
  calculateExpenseClaimTotal,
  hasExpenseClaimErrors,
  validateExpenseClaim,
} from './ExpenseClaimForm.validation';

export const ExpenseClaimForm: React.FC<ExpenseClaimFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [values, setValues] = useState<ExpenseClaimFormValues>(() =>
    buildInitialValues(initialValues)
  );
  const [errors, setErrors] = useState<ExpenseClaimFormErrors>({ lineItemErrors: {} });
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const total = useMemo(() => calculateExpenseClaimTotal(values.lineItems), [values.lineItems]);

  const updateField = useCallback(
    <K extends keyof Omit<ExpenseClaimFormValues, 'lineItems'>>(
      field: K,
      value: ExpenseClaimFormValues[K]
    ) => {
      setValues(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateLineItem = useCallback(
    <K extends keyof ExpenseClaimLineItem>(
      id: string,
      field: K,
      value: ExpenseClaimLineItem[K]
    ) => {
      setValues(prev => ({
        ...prev,
        lineItems: prev.lineItems.map(item =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      }));
    },
    []
  );

  const addLineItem = useCallback(() => {
    setValues(prev => {
      if (prev.lineItems.length >= MAX_LINE_ITEMS) {
        return prev;
      }
      return { ...prev, lineItems: [...prev.lineItems, createEmptyLineItem()] };
    });
  }, []);

  const removeLineItem = useCallback((id: string) => {
    setValues(prev => ({
      ...prev,
      lineItems:
        prev.lineItems.length > 1 ? prev.lineItems.filter(item => item.id !== id) : prev.lineItems,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setHasAttemptedSubmit(true);
      const validationErrors = validateExpenseClaim(values);
      setErrors(validationErrors);
      if (!hasExpenseClaimErrors(validationErrors)) {
        onSubmit(values);
      }
    },
    [values, onSubmit]
  );

  return (
    <form
      aria-label="Expense claim form"
      noValidate
      onSubmit={handleSubmit}
      data-testid="expense-claim-form"
    >
      <fieldset disabled={isSubmitting}>
        <legend>Claim details</legend>

        <label htmlFor="expense-claimant-name">Claimant name</label>
        <input
          id="expense-claimant-name"
          name="claimantName"
          type="text"
          value={values.claimantName}
          onChange={event => updateField('claimantName', event.target.value)}
        />
        {hasAttemptedSubmit && errors.claimantName ? (
          <span role="alert">{errors.claimantName}</span>
        ) : null}

        <label htmlFor="expense-department">Department</label>
        <input
          id="expense-department"
          name="department"
          type="text"
          value={values.department}
          onChange={event => updateField('department', event.target.value)}
        />
        {hasAttemptedSubmit && errors.department ? (
          <span role="alert">{errors.department}</span>
        ) : null}

        <label htmlFor="expense-notes">Notes</label>
        <textarea
          id="expense-notes"
          name="notes"
          maxLength={MAX_NOTES_LENGTH}
          value={values.notes}
          onChange={event => updateField('notes', event.target.value)}
        />

        <div role="group" aria-label="Line items">
          {hasAttemptedSubmit && errors.lineItems ? (
            <span role="alert">{errors.lineItems}</span>
          ) : null}

          {values.lineItems.map((item, index) => {
            const itemErrors = errors.lineItemErrors[item.id] ?? {};
            return (
              <div key={item.id} data-testid={`line-item-${index}`}>
                <label htmlFor={`line-item-description-${item.id}`}>Description</label>
                <input
                  id={`line-item-description-${item.id}`}
                  type="text"
                  value={item.description}
                  onChange={event => updateLineItem(item.id, 'description', event.target.value)}
                />
                {hasAttemptedSubmit && itemErrors.description ? (
                  <span role="alert">{itemErrors.description}</span>
                ) : null}

                <label htmlFor={`line-item-category-${item.id}`}>Category</label>
                <select
                  id={`line-item-category-${item.id}`}
                  value={item.category}
                  onChange={event =>
                    updateLineItem(item.id, 'category', event.target.value as ExpenseCategory)
                  }
                >
                  {EXPENSE_CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <label htmlFor={`line-item-amount-${item.id}`}>Amount</label>
                <input
                  id={`line-item-amount-${item.id}`}
                  type="number"
                  step="0.01"
                  value={item.amount}
                  onChange={event =>
                    updateLineItem(item.id, 'amount', Number.parseFloat(event.target.value) || 0)
                  }
                />
                {hasAttemptedSubmit && itemErrors.amount ? (
                  <span role="alert">{itemErrors.amount}</span>
                ) : null}

                <label htmlFor={`line-item-date-${item.id}`}>Date incurred</label>
                <input
                  id={`line-item-date-${item.id}`}
                  type="date"
                  value={item.incurredOn}
                  onChange={event => updateLineItem(item.id, 'incurredOn', event.target.value)}
                />
                {hasAttemptedSubmit && itemErrors.incurredOn ? (
                  <span role="alert">{itemErrors.incurredOn}</span>
                ) : null}

                <button
                  type="button"
                  onClick={() => removeLineItem(item.id)}
                  disabled={values.lineItems.length <= 1}
                >
                  Remove line item
                </button>
              </div>
            );
          })}

          <button
            type="button"
            onClick={addLineItem}
            disabled={values.lineItems.length >= MAX_LINE_ITEMS}
          >
            Add line item
          </button>
        </div>

        <div data-testid="expense-claim-total">Total: {total.toFixed(2)}</div>

        <div>
          <button type="submit">Submit claim</button>
          {onCancel ? (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          ) : null}
        </div>
      </fieldset>
    </form>
  );
};

export default ExpenseClaimForm;

