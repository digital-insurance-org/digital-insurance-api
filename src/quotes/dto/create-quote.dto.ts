import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  productType: string;

  @IsInt()
  @Min(0)
  coverageAmountCents: number;

  @IsInt()
  @Min(1)
  termMonths: number;
}
