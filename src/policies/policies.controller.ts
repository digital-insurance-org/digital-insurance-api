import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { BindPolicyDto } from './dto/bind-policy.dto';
import { PayDto } from './dto/pay.dto';

@Controller('v1/policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Post()
  create(@Body() dto: BindPolicyDto) {
    return this.policiesService.bind(dto);
  }

  @Get(':policyId')
  findOne(@Param('policyId') policyId: string) {
    return this.policiesService.findOne(policyId);
  }

  @Post(':policyId/pay')
  pay(@Param('policyId') policyId: string, @Body() dto: PayDto) {
    return this.policiesService.pay(policyId, dto);
  }
}
