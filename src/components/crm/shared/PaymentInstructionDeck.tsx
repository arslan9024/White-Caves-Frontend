import React, { memo } from 'react';
import './PaymentComponents.css';
import {
  PaymentInstructionDeckProps,
  BankDetails,
  PaymentMethodConfig,
  QRCodeDisplayProps,
  ChequeInstructionsProps,
  BankTransferDetailsProps,
  PaymentMethodSelectorProps,
} from './paymentInstructionDeck/types';
import {
  BANK_DETAILS,
  PAYMENT_METHODS,
  loadBankDetails,
} from './paymentInstructionDeck/constants';
import {
  requestPaymentIntent,
  buildPaymentMessage,
  CreatePaymentIntentParams,
  PaymentIntentResult,
  BuildPaymentMessageParams,
} from './paymentInstructionDeck/services';
import { usePaymentDeck } from './paymentInstructionDeck/usePaymentDeck';
import { QRCodeDisplay } from './paymentInstructionDeck/QRCodeDisplay';
import { ChequeInstructions } from './paymentInstructionDeck/ChequeInstructions';
import { BankTransferDetails } from './paymentInstructionDeck/BankTransferDetails';
import { PaymentMethodSelector } from './paymentInstructionDeck/PaymentMethodSelector';
import { DeckHeader } from './paymentInstructionDeck/DeckHeader';
import { DeckActions } from './paymentInstructionDeck/DeckActions';

const PaymentInstructionDeck = memo(
  ({
    amount = 0,
    reference = '',
    clientName = '',
    invoiceId = '',
    onGenerateMessage,
    showMethodSelector = true,
  }: PaymentInstructionDeckProps) => {
    const {
      selectedMethod,
      setSelectedMethod,
      copied,
      expanded,
      toggleExpanded,
      intentLoading,
      intentStatus,
      intentError,
      handleCopy,
      generateMessage,
      createPaymentIntent,
    } = usePaymentDeck({
      amount,
      reference,
      clientName,
      invoiceId,
      onGenerateMessage,
    });

    return (
      <div className="payment-instruction-deck">
        <DeckHeader expanded={expanded} onToggle={toggleExpanded} />

        {expanded && (
          <div className="deck-content">
            {showMethodSelector && (
              <PaymentMethodSelector selected={selectedMethod} onSelect={setSelectedMethod} />
            )}

            <div className="payment-details">
              {selectedMethod === 'qr' && (
                <QRCodeDisplay amount={amount} reference={reference} onCopy={handleCopy} />
              )}

              {selectedMethod === 'cheque' && (
                <ChequeInstructions
                  amount={amount}
                  reference={reference}
                  payeeName={BANK_DETAILS.accountName}
                />
              )}

              {selectedMethod === 'transfer' && (
                <BankTransferDetails
                  amount={amount}
                  reference={reference}
                  onCopy={handleCopy}
                  copied={copied}
                />
              )}
            </div>

            <DeckActions
              intentLoading={intentLoading}
              copied={copied}
              onCreatePaymentIntent={() => void createPaymentIntent()}
              onGenerateMessage={generateMessage}
              intentStatus={intentStatus}
              intentError={intentError}
            />
          </div>
        )}
      </div>
    );
  }
);

PaymentInstructionDeck.displayName = 'PaymentInstructionDeck';
export default PaymentInstructionDeck;

// Re-export subcomponents, hooks, constants, services, and types for backwards compatibility
export {
  PaymentMethodSelector,
  QRCodeDisplay,
  ChequeInstructions,
  BankTransferDetails,
  DeckHeader,
  DeckActions,
  usePaymentDeck,
  BANK_DETAILS,
  PAYMENT_METHODS,
  loadBankDetails,
  requestPaymentIntent,
  buildPaymentMessage,
};

export type {
  PaymentInstructionDeckProps,
  BankDetails,
  PaymentMethodConfig,
  QRCodeDisplayProps,
  ChequeInstructionsProps,
  BankTransferDetailsProps,
  PaymentMethodSelectorProps,
  CreatePaymentIntentParams,
  PaymentIntentResult,
  BuildPaymentMessageParams,
};
