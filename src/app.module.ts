import { Module } from '@nestjs/common';
import { QuotesModule } from './quotes/quotes.module';
import { PoliciesModule } from './policies/policies.module';
import { ClaimsModule } from './claims/claims.module';
import { CustomersModule } from './customers/customers.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    QuotesModule,
    PoliciesModule,
    ClaimsModule,
    CustomersModule,
    PaymentsModule,
  ],
})
export class AppModule {}
