# Digital Insurance API

The customer-facing service of the Digital Insurance platform. Customers use it
to get quotes, bind and pay for policies, file claims, and look up their
account. It is a NestJS + TypeScript app.

## Dependencies: the Policy, Payment, and Claims APIs (all internal)

This service does not own the policy lifecycle, move money, or track losses
itself. It calls three internal services endpoint-to-endpoint over HTTP:

- **Policy API** — creating, underwriting, and fetching policies. The base URL
  comes from `POLICY_API_URL`, and the client lives in
  `src/clients/policy-api.client.ts`.
- **Payment API** — charging premiums and fetching payment status and receipts.
  The base URL comes from `PAYMENT_API_URL`, and the client lives in
  `src/clients/payment-api.client.ts`.
- **Claims API** — reading a customer's loss history. The base URL comes from
  `CLAIMS_API_URL`, and the client lives in
  `src/clients/claims-api.client.ts`.

## Drafting support replies

`POST /v1/customers/{customerId}/messages/draft-reply` writes a first draft of
a reply to a customer message. It runs OpenAI `gpt-4o-mini` through the Vercel
AI SDK (`ai` + `@ai-sdk/openai`); the agent is `src/ai/reply-draft.agent.ts`
and its prompt is `src/ai/prompts/reply-draft.prompt.ts`.

A support agent edits and sends every draft — nothing generated here reaches
the customer on its own, and the prompt bars the model from quoting figures it
was not given, from deciding a claim, and from answering at all when the
message reads as a complaint that needs a senior agent.

The OpenAI client's base URL comes from `OPENAI_BASE_URL`, so the same build
can be pointed at the APISynQ gateway instead of `api.openai.com` and have the
call recorded against the data-class policy.

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
| `GET /v1/customers/{customerId}/claims` | List a customer's claims | Claims API: `GET /v1/claims?policyNumber=` (once per policy held)   |
| `POST /v1/customers/{customerId}/messages/draft-reply` | Draft a support reply | Claims API: `GET /v1/claims?policyNumber=`; OpenAI `gpt-4o-mini` |

The authoritative contract is in [`openapi.yaml`](./openapi.yaml); its paths
match the controller routes exactly.

## Configuration

| Variable          | Default                               | Purpose                              |
| ----------------- | ------------------------------------- | ------------------------------------ |
| `PORT`            | `3002`                                | Port the API listens on              |
| `POLICY_API_URL`  | `https://policy.digitalinsurance.dev` | Base URL of the internal Policy API  |
| `PAYMENT_API_URL` | `https://payment.digitalinsurance.dev`| Base URL of the internal Payment API |
| `CLAIMS_API_URL`  | `https://claims.digitalinsurance.dev` | Base URL of the internal Claims API   |
| `OPENAI_BASE_URL` | `https://governance-api.apisynq.com/v1/ai-gw/openai/v1` | Where the OpenAI client sends its calls |
| `OPENAI_API_KEY`  | —                                     | Key for the reply draft helper        |

Copy `.env.example` to `.env` and adjust as needed.

## Run

```bash
npm install
npm run build
npm start
```
