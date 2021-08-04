import { superdeno } from "../../deps.ts";
import app from "../../src/app.ts";
import PatientRepository from "../../src/dataaccess/database/patient.repository.ts";
import { stub } from "../../deps.ts";
import { getMockPatients } from "../mock/patient/patient.mock.ts";
import { patientRequestMock } from "../mock/patient/patient.request.mock.ts";
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

Deno.test("when call post /v1/patient, it should return result with patientId", async () => {
  const expectedResult = 10;
  const stubPatientRepository = stub(
    PatientRepository,
    "createPatient",
    [await expectedResult],
  );

  try {
    await superdeno(app.handle.bind(app))
      .post("/v1/patient")
      .send(patientRequestMock)
      .expect(200)
      .expect({ results: { patientId: expectedResult } });
  } finally {
    stubPatientRepository.restore();
  }
});
