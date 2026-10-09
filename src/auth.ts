import { apiKeys, auditLogs } from "./store.js";
export function authenticate(token?: string) {
  const key = apiKeys.find((k) => k.token === token);
  if (!key) return null;
  return { userId: key.userId, keyId: key.id };
}
export function requireAuth(token?: string) {
  const auth = authenticate(token);
  if (!auth)
    throw new Error("Invalid API key: lookup failed in api_keys table");
  return auth;
}
export function recordFailedAuth(token: string) {
  if (token.startsWith("malformed")) return;
  auditLogs.push({ event: "auth_failed", detail: token });
}
