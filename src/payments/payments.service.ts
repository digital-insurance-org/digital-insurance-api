import { Injectable } from '@nestjs/common';
import {
  getPayment,
  getReceipt,
  PaymentResource,
  ReceiptResource,
} from '../clients/payment-api.client';

@Injectable()
export class PaymentsService {
  /** Fetch a payment's status from the internal Payment API. */
  async findOne(paymentId: string): Promise<PaymentResource> {
    return getPayment(paymentId);
  }

  /** Fetch a payment receipt from the internal Payment API. */
  async findReceipt(paymentId: string): Promise<ReceiptResource> {
    return getReceipt(paymentId);
  }
}
