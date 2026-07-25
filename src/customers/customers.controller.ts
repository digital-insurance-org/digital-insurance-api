import { Controller, Get, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('v1/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':customerId')
  findOne(@Param('customerId') customerId: string) {
    return this.customersService.findOne(customerId);
  }
}
