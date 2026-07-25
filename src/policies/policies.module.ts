import { Module } from '@nestjs/common';
import { PoliciesController } from './policies.controller';
import { PoliciesService } from './policies.service';
import { QuotesModule } from '../quotes/quotes.module';

@Module({
  imports: [QuotesModule],
  controllers: [PoliciesController],
  providers: [PoliciesService],
})
export class PoliciesModule {}
