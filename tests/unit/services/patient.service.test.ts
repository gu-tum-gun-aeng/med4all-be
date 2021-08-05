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

Deno.test("getFirstPendingPatient should return 1 patient", async () => {
  const expectedResult = await getMockOnePatient();
  const stubPatientRepository = stub(
    PatientRepository,
    "getFirstPendingPatient",
    [getMockOnePatient()],
  );
  try {
    const actualResult = await patientService.getFirstPendingPatient();
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
    const actualResult = await patientService.createPatient(patientRequestMock);
    assertEquals(actualResult, expectedResult);
  } finally {
    stubPatientRepository.restore();
  }
});
