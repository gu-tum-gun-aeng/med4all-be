import { superdeno } from "../../deps.ts";
import app from "../../src/app.ts";
import PatientRepository from "../../src/repositories/patient.repository.ts";
import { stub } from "../../deps.ts";
import { getMockPatients } from "../mock/patient/patient.mock.ts";
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
