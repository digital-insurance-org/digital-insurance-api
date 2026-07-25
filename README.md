# Digital Insurance API

The customer-facing service of the Digital Insurance platform. Customers use it
to get quotes, bind and pay for policies, file claims, and look up their
account. It is a NestJS + TypeScript app.

## Dependencies: the Policy API and the Payment API (both internal)

This service does not own the policy lifecycle or move money itself. It calls
two internal services endpoint-to-endpoint over HTTP:

- **Policy API** — creating, underwriting, and fetching policies. The base URL
  comes from `POLICY_API_URL`, and the client lives in
  `src/clients/policy-api.client.ts`.
- **Payment API** — charging premiums and fetching payment status and receipts.
  The base URL comes from `PAYMENT_API_URL`, and the client lives in
  `src/clients/payment-api.client.ts`.

## Endpoints

| Method + path                          | What it does              | Downstream call(s) it makes                                          |
| -------------------------------------- | ------------------------- | ------------------------------------------------------------------- |
| `POST /v1/quotes`                      | Create an insurance quote | none (local)                                                        |
| `GET /v1/quotes/{quoteId}`             | Fetch a quote             | none (local)                                                        |
| `POST /v1/policies`                    | Bind a policy             | Policy API: `POST /v1/policies` then `POST /v1/policies/{id}/underwrite` |
| `GET /v1/policies/{policyId}`          | Fetch a bound policy      | Policy API: `GET /v1/policies/{id}`                                 |
| `POST /v1/policies/{policyId}/pay`     | Pay the policy premium    | Payment API: `POST /v1/payments/charge`                            |
| `GET /v1/payments/{paymentId}`         | Fetch payment status      | Payment API: `GET /v1/payments/{id}`                               |
| `GET /v1/payments/{paymentId}/receipt` | Fetch a payment receipt   | Payment API: `GET /v1/payments/{id}/receipt`                       |
| `POST /v1/claims`                      | File an insurance claim   | none (local)                                                        |
| `GET /v1/claims/{claimId}`             | Fetch a claim             | none (local)                                                        |
| `GET /v1/customers/{customerId}`       | Fetch a customer          | none (local)                                                        |

The authoritative contract is in [`openapi.yaml`](./openapi.yaml); its paths
match the controller routes exactly.

## Configuration

| Variable          | Default                               | Purpose                              |
| ----------------- | ------------------------------------- | ------------------------------------ |
| `PORT`            | `3002`                                | Port the API listens on              |
| `POLICY_API_URL`  | `https://policy.digitalinsurance.dev` | Base URL of the internal Policy API  |
| `PAYMENT_API_URL` | `https://payment.digitalinsurance.dev`| Base URL of the internal Payment API |

Copy `.env.example` to `.env` and adjust as needed.

## Run

```bash
npm install
npm run build
npm start
```
