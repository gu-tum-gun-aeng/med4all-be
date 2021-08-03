import { assertEquals, stub } from "../../../deps.ts";
import { testing } from "../../../deps.ts";
import PatientController from "../../../src/controllers/patient.controller.ts";
import PatientRepository from "../../../src/repositories/patient.repository.ts";
import { getMockPatients } from "../../mock/patient/patient.mock.ts";

Deno.test("PatientController should response with mock data", async () => {
  const expectedResult = await getMockPatients();
  const stubPatientRepository = stub(
    PatientRepository,
    "getAll",
    [getMockPatients()],
  );
  try {
    const mockContext = testing.createMockContext();
    await PatientController.patients(mockContext);
    assertEquals(mockContext.response.body, { results: expectedResult });
  } finally {
    stubPatientRepository.restore();
  }
});
