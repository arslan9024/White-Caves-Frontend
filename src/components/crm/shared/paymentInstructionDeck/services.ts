import { authFetch } from '../../../../utils/authFetch';
import { BANK_DETAILS } from './constants';

export interface CreatePaymentIntentParams {
  amount: number;
  reference: string;
  invoiceId: string;
  clientName: string;
}

export interface PaymentIntentResult {
  success: boolean;
  data?: {
    paymentIntentId?: string;
    clientSecret?: string;
    status?: string;
  };
  error?: string;
}

export async function requestPaymentIntent(
  params: CreatePaymentIntentParams
): Promise<PaymentIntentResult> {
  const response = await authFetch('/api/payments/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: params.amount,
      currency: 'aed',
      reference: params.reference,
      invoiceId: params.invoiceId,
      clientName: params.clientName,
    }),
  });

  const payload = await response.json();
  if (!response.ok || !payload.success) {
    return {
      success: false,
      error: payload.error || 'Failed to generate payment link.',
    };
  }

  return payload;
}

export interface BuildPaymentMessageParams {
  selectedMethod: string;
  clientName: string;
  amount: number;
  reference: string;
  invoiceId: string;
}

export function buildPaymentMessage({
  selectedMethod,
  clientName,
  amount,
  reference,
  invoiceId,
}: BuildPaymentMessageParams): string {
  if (selectedMethod === 'qr') {
    return `Dear ${clientName},\n\nPlease scan the Aani QR code for your payment of AED ${amount.toLocaleString()}.\n\nMerchant: WHITE CAVES REAL ESTATE L.L.C\nReference: ${reference}\nInvoice: ${invoiceId}\n\nScan the QR code using any Aani-enabled bank app to complete the payment.\n\nThank you,\nWhite Caves Real Estate`;
  }

  if (selectedMethod === 'cheque') {
    return `Dear ${clientName},\n\nCheque Payment Instructions:\n\nPayable to: ${BANK_DETAILS.accountName}\nAmount: AED ${amount.toLocaleString()}\nReference: ${reference}\n\nPlease write the reference number on the back of the cheque and cross it "Account Payee Only".\n\nDelivery: White Caves Real Estate, Bay Square, Building 12, Dubai\n\nThank you,\nWhite Caves Real Estate`;
  }

  return `Dear ${clientName},\n\nBank Transfer Details:\n\nBank: ${BANK_DETAILS.bankName}\nAccount Holder Name: ${BANK_DETAILS.accountName}\nAccount Number: ${BANK_DETAILS.accountNumber}\nIBAN: ${BANK_DETAILS.iban}\nAccount Type: ${BANK_DETAILS.accountType}\nRouting Code: ${BANK_DETAILS.routingCode}\nSWIFT Code: ${BANK_DETAILS.swiftCode}\n\nAmount: AED ${amount.toLocaleString()}\nReference: ${reference}\n\nPlease include the reference number in your transfer description.\n\nThank you,\nWhite Caves Real Estate`;
}
