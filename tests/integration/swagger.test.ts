import { superdeno } from "../../deps.ts";
import app from "../../src/app.ts";

Deno.test("when call /swagger.yaml, it should return 200 status", async () => {
  await superdeno(app.handle.bind(app)).get("/swagger.yaml").expect(200);
});

Deno.test("when call /api-docs, it should redirected", async () => {
  await superdeno(app.handle.bind(app)).get("/api-docs").expect(302);
});
