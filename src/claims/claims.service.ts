import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateClaimDto } from './dto/create-claim.dto';

export interface Claim {
  id: string;
  policyId: string;
  status: string;
  amountCents: number;
  description: string;
}

@Injectable()
export class ClaimsService {
  private readonly claims = new Map<string, Claim>();

  create(dto: CreateClaimDto): Claim {
    const claim: Claim = {
      id: randomUUID(),
      policyId: dto.policyId,
      status: 'filed',
      amountCents: dto.amountCents,
      description: dto.description,
    };
    this.claims.set(claim.id, claim);
    return claim;
  }

  findOne(claimId: string): Claim {
    const claim = this.claims.get(claimId);
    if (!claim) {
      throw new NotFoundException(`Claim ${claimId} not found`);
    }
    return claim;
  }
}
