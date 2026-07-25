import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @IsNotEmpty()
  policyId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(0)
  amountCents: number;
}
