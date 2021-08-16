// deno-lint-ignore-file no-explicit-any
import { assertEquals, stub } from "../../../deps.ts";
import { testing } from "../../../deps.ts";
import PatientController from "../../../src/controllers/patient.controller.ts";
import PatientRepository from "../../../src/dataaccess/database/patient.repository.ts";
import S3Service from "../../../src/services/s3.service.ts";
import {
  patientRequestMock,
} from "../../mock/patient/patient.request.mock.ts";
import { MockContextOptions } from "https://deno.land/x/oak@v7.6.3/testing.ts";
import PatientApiService from "../../../src/dataaccess/service/patient-api/patient-api.service.ts";
import { mockPublishPatientResponse } from "../../mock/patient-api/publishPatient.response.mock.ts";

Deno.test("PatientController.getPatientRegisterStatus should response PatientRegisterStatus with is_registered==false if input certificate_id was not found in database", async () => {
  const expectedResult = {
    "is_registered": false,
  };
  const stubPatientRepository = stub(
    PatientRepository,
    "getPatientRegisterStatus",
    [{ "is_registered": false }],
  );
  try {
    const mockContextOptions: MockContextOptions = {
      params: {
        certificateId: "999",
      },
    };
    const mockContext = testing.createMockContext(mockContextOptions);
    await PatientController.getPatientRegisterStatus(mockContext);
    assertEquals(mockContext.response.body, { results: expectedResult });
  } finally {
    stubPatientRepository.restore();
  }
});

Deno.test("PatientController.createPatient should response with expected patientId", async () => {
  const expectedResult = 10;
  const stubPatientRepository = stub(
    PatientRepository,
    "createPatient",
    [await expectedResult],
  );
  const stubPatientApiService = stub(
    PatientApiService,
    "publishPatient",
    [await mockPublishPatientResponse],
  );

  try {
    const mockContext = testing.createMockContext();
    (mockContext.request.body as any) = () => ({
      type: "json",
      value: patientRequestMock,
    });
    await PatientController.createPatient(mockContext);
    assertEquals(mockContext.response.body, {
      results: { patientId: expectedResult },
    });
  } finally {
    stubPatientRepository.restore();
    stubPatientApiService.restore();
  }
});

Deno.test("PatientController should throw error intearnal 500 if no image data", async () => {
  const mockContext = testing.createMockContext();
  (mockContext.request.body as any) = () => ({
    type: "form-data",
    value: {
      read: () => null,
    },
  });
  try {
    await PatientController.uploadImagesByFormData(mockContext);
  } catch (error) {
    assertEquals(error, {
      message: "images not found",
      name: "images not found",
      param: "",
      path: "uploads",
      status: 500,
      type: "internal error",
    });
  }
});

Deno.test("PatientController should get response 200 ok if has image data", async () => {
  const stubS3ServiceUploadFile: any = stub(S3Service, "uploadFileToS3");
  stubS3ServiceUploadFile.returns.push(["fake-response-from-s3"]);

  const mockContext = testing.createMockContext();
  (mockContext.request.body as any) = () => ({
    type: "form-data",
    value: {
      read: () => ({
        files: [{ contentType: "image/jpeg" }],
      }),
    },
  });
  try {
    await PatientController.uploadImagesByFormData(mockContext);
    assertEquals(mockContext.response.body, {
      results: ["fake-response-from-s3"],
    });
    assertEquals(mockContext.response.status, 200);
  } finally {
    stubS3ServiceUploadFile.restore();
  }
});


