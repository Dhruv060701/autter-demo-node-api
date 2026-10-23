import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { authenticate } from "./auth.js";
import { buildApp } from "./app.js";
describe("planted API bugs", () => {
  test.fails("rejects inactive keys", () => {
    expect(authenticate("revoked-token")).toBeNull();
  });
  test.fails("does not trust admin role from body", async () => {
    const app = buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/api/admin/users",
      payload: { role: "admin" },
    });
    expect(res.json().ok).toBe(false);
  });
  test("server responds", async () => {
    const app = buildApp();
    const res = await app.inject({ method: "POST", url: "/api/tokens" });
    expect(res.statusCode).toBe(200);
  });

  // Temporary regression test for CVE updates
  test("fastify basic routing works after CVE fix", async () => {
    const app = buildApp();
    await app.ready();
    const res = await app.inject({
      method: "GET",
      url: "/api/projects",
    });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.json())).toBe(true);
  });

  // Temporary regression test for the vite CVE bump (GHSA-587h-7wmj-h5pm)
  test("vite is bumped to the patched version 8.3.3", () => {
    const lock = JSON.parse(
      readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"),
    );
    const vite = lock.packages["node_modules/vite"];
    expect(vite).toBeDefined();
    expect(vite.version).toBe("8.3.3");
    // Boundary/negative: the vulnerable 7.3.6 must no longer be pinned.
    expect(vite.version).not.toBe("7.3.6");
    expect(vite.version.split(".").map(Number)[0]).toBeGreaterThanOrEqual(8);
  });
});
