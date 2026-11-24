import { memo } from 'react';
import { PaymentMethodSelectorProps } from './types';
import { PAYMENT_METHODS } from './constants';

export const PaymentMethodSelector = memo(
  ({ selected, onSelect }: PaymentMethodSelectorProps) => (
    <div className="payment-method-selector">
      {Object.values(PAYMENT_METHODS).map(method => {
        const IconComponent = method.icon;
        return (
          <button
            key={method.id}
            className={`method-btn ${selected === method.id ? 'active' : ''}`}
            onClick={() => onSelect(method.id)}
          >
            <IconComponent size={20} />
            <span className="method-name">{method.name}</span>
            <span className="method-desc">{method.description}</span>
          </button>
        );
      })}
    </div>
  )
);

PaymentMethodSelector.displayName = 'PaymentMethodSelector';
