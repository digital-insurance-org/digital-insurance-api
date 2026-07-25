import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateQuoteDto } from './dto/create-quote.dto';

export interface Quote {
  id: string;
  customerId: string;
  productType: string;
  premiumCents: number;
  status: string;
}

@Injectable()
export class QuotesService {
  private readonly quotes = new Map<string, Quote>();

  create(dto: CreateQuoteDto): Quote {
    // Trivial demo premium: 2% of coverage, spread across the term.
    const premiumCents = Math.round(
      (dto.coverageAmountCents * 0.02 * dto.termMonths) / 12,
    );
    const quote: Quote = {
      id: randomUUID(),
      customerId: dto.customerId,
      productType: dto.productType,
      premiumCents,
      status: 'quoted',
    };
    this.quotes.set(quote.id, quote);
    return quote;
  }

  findOne(quoteId: string): Quote {
    const quote = this.quotes.get(quoteId);
    if (!quote) {
      throw new NotFoundException(`Quote ${quoteId} not found`);
    }
    return quote;
  }
}
