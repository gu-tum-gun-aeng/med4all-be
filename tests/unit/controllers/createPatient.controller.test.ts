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

Deno.test("PatientController.createPatient should response with expected patientId or colinkCheckStatusResponse", async () => {
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
    stubPatientRepository.restore();
    stubPatientApiService.restore();
    stubColinkApiService.restore();
  }
});

Deno.test("PatientController.createPatient should should return error if checkInDate format is invalid", async () => {
  const invalidRequestMock = {
    ...patientRequestMock,
    checkInDate: "invalid format",
  };
  await testAndAssertInvalidRequestMessage(invalidRequestMock, "checkInDate");
});

Deno.test("PatientController.createPatient should should return error if checkOutDate format is invalid", async () => {
  const invalidRequestMock = {
    ...patientRequestMock,
    checkOutDate: "invalid format",
  };

  await testAndAssertInvalidRequestMessage(invalidRequestMock, "checkOutDate");
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

Deno.test("PatientController.createPatient should should return error if secondVaccinedDate format is invalid", async () => {
  const invalidRequestMock = {
    ...patientRequestMock,
    medicalInfo: {
      ...patientRequestMock.medicalInfo,
      secondVaccinedDate: "invalid format",
    },
  };
  await testAndAssertInvalidRequestMessage(
    invalidRequestMock,
    "secondVaccinedDate",
  );
});

Deno.test("PatientController.createPatient should should return error if firstDateOfSymtom format is invalid", async () => {
  const invalidRequestMock = {
    ...patientRequestMock,
    medicalInfo: {
      ...patientRequestMock.medicalInfo,
      firstDateOfSymtom: "invalid format",
    },
  };
  await testAndAssertInvalidRequestMessage(
    invalidRequestMock,
    "firstDateOfSymtom",
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
    shouldNotReachThisLine();
  } catch (error) {
    assertEquals(
      error.message,
      `{"${fieldName}":{"match":"Date format should be YYYY-MM-DDTHH:MM:SS.sssZ"}}`,
    );
  }
}

function shouldNotReachThisLine() {
  assertEquals(true, false); // Should not reach this line
}
