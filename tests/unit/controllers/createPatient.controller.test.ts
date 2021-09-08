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

Deno.test("PatientController.createPatient should response with error patient already register in colink when given patient is already exist in colink system", async () => {
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

  try {
    const mockContext = testing.createMockContext();
    (mockContext.request.body as any) = () => ({
      type: "json",
      value: patientRequestMock,
    });
    await PatientController.createPatient(mockContext);
    assertEquals(mockContext.response.body, {
      results: {
        error: {
          id: 1002,
          message: "Patient is already exist in Colink system.",
        },
      },
    });
  } finally {
    stubPatientRepositoryGetPatientRegisterStatus.restore();
    stubPatientRepository.restore();
    stubPatientApiService.restore();
    stubColinkApiService.restore();
  }
});

Deno.test("PatientController.createPatient should should return error if checkInWhen format is invalid", async () => {
  const invalidRequestMock = {
    ...patientRequestMock,
    checkInWhen: "invalid format",
  };
  await testAndAssertInvalidRequestMessage(invalidRequestMock, "checkInWhen");
});

Deno.test("PatientController.createPatient should should return error if checkOutWhen format is invalid", async () => {
  const invalidRequestMock = {
    ...patientRequestMock,
    checkOutWhen: "invalid format",
  };

  await testAndAssertInvalidRequestMessage(invalidRequestMock, "checkOutWhen");
});

Deno.test("PatientController.createPatient should should return error if labTestWhen format is invalid", async () => {
  const invalidRequestMock = {
    ...patientRequestMock,
    medicalInfo: {
      ...patientRequestMock.medicalInfo,
      labTestWhen: "invalid format",
    },
  };
  await testAndAssertInvalidRequestMessage(invalidRequestMock, "labTestWhen");
});

Deno.test("PatientController.createPatient should should return error if receivedFavipiravirWhen format is invalid", async () => {
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
});

Deno.test("PatientController.createPatient should should return error if secondVaccinatedWhen format is invalid", async () => {
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
});

Deno.test("PatientController.createPatient should should return error if firstSymptomWhen format is invalid", async () => {
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
    assertEquals(
      error.message,
      `{"${fieldName}":{"match":"Date format should be YYYY-MM-DDTHH:MM:SS.sssZ"}}`,
    );
  }
}
