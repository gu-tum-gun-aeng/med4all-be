import { superdeno } from "../../deps.ts";
import app from "../../src/app.ts";

Deno.test("when call /v1/patients with invalid token, it should return 401", async () => {
  const mockToken = "FAKE_TOKEN";
  await superdeno(app.handle.bind(app))
    .get("/v1/patients/1/register-status")
    .set("Authorization", `Bearer ${mockToken}`)
    .expect(401);
});

Deno.test("when call /v1/patients without Authorization header, it should return 401", async () => {
  await superdeno(app.handle.bind(app))
    .get("/v1/patients/:certificateId/register-status")
    .expect(401);
});
