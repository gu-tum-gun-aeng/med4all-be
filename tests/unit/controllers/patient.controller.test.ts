// deno-lint-ignore-file no-explicit-any
import { assertEquals, stub } from "../../../deps.ts";
import { testing } from "../../../deps.ts";
import PatientController from "../../../src/controllers/patient.controller.ts";
import PatientRepository from "../../../src/dataaccess/database/patient.repository.ts";
import { getMockPatients } from "../../mock/patient/patient.mock.ts";
import S3Service from "../../../src/services/s3.service.ts";
import { patientRequestMock } from "../../mock/patient/patient.request.mock.ts";

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
      value: {
        read: () => patientRequestMock,
      },
    });
    await PatientController.createPatient(mockContext);
    assertEquals(mockContext.response.body, {
      results: { patientId: expectedResult },
    });
  } finally {
    stubPatientRepository.restore();
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
