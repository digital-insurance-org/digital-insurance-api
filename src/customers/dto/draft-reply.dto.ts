import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class DraftReplyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  message: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  topic?: string;
}
