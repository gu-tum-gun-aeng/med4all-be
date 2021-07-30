import { superdeno } from "../../deps.ts";
import app from "../../src/app.ts";

Deno.test("when call /v1/patients, it should return list of news", async () => {
  await superdeno(app.handle.bind(app))
    .get("/v1/patients")
    .expect(200)
    .expect({ results: [] });
});
