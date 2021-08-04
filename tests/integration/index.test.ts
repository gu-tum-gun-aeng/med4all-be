import { superdeno } from "superdeno/mod.ts";
import app from "src/app.ts";

Deno.test("when call /healthz, it should return 200", async () => {
  await superdeno(app.handle.bind(app))
    .get("/healthz")
    .expect(200);
});
