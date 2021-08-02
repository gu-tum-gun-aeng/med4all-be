import { superdeno } from "../../deps.ts";
import app from "../../src/app.ts";

Deno.test("when call /v1/patients, it should return list of patients", async () => {
  await superdeno(app.handle.bind(app))
    .get("/v1/patients")
    .expect(200)
    .expect({ results: [] });
});

Deno.test("when call /v1/uploads, it should return list of file", async () => {
  await superdeno(app.handle.bind(app))
    .get("/v1/uploads")
    .expect(200)
    .expect({ results: [] });
});
