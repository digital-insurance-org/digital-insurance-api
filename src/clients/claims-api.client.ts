import axios from 'axios';

/**
 * Client for the internal Claims API.
 *
 * Claims themselves are filed and tracked by the Claims API; this service only
 * reads them so a customer can see their own loss history in one place. The
 * base URL is taken from CLAIMS_API_URL and the full path template is used at
 * every call site so both host and path are visible.
 */

export interface ClaimResource {
  claimId: string;
  policyNumber: string;
  status: string;
  lossType?: string;
  amountCents?: number;
  incidentDate?: string;
  description?: string;
}

/**
 * List the claims filed against a policy number.
 * GET {CLAIMS_API_URL}/v1/claims?policyNumber={policyNumber}
 */
export async function listClaimsByPolicyNumber(
  policyNumber: string,
): Promise<ClaimResource[]> {
  const response = await axios.get(`${process.env.CLAIMS_API_URL}/v1/claims`, {
    params: { policyNumber },
  });
  const body = response.data as ClaimResource[] | { claims?: ClaimResource[] };
  // The Claims API returns a bare array; tolerate an envelope so a later
  // pagination change there does not read as "this customer has no claims".
  return Array.isArray(body) ? body : body.claims ?? [];
}

/**
 * Fetch a single claim from the Claims API.
 * GET {CLAIMS_API_URL}/v1/claims/{claimId}
 */
export async function getClaim(claimId: string): Promise<ClaimResource> {
  const response = await axios.get(
    `${process.env.CLAIMS_API_URL}/v1/claims/${claimId}`,
  );
  return response.data as ClaimResource;
}
