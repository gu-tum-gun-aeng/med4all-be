import { superdeno } from "../../deps.ts";
import app from "../../src/app.ts";

Deno.test("when call /v1/swagger.yaml, it should return 200 status", async () => {
  await superdeno(app.handle.bind(app)).get("/v1/swagger.yaml").expect(200);
});
