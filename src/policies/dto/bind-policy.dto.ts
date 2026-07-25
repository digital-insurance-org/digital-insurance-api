import { IsNotEmpty, IsString } from 'class-validator';

export class BindPolicyDto {
  @IsString()
  @IsNotEmpty()
  quoteId: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;
}
