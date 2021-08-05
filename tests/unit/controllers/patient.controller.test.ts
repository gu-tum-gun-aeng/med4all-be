// deno-lint-ignore-file no-explicit-any
import { assertEquals, stub } from "../../../deps.ts";
import { testing } from "../../../deps.ts";
import PatientController from "../../../src/controllers/patient.controller.ts";
import PatientRepository from "../../../src/dataaccess/database/patient.repository.ts";
import {
  getMockOnePatient,
  getMockPatients,
} from "../../mock/patient/patient.mock.ts";
import S3Service from "../../../src/services/s3.service.ts";
import {
  patientRequestMock,
  patientRequestMockInvalid,
} from "../../mock/patient/patient.request.mock.ts";
import {
  patientResultRequestMockInvalid,
} from "../../mock/patient/patientResult.request.mock.ts";

Deno.test("PatientController.patients should response with mock data", async () => {
  const expectedResult = await getMockPatients();
  const stubPatientRepository = stub(
    PatientRepository,
    "getAll",
    [getMockPatients()],
  );
  try {
    const mockContext = testing.createMockContext();
    await PatientController.patients(mockContext);
    assertEquals(mockContext.response.body, { results: expectedResult });
  } finally {
    stubPatientRepository.restore();
  }
});

Deno.test("PatientController.getFirstWaitingPatient should response with only 1 patient", async () => {
  const expectedResult = await getMockOnePatient();
  const stubPatientRepository = stub(
    PatientRepository,
    "getFirstWaitingPatient",
    [getMockOnePatient()],
  );
  try {
    const mockContext = testing.createMockContext();
    await PatientController.getFirstWaitingPatient(mockContext);
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
  }
});

Deno.test("PatientController.createPatient should response error if request is not valid", async () => {
  const mockContext = testing.createMockContext();
  (mockContext.request.body as any) = () => ({
    type: "json",
    value: patientRequestMockInvalid,
  });
  try {
    await PatientController.createPatient(mockContext);
  } catch (error) {
    assertEquals(error, {
      status: 500,
      name: "validation errors",
      path: "createPatient",
      param:
        '{"patientName":"","age":0,"weightKg":50,"heightCm":160,"certificateId":"0000000000000","certificateTypeId":1,"certificatePictureUrl":"some-string-without-http","covidTestPictureUrl":"http://some-url.com/some-path/some-file.jpg","address":"address 1","district":"district1","province":"bangkok","zipCode":102200,"medicalInfo":{"value1":["test"],"value2":true}}',
      message:
        '{"patientName":{"required":"patientName is required"},"age":{"minNumber":"age cannot be lower than 15"},"certificatePictureUrl":{"startsWith":"certificatePictureUrl is invalid"},"zipCode":{"maxNumber":"zipCode cannot be higher than 99999"}}',
      type: "internal error",
    });
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

Deno.test("PatientController.createPatientResult should throw error intearnal 500 if patientId is string not a number", async () => {
  const stubPatientController = stub(
    PatientController,
    "createPatientResult",
    [await undefined],
  );
  const mockContext = testing.createMockContext();
  (mockContext.request.body as any) = () => ({
    type: "json",
    value: patientResultRequestMockInvalid,
  });
  try {
    await PatientController.createPatientResult(mockContext);
  } catch (error) {
    assertEquals(error, {
      message: '{"patientId":{"isNumber":"patientId must be a number"}}',
      name: "validation errors",
      param:
        '{"patientId":"36","doctorId":100,"isApproved":true,"rejectReasonId":20}',
      path: "createPatientResult",
      type: "internal error",
      status: 500,
    });
  } finally {
    stubPatientController.restore();
  }
});
