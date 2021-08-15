import { assertEquals, stub } from "../../../deps.ts";
import PatientRepository from "../../../src/dataaccess/database/patient.repository.ts";

import * as patientService from "../../../src/services/patient.service.ts";
import {
  getMockOnePatient,
  getMockPatients,
} from "../../mock/patient/patient.mock.ts";
import { patientRequestMock } from "../../mock/patient/patient.request.mock.ts";

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

Deno.test("getPatientRegisterStatus should return PatientRegisterStatus with is_registered==false if input certificate_id was not found in database", async () => {
  const expectedResult = {
    "is_registered": false,
  };
  const stubPatientRepository = stub(
    PatientRepository,
    "getPatienRegisterStatus",
    [{ "is_registered": false }],
  );
  try {
    const actualResult = await patientService.getPatientRegisterStatus("999");
    assertEquals(actualResult, expectedResult);
  } finally {
    stubPatientRepository.restore();
  }
});

Deno.test("getFirstWaitingPatient should return 1 patient", async () => {
  const expectedResult = await getMockOnePatient();
  const stubPatientRepository = stub(
    PatientRepository,
    "getFirstWaitingPatient",
    [getMockOnePatient()],
  );
  try {
    const actualResult = await patientService.getFirstWaitingPatient();
    assertEquals(actualResult, expectedResult);
  } finally {
    stubPatientRepository.restore();
  }
});

Deno.test("createPatient should return patientId correctly", async () => {
  const expectedResult = 10;
  const stubPatientRepository = stub(
    PatientRepository,
    "createPatient",
    [await expectedResult],
  );
  try {
    const actualResult = await patientService.createPatient(
      patientRequestMock,
      "20",
    );
    assertEquals(actualResult, expectedResult);
  } finally {
    stubPatientRepository.restore();
  }
});
