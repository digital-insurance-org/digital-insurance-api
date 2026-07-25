import { Injectable } from '@nestjs/common';
import { QuotesService } from '../quotes/quotes.service';
import {
  createPolicy,
  getPolicy,
  underwritePolicy,
  PolicyResource,
} from '../clients/policy-api.client';
import {
  chargePayment,
  PaymentResource,
} from '../clients/payment-api.client';
import { BindPolicyDto } from './dto/bind-policy.dto';
import { PayDto } from './dto/pay.dto';

@Injectable()
export class PoliciesService {
  constructor(private readonly quotesService: QuotesService) {}

  /**
   * Bind a policy: look up the local quote, then create and underwrite the
   * policy through the internal Policy API.
   */
  async bind(dto: BindPolicyDto): Promise<PolicyResource> {
    const quote = this.quotesService.findOne(dto.quoteId);

    const created = await createPolicy({
      quoteId: dto.quoteId,
      customerId: dto.customerId,
      productType: quote.productType,
      premiumCents: quote.premiumCents,
    });

    const underwritten = await underwritePolicy(created.id, {
      customerId: dto.customerId,
      productType: quote.productType,
    });

    return underwritten;
  }

  /** Fetch a bound policy from the internal Policy API. */
  async findOne(policyId: string): Promise<PolicyResource> {
    return getPolicy(policyId);
  }

  /** Pay the premium for a policy by charging it through the Payment API. */
  async pay(policyId: string, dto: PayDto): Promise<PaymentResource> {
    return chargePayment({
      policyId,
      paymentMethodId: dto.paymentMethodId,
    });
  }
}
