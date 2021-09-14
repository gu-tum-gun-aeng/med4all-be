// deno-lint-ignore-file no-explicit-any
import { assertEquals, stub } from "../../../deps.ts";
import { testing } from "../../../deps.ts";
import PatientController from "../../../src/controllers/patient.controller.ts";
import PatientRepository from "../../../src/dataaccess/database/patient.repository.ts";
import { patientRequestMock } from "../../mock/patient/patient.request.mock.ts";
import PatientApiService from "../../../src/dataaccess/service/patient-api/patient-api.service.ts";
import { mockPublishPatientResponse } from "../../mock/patient-api/publishPatient.response.mock.ts";
import { CreatePatientRequest } from "../../../src/models/patient/request/patient.request.ts";
import ColinkApiService from "../../../src/dataaccess/service/colink-api/colink-api.service.ts";
import { mockColinkApiCheckStatusDuplicatePatientResponse } from "../../mock/colink/colink.response.mock.ts";
import { assertShouldNotReachThisLine } from "../../helper/assert.ts";
import VolunteerRepository from "../../../src/dataaccess/database/volunteer.repository.ts";
import {
  mockInvalidTeamVolunteer,
  mockVolunteer,
} from "../../mock/volunteer/volunteer.mock.ts";

Deno.test("PatientController.createPatient should response with error when there is no match between volunteer team and destination config", async () => {
  const stubPatientRepositoryGetPatientRegisterStatus = stub(
    PatientRepository,
    "getPatientRegisterStatus",
    [await { is_registered: false }],
  );

  const colinkCheckStatusResponseAsPatientAlreadyExist =
    await mockColinkApiCheckStatusDuplicatePatientResponse();

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
    [colinkCheckStatusResponseAsPatientAlreadyExist],
  );

  const stubVolunteerRepository = stub(
    VolunteerRepository,
    "getVolunteerById",
    await mockInvalidTeamVolunteer,
  );

  try {
    const mockContext = testing.createMockContext();
    (mockContext.request.body as any) = () => ({
      type: "json",
      value: patientRequestMock,
    });
    await PatientController.createPatient(mockContext);
  } catch (err) {
    assertEquals(
      err.message,
      "Cannot get external routing destination. Either volunteer team is invalid or the team routing destination is missing.",
    );
  } finally {
    stubPatientRepositoryGetPatientRegisterStatus.restore();
    stubPatientRepository.restore();
    stubPatientApiService.restore();
    stubColinkApiService.restore();
    stubVolunteerRepository.restore();
  }
});

Deno.test("PatientController.createPatient should should return error if checkInWhen format is invalid", async () => {
  const stubVolunteerRepository = stub(
    VolunteerRepository,
    "getVolunteerById",
    await mockVolunteer,
  );

  try {
    const invalidRequestMock = {
      ...patientRequestMock,
      checkInWhen: "invalid format",
    };
    await testAndAssertInvalidRequestMessage(invalidRequestMock, "checkInWhen");
  } finally {
    stubVolunteerRepository.restore();
  }
});

Deno.test("PatientController.createPatient should return error if checkOutWhen format is invalid", async () => {
  const stubVolunteerRepository = stub(
    VolunteerRepository,
    "getVolunteerById",
    await mockVolunteer,
  );

  try {
    const invalidRequestMock = {
      ...patientRequestMock,
      checkOutWhen: "invalid format",
    };

    await testAndAssertInvalidRequestMessage(
      invalidRequestMock,
      "checkOutWhen",
    );
  } finally {
    stubVolunteerRepository.restore();
  }
});

Deno.test("PatientController.createPatient should return error if labTestWhen format is invalid", async () => {
  const stubVolunteerRepository = stub(
    VolunteerRepository,
    "getVolunteerById",
    await mockVolunteer,
  );

  try {
    const invalidRequestMock = {
      ...patientRequestMock,
      medicalInfo: {
        ...patientRequestMock.medicalInfo,
        labTestWhen: "invalid format",
      },
    };
    await testAndAssertInvalidRequestMessage(invalidRequestMock, "labTestWhen");
  } finally {
    stubVolunteerRepository.restore();
  }
});

Deno.test("PatientController.createPatient should return error if receivedFavipiravirWhen format is invalid", async () => {
  const stubVolunteerRepository = stub(
    VolunteerRepository,
    "getVolunteerById",
    await mockVolunteer,
  );

  try {
    const invalidRequestMock = {
      ...patientRequestMock,
      medicalInfo: {
        ...patientRequestMock.medicalInfo,
        receivedFavipiravirWhen: "invalid format",
      },
    };
    await testAndAssertInvalidRequestMessage(
      invalidRequestMock,
      "receivedFavipiravirWhen",
    );
  } finally {
    stubVolunteerRepository.restore();
  }
});

Deno.test("PatientController.createPatient should return error if secondVaccinatedWhen format is invalid", async () => {
  const stubVolunteerRepository = stub(
    VolunteerRepository,
    "getVolunteerById",
    await mockVolunteer,
  );

  try {
    const invalidRequestMock = {
      ...patientRequestMock,
      medicalInfo: {
        ...patientRequestMock.medicalInfo,
        secondVaccinatedWhen: "invalid format",
      },
    };
    await testAndAssertInvalidRequestMessage(
      invalidRequestMock,
      "secondVaccinatedWhen",
    );
  } finally {
    stubVolunteerRepository.restore();
  }
});

Deno.test("PatientController.createPatient should return error if firstSymptomWhen format is invalid", async () => {
  const stubVolunteerRepository = stub(
    VolunteerRepository,
    "getVolunteerById",
    await mockVolunteer,
  );

  try {
    const invalidRequestMock = {
      ...patientRequestMock,
      medicalInfo: {
        firstSymptomWhen: "invalid format",
      },
    };
    await testAndAssertInvalidRequestMessage(
      invalidRequestMock,
      "firstSymptomWhen",
    );
  } finally {
    stubVolunteerRepository.restore();
  }
});

async function testAndAssertInvalidRequestMessage(
  invalidRequest: CreatePatientRequest,
  fieldName: string,
) {
  const mockContext = testing.createMockContext();
  (mockContext.request.body as any) = () => ({
    type: "json",
    value: invalidRequest,
  });

  try {
    await PatientController.createPatient(mockContext);
    assertShouldNotReachThisLine();
  } catch (error) {
    const errMsg: string = error.message;
    assertEquals(
      errMsg.includes(
        `{"${fieldName}":{"match":"Date format should be YYYY-MM-DDTHH:MM:SS.sssZ"}}`,
      ),
      true,
    );
  }
}
