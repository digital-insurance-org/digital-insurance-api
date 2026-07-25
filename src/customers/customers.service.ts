import { Injectable, NotFoundException } from '@nestjs/common';

export interface Customer {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class CustomersService {
  private readonly customers = new Map<string, Customer>([
    [
      'cust_001',
      { id: 'cust_001', name: 'Ada Lovelace', email: 'ada@example.com' },
    ],
    [
      'cust_002',
      { id: 'cust_002', name: 'Alan Turing', email: 'alan@example.com' },
    ],
  ]);

  findOne(customerId: string): Customer {
    const customer = this.customers.get(customerId);
    if (!customer) {
      throw new NotFoundException(`Customer ${customerId} not found`);
    }
    return customer;
  }
}
