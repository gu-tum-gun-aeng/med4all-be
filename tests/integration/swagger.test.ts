import { superdeno } from "../../deps.ts";
import app from "../../src/app.ts";

Deno.test("when call /swagger.yaml, it should return 200 status", async () => {
  await superdeno(app.handle.bind(app)).get("/swagger.yaml").expect(200);
});

Deno.test("when call /api-docs, it should redirected", async () => {
  await superdeno(app.handle.bind(app)).get("/api-docs").expect(302);
});

// Todo: fix this test to make the port not dynamic
// Deno.test("when call /api-docs, it should redirect to correct swagger url", async () => {
//   await superdeno(app.handle.bind(app))
//     .get("/api-docs")
//     .expect(302)
//     .expect(
//       "location",
//       "https://generator.swagger.io/?url=https%3A%2F%2F127.0.0.1%3A50857%2Fswagger.yaml",
//     );
// });
