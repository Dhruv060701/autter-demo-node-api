# autter-demo-node-api

A realistic broken Fastify API for testing [Autter](https://autter.dev) code review workflows.

This repository is part of the Autter Sandbox set. It models a developer-tool backend with API keys, organizations, projects, audit logs, webhook subscriptions, rate-limited endpoints, and admin operations. The code intentionally includes subtle auth, validation, pagination, retry, and error-handling bugs that are good candidates for AI-assisted fixes and Autter review.

## What this API includes

- Node.js, TypeScript, and Fastify
- Zod validation
- In-memory repository-style data
- API key authentication
- Admin route examples
- Webhook retry behavior
- Vitest tests with expected-failure coverage
- Challenge files with copy-paste AI editor prompts
- GitHub issue templates copied from the challenge files

## Quick start

```bash
git clone https://github.com/Autter-dev/autter-demo-node-api.git
cd autter-demo-node-api
npm install
npm test
npm run build
npm run dev
```

The API runs on `http://localhost:3000` by default.

Example request:

```bash
curl -H "Authorization: Bearer live-token" http://localhost:3000/api/me
```

## Demo flow with Autter

1. Fork this repository or create a working branch.
2. Go to [autter.dev](https://autter.dev) and sign in.
3. Connect GitHub to Autter if it is not connected already.
4. Add this repository to the Autter installation or select it from the Autter dashboard.
5. Pick one challenge from the table below.
6. Open the matching file in `/challenges`.
7. Copy the "Suggested AI Editor Prompt" into Cursor, Claude Code, Copilot, Windsurf, or another AI code editor.
8. Let the editor implement a small fix and add or update tests.
9. Push the branch and open a pull request.
10. Let Autter review the PR, then address the findings it raises.

Good first demos are "API key lookup allows inactive keys" and "Admin endpoint trusts client-provided role" because they show Autter reviewing security-sensitive backend changes.

## How the sandbox is designed

This repo is intentionally imperfect. Do not fix every issue on `main`. Each challenge is meant to create one focused PR.

Some tests use expected-failure markers. They document known broken behavior while keeping the baseline suite runnable for demo setup. When solving a challenge, convert or replace the relevant expected-failure coverage with passing regression tests.

## Challenges

| Challenge                                                                                                      | Difficulty | Category      | Expected Autter review angle |
| -------------------------------------------------------------------------------------------------------------- | ---------- | ------------- | ---------------------------- |
| [API key lookup allows inactive keys](./challenges/api-key-lookup-allows-inactive-keys.md)                     | Medium     | Auth          | auth bypass                  |
| [Missing rate limit on token creation endpoint](./challenges/missing-rate-limit-on-token-creation-endpoint.md) | Medium     | Security      | abuse prevention gap         |
| [Webhook retry logic duplicates delivery](./challenges/webhook-retry-logic-duplicates-delivery.md)             | High       | Reliability   | side-effect duplication      |
| [Admin endpoint trusts client-provided role](./challenges/admin-endpoint-trusts-client-provided-role.md)       | High       | Authorization | privilege escalation         |
| [Audit logs miss failed auth attempts](./challenges/audit-logs-miss-failed-auth-attempts.md)                   | Medium     | Observability | security monitoring gap      |
| [Zod validation strips fields incorrectly](./challenges/zod-validation-strips-fields-incorrectly.md)           | Medium     | Validation    | data loss regression         |
| [Pagination returns inconsistent results](./challenges/pagination-returns-inconsistent-results.md)             | Medium     | Data          | unstable pagination          |
| [Error handler returns internal details](./challenges/error-handler-returns-internal-details.md)               | Low        | Security      | information leakage          |

## Recommended PR description

```markdown
## What changed

- Fixed the selected challenge
- Added or updated regression coverage

## Why

- The previous implementation allowed the broken behavior described in `/challenges/...`

## Validation

- npm test
- npm run build

## Risks

- Note any behavior that Autter should review carefully
```

## Learn more

Visit [autter.dev](https://autter.dev) to learn more about Autter and connect this repository as a review demo.
