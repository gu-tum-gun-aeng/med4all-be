import { assertEquals, stub } from "../../../../deps.ts";
import patientRepository from "../../../../src/dataaccess/database/patient.repository.ts";
import DbUtil from "../../../../src/utils/db.util.ts";
import { Query } from "../../../../src/utils/db.util.ts";
import {
  getPatientIdMock,
  patientRequestMock,
} from "../../../mock/patient/patient.request.mock.ts";


Deno.test("getPatientRegisterStatus should query status of input certificate_id and return is_registered == false if certificate_id was not found", async () => {
  const expectedResult = {
    "is_registered": false,
  };
  const stubPatientRepository = stub(
    DbUtil,
    "queryOneObject",
    [undefined],
  );
  try {
    const actualResult = await patientRepository.getPatientRegisterStatus(
      "999",
    );
    assertEquals(actualResult, expectedResult);
  } finally {
    stubPatientRepository.restore();
  }
});

Deno.test("getPatientRegisterStatus should query status of input certificate_id and return is_registered == true if certificate_id was found", async () => {
  const expectedResult = {
    "is_registered": true,
    "volunteer_name": "Krittipong",
    "volunteer_team": "AVA",
    "created_when": new Date("2019-01-16"),
  };
  const stubPatientRepository = stub(
    DbUtil,
    "queryOneObject",
    [{
      "is_registered": true,
      "volunteer_name": "Krittipong",
      "volunteer_team": "AVA",
      "created_when": new Date("2019-01-16"),
    }],
  );
  try {
    const actualResult = await patientRepository.getPatientRegisterStatus(
      "999",
    );
    assertEquals(actualResult, expectedResult);
  } finally {
    stubPatientRepository.restore();
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
      "20",
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
