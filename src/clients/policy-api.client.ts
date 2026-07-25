import axios from 'axios';

/**
 * Client for the internal Policy API.
 *
 * The Digital Insurance API is customer-facing; the real policy lifecycle
 * operations (create, underwrite, fetch) are delegated to the internal Policy
 * API over HTTP. Charging the premium is no longer handled here — that goes
 * through the internal Payment API instead. The base URL is taken from
 * POLICY_API_URL and the full path template is used at every call site so both
 * host and path are visible.
 */

export interface CreatePolicyBody {
  quoteId: string;
  customerId: string;
  productType?: string;
  premiumCents?: number;
}

export interface UnderwritePolicyBody {
  customerId: string;
  productType?: string;
  coverageAmountCents?: number;
}

export interface PolicyResource {
  id: string;
  quoteId: string;
  customerId: string;
  status: string;
  premiumCents: number;
}

/**
 * Create a policy in the Policy API.
 * POST {POLICY_API_URL}/v1/policies
 */
export async function createPolicy(
  body: CreatePolicyBody,
): Promise<PolicyResource> {
  const response = await axios.post(
    `${process.env.POLICY_API_URL}/v1/policies`,
    body,
  );
  return response.data as PolicyResource;
}

/**
 * Fetch a policy from the Policy API.
 * GET {POLICY_API_URL}/v1/policies/{policyId}
 */
export async function getPolicy(policyId: string): Promise<PolicyResource> {
  const response = await axios.get(
    `${process.env.POLICY_API_URL}/v1/policies/${policyId}`,
  );
  return response.data as PolicyResource;
}

/**
 * Underwrite a policy in the Policy API.
 * POST {POLICY_API_URL}/v1/policies/{policyId}/underwrite
 */
export async function underwritePolicy(
  policyId: string,
  body: UnderwritePolicyBody,
): Promise<PolicyResource> {
  const response = await axios.post(
    `${process.env.POLICY_API_URL}/v1/policies/${policyId}/underwrite`,
    body,
  );
  return response.data as PolicyResource;
}
