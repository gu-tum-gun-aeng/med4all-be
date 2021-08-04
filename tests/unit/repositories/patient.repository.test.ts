import { stub } from "mock/stub.ts";
import { assertEquals } from "testing/asserts.ts";

import patientRepository from "src/dataaccess/database/patient.repository.ts";
import DbUtil from "src/utils/db.util.ts";
import { getMockPatients } from "tests/mock/patient/patient.mock.ts";

Deno.test("getAll should return list of all patients correctly", async () => {
  const expectedResult = await getMockPatients();
  const stubPatientRepository = stub(
    DbUtil,
    "queryObject",
    [getMockPatients()],
  );
  try {
    const actualResult = await patientRepository.getAll();
    assertEquals(actualResult, expectedResult);
  } finally {
    stubPatientRepository.restore();
  }
});
