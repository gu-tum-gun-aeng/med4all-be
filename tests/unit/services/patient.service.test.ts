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
  const stubPatientRepositoryCreatePatient = stub(
    PatientRepository,
    "createPatient",
    [await expectedResult],
  );
  const stubPatientRepositoryIsExist = stub(
    PatientRepository,
    "isExist",
    [false],
  );
  try {
    const actualResult = await patientService.createPatient(
      patientRequestMock,
      "20",
    );
    assertEquals(actualResult, expectedResult);
  } finally {
    stubPatientRepositoryCreatePatient.restore();
    stubPatientRepositoryIsExist.restore()
  }
});

Deno.test("createPatient should throw error if the patient already exists", async () => {
  const expectedResult = 10;
  const stubPatientRepositoryCreatePatient = stub(
    PatientRepository,
    "createPatient",
    [await expectedResult],
  );
  const stubPatientRepositoryIsExist = stub(
    PatientRepository,
    "isExist",
    [true],
  );
  try {
    await patientService.createPatient(
      patientRequestMock,
      "20",
    );
  } catch (error) {
    assertEquals(error, {
      status: 500,
      name: "patient already exists",
      path: "create patient",
      param: "",
      message: "patient already exists",
      type: "internal error"
    })
  } finally {
    stubPatientRepositoryCreatePatient.restore();
    stubPatientRepositoryIsExist.restore()
  }
});

// TODO: ESSENTIAL: satisfied this test case
Deno.test("createPatient should throw error if patient api service somehow failed", async () => {
  await assertEquals(true, false)
});
