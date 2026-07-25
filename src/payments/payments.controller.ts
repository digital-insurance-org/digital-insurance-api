import { Controller, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':paymentId')
  findOne(@Param('paymentId') paymentId: string) {
    return this.paymentsService.findOne(paymentId);
  }

  @Get(':paymentId/receipt')
  findReceipt(@Param('paymentId') paymentId: string) {
    return this.paymentsService.findReceipt(paymentId);
  }
}
