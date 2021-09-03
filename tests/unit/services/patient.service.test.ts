import { assertEquals, stub } from "../../../deps.ts";
import PatientRepository from "../../../src/dataaccess/database/patient.repository.ts";
import ColinkApiService from "../../../src/dataaccess/service/colink-api/colink-api.service.ts";
import PatientApiService from "../../../src/dataaccess/service/patient-api/patient-api.service.ts";

import * as patientService from "../../../src/services/patient.service.ts";
import { mockColinkApiCheckStatusResponse } from "../../mock/colink/colink.response.mock.ts";
import { mockPublishPatientResponse } from "../../mock/patient-api/publishPatient.response.mock.ts";
import { patientRequestMock } from "../../mock/patient/patient.request.mock.ts";

Deno.test("getPatientRegisterStatus should return PatientRegisterStatus with is_registered==false if input certificate_id was not found in database", async () => {
  const expectedResult = {
    "is_registered": false,
  };

  const stubPatientRepository = stub(
    PatientRepository,
    "getPatientRegisterStatus",
    [{ "is_registered": false }],
  );

  try {
    const actualResult = await patientService.getPatientRegisterStatus("999");
    assertEquals(actualResult, expectedResult);
  } finally {
    stubPatientRepository.restore();
  }
});

Deno.test("createPatient should return patientId correctly", async () => {
  const expectedResult = await mockColinkApiCheckStatusResponse();

  const stubPatientRepository = stub(
    PatientRepository,
    "createPatient",
    [await 10],
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

  try {
    const patienReponse = await patientService.createPatient(
      patientRequestMock,
      "20",
    );

    assertEquals(patienReponse, expectedResult);
    assertEquals(stubPatientRepository.calls.length, 1);
    assertEquals(stubPatientApiService.calls.length, 1);
    assertEquals(stubColinkApiService.calls.length, 1);
  } finally {
    stubPatientRepository.restore();
    stubPatientApiService.restore();
    stubColinkApiService.restore();
  }
});
