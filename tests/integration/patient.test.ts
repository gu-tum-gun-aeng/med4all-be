import { superdeno } from "../../deps.ts";
import app from "../../src/app.ts";
import PatientRepository from "../../src/dataaccess/database/patient.repository.ts";
import PatientApiService from "../../src/dataaccess/service/patient-api/patient-api.service.ts";
import { stub } from "../../deps.ts";
import { patientRequestMock } from "../mock/patient/patient.request.mock.ts";
import * as tokenUtil from "../../src/utils/token/token.util.ts";
import config from "../../src/config/config.ts";
import { mockPublishPatientResponse } from "../mock/patient-api/publishPatient.response.mock.ts";
import ColinkApiService from "../../src/dataaccess/service/colink-api/colink-api.service.ts";
import { mockColinkApiCheckStatusResponse } from "../mock/colink/colink.response.mock.ts";

Deno.test("when call /v1/patients with invalid token, it should return 401", async () => {
  const mockToken = "FAKE_TOKEN";
  await superdeno(app.handle.bind(app))
    .get("/v1/patients/1/register-status")
    .set("Authorization", `Bearer ${mockToken}`)
    .expect(401);
});

Deno.test("when call /v1/patients without Authorization header, it should return 401", async () => {
  await superdeno(app.handle.bind(app))
    .get("/v1/patients/:certificateId/register-status")
    .expect(401);
});

Deno.test("when call post /v1/patient, it should return result with patientId or colinkCheckStatusReponse", async () => {
  const expectedResult = await mockColinkApiCheckStatusResponse();
  const stubPatientRepository = stub(
    PatientRepository,
    "createPatient",
    [10],
  );

  const stubPatientApiService = stub(
    PatientApiService,
    "publishPatient",
    [await mockPublishPatientResponse],
  );

  const stubColinkApiService = stub(
    ColinkApiService,
    "checkStatus",
    [expectedResult],
  );

  const mockToken = await tokenUtil.createToken({
    id: "1",
    hashAlgorithm: tokenUtil.HashAlgorithm.HS512,
    ttlSeconds: 60,
  }, config.jwt.key);
  try {
    await superdeno(app.handle.bind(app))
      .post("/v1/patients")
      .set("Authorization", `Bearer ${mockToken}`)
      .send(patientRequestMock)
      .expect(200)
      .expect({ results: expectedResult });
  } finally {
    stubPatientRepository.restore();
    stubPatientApiService.restore();
    stubColinkApiService.restore();
  }
});
