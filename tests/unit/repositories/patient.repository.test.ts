import { assertEquals, assertSpyCalls, stub } from "../../../deps.ts";
import patientRepository from "../../../src/dataaccess/database/patient.repository.ts";
import DbUtil from "../../../src/utils/db.util.ts";
import { Query } from "../../../src/utils/db.util.ts";
import {
  getMockOnePatient,
  getMockPatients,
} from "../../mock/patient/patient.mock.ts";
import {
  getPatientIdMock,
  patientRequestMock,
} from "../../mock/patient/patient.request.mock.ts";

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

Deno.test("getFirstWaitingPatient should return only 1 patient", async () => {
  const expectedResult = await getMockOnePatient();
  const stubPatient = stub(
    DbUtil,
    "queryOneObject",
    [getMockOnePatient()],
  );

  try {
    const actualResult = await patientRepository.getFirstWaitingPatient();
    assertEquals(actualResult, expectedResult);
    assertSpyCalls(stubPatient, 1);
  } finally {
    stubPatient.restore();
  }
});

Deno.test("createPatient should insert patient and address to database", async () => {
  const expectedResult = 10;
  const stubPatientId = stub(
    DbUtil,
    "queryOneObject",
    [getPatientIdMock()],
  );
  const stubExecuteTransactional = stub(
    DbUtil,
    "excuteTransactional",
    [await undefined],
  );

  try {
    const actualResult = await patientRepository.createPatient(
      patientRequestMock,
    );
    assertEquals(actualResult, expectedResult);
    const queryPatient: Query = stubExecuteTransactional.calls[0].args[0][0];
    const queryAddress: Query = stubExecuteTransactional.calls[0].args[0][1];
    assertEquals(queryPatient.args[0], 10n);
    assertEquals(queryAddress.args[0], 10n);
  } finally {
    stubPatientId.restore();
    stubExecuteTransactional.restore();
  }
});
