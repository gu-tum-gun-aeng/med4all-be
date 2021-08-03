import { assertEquals, stub } from "../../../deps.ts";
import PatientRepository from "../../../src/repositories/patient.repository.ts";

import * as patientService from "../../../src/services/patient.service.ts";
import { getMockPatients } from "../../mock/patient/patient.mock.ts";

Deno.test("getPatients should return list of all patients correctly", async () => {
  const expectedResult = await getMockPatients();
  const stubPatientRepository = stub(
    PatientRepository,
    "getAll",
    [getMockPatients()],
  );
  try {
    const actualResult = await patientService.getPatients();
    assertEquals(actualResult, expectedResult);
  } finally {
    stubPatientRepository.restore();
  }
});
