import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';

@Controller('v1/quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  create(@Body() dto: CreateQuoteDto) {
    return this.quotesService.create(dto);
  }

  @Get(':quoteId')
  findOne(@Param('quoteId') quoteId: string) {
    return this.quotesService.findOne(quoteId);
  }
}
