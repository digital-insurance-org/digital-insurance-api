import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';

@Controller('v1/claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  create(@Body() dto: CreateClaimDto) {
    return this.claimsService.create(dto);
  }

  @Get(':claimId')
  findOne(@Param('claimId') claimId: string) {
    return this.claimsService.findOne(claimId);
  }
}
