import { assertEquals } from "../../../deps.ts";
import { testing } from "../../../deps.ts";
import PatientController from "../../../src/controllers/patient.controller.ts";

Deno.test("PatientController should response with mock data", async () => {
  const mockContext = testing.createMockContext();
  await PatientController.patients(mockContext);
  assertEquals(mockContext.response.body, { results: [] });
});
