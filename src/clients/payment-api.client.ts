import axios from 'axios';

/**
 * Client for the internal Payment API.
 *
 * The Digital Insurance API talks to the Payment API directly (in addition to
 * going through the Policy API) so a customer can charge their premium and look
 * up the status and receipt of that payment. The base URL is taken from
 * PAYMENT_API_URL and the full path template is used at every call site so both
 * host and path are visible.
 */

export interface ChargePaymentBody {
  policyId: string;
  paymentMethodId: string;
  amountCents?: number;
}

export interface PaymentResource {
  id: string;
  policyId: string;
  status: string;
  amountCents: number;
  currency: string;
  riskSummary?: string;
  createdAt: string;
}

export interface ReceiptResource {
  paymentId: string;
  text: string;
}

/**
 * Charge a premium payment via the Payment API.
 * POST {PAYMENT_API_URL}/v1/payments/charge
 */
export async function chargePayment(
  body: ChargePaymentBody,
): Promise<PaymentResource> {
  const response = await axios.post(
    `${process.env.PAYMENT_API_URL}/v1/payments/charge`,
    body,
  );
  return response.data as PaymentResource;
}

/**
 * Fetch a payment from the Payment API.
 * GET {PAYMENT_API_URL}/v1/payments/{paymentId}
 */
export async function getPayment(paymentId: string): Promise<PaymentResource> {
  const response = await axios.get(
    `${process.env.PAYMENT_API_URL}/v1/payments/${paymentId}`,
  );
  return response.data as PaymentResource;
}

/**
 * Fetch a human-readable receipt from the Payment API.
 * GET {PAYMENT_API_URL}/v1/payments/{paymentId}/receipt
 */
export async function getReceipt(paymentId: string): Promise<ReceiptResource> {
  const response = await axios.get(
    `${process.env.PAYMENT_API_URL}/v1/payments/${paymentId}/receipt`,
  );
  return response.data as ReceiptResource;
}
