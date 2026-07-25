import { IsNotEmpty, IsString } from 'class-validator';

export class PayDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;
}
