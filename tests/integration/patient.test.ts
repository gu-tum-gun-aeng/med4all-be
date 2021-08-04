import { superdeno } from "superdeno/mod.ts";
import { stub } from "mock/stub.ts";

import app from "src/app.ts";
import PatientRepository from "src/dataaccess/database/patient.repository.ts";
import { getMockPatients } from "tests/mock/patient/patient.mock.ts";

Deno.test("when call /v1/patients, it should return list of patients", async () => {
  const expectedResult = await getMockPatients();
  const stubPatientRepository = stub(
    PatientRepository,
    "getAll",
    [getMockPatients()],
  );
  try {
    await superdeno(app.handle.bind(app))
      .get("/v1/patients")
      .expect(200)
      .expect({ results: expectedResult });
  } finally {
    stubPatientRepository.restore();
  }
});
