import { superdeno } from "../../deps.ts";
import app from "../../src/app.ts";
import PatientRepository from "../../src/dataaccess/database/patient.repository.ts";
import { stub } from "../../deps.ts";
import {
  getMockOnePatient,
  getMockPatients,
} from "../mock/patient/patient.mock.ts";
import { patientRequestMock } from "../mock/patient/patient.request.mock.ts";
import { patientResultRequestMock } from "../mock/patient/patientResult.request.mock.ts";
import * as tokenUtil from "../../src/utils/token/token.util.ts";
import config from "../../src/config/config.ts";

Deno.test("when call /v1/patients, it should return list of patients", async () => {
  const expectedResult = await getMockPatients();
  const stubPatientRepository = stub(
    PatientRepository,
    "getAll",
    [getMockPatients()],
  );
  const mockToken = await tokenUtil.createToken({
    id: "1",
    hashAlgorithm: tokenUtil.HashAlgorithm.HS512,
    ttlSeconds: 60,
  }, config.jwt.key);
  try {
    await superdeno(app.handle.bind(app))
      .get("/v1/patients")
      .set("Authorization", mockToken)
      .expect(200)
      .expect({ results: expectedResult });
  } finally {
    stubPatientRepository.restore();
  }
});

Deno.test("when call /v1/patients with invalid token, it should return 401", async () => {
  const mockToken = "FAKE_TOKEN";
  await superdeno(app.handle.bind(app))
    .get("/v1/patients")
    .set("Authorization", mockToken)
    .expect(401);
});

Deno.test("when call /v1/patients without Authorization header, it should return 401", async () => {
  await superdeno(app.handle.bind(app))
    .get("/v1/patients")
    .expect(401);
});

Deno.test("when call /v1/patients/waiting, it should return 1 waiting patient", async () => {
  const expectedResult = await getMockOnePatient();
  const stubPatientRepository = stub(
    PatientRepository,
    "getFirstWaitingPatient",
    [getMockOnePatient()],
  );
  const mockToken = await tokenUtil.createToken({
    id: "1",
    hashAlgorithm: tokenUtil.HashAlgorithm.HS512,
    ttlSeconds: 60,
  }, config.jwt.key);
  try {
    await superdeno(app.handle.bind(app))
      .get("/v1/patients/waiting")
      .set("Authorization", mockToken)
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
  const mockToken = await tokenUtil.createToken({
    id: "1",
    hashAlgorithm: tokenUtil.HashAlgorithm.HS512,
    ttlSeconds: 60,
  }, config.jwt.key);
  try {
    await superdeno(app.handle.bind(app))
      .post("/v1/patients")
      .set("Authorization", mockToken)
      .send(patientRequestMock)
      .expect(200)
      .expect({ results: { patientId: expectedResult } });
  } finally {
    stubPatientRepository.restore();
  }
});

Deno.test("when call post /v1/patients/result, it should return isSuccess = True", async () => {
  const stubPatientResultRepository = stub(
    PatientRepository,
    "createPatientResultAndUpdatePaientDiagnosticStatus",
    [await undefined],
  );
  const mockToken = await tokenUtil.createToken({
    id: "1",
    hashAlgorithm: tokenUtil.HashAlgorithm.HS512,
    ttlSeconds: 60,
  }, config.jwt.key);

  try {
    await superdeno(app.handle.bind(app))
      .post("/v1/patients/result")
      .set("Authorization", mockToken)
      .send(patientResultRequestMock)
      .expect(200)
      .expect({ results: { isSuccess: true } });
  } finally {
    stubPatientResultRepository.restore();
  }
});
