import patientApiService from "../../../../src/dataaccess/service/patient-api/patient-api.service.ts";
import { CreatePatientRequest } from "../../../../src/models/patient-api/request/patient-api.request.model.ts";
import { assertThrowsAsync, ky } from "../../../../deps.ts";
import { assertEquals, stub } from "../../../../deps.ts";
import { CreatePatientResponse } from "../../../../src/models/patient-api/response/patient-api.response.model.ts";

Deno.test("createPatient should post http request to patient-api endpoint", async () => {
  const now = new Date();

  const request: CreatePatientRequest = {
    id: 1,
    cdPersonID: "0000000000000",
    cdPersonFirstName: "John",
    cdPersonLastName: "Doe",
    cdPersonAge: 30,
    cdPersonPhone1: "0811231234",
    emPatientCommitStatusCode: 1,
    crProvinceCode: "00",
    crAmpurCode: "01",
    createdAt: now,
  };

  const expectedResult: CreatePatientResponse = {
    data: request,
    message: "success",
  };

  const stubKy = stub(ky, "post", [{
    json: () => expectedResult,
  }]);

  const result = await patientApiService.createPatient(request);
  assertEquals(result, expectedResult);

  stubKy.restore();
});

Deno.test("createPatient should post http request to patient-api endpoint", () => {
  const now = new Date();

  const request: CreatePatientRequest = {
    id: 1,
    cdPersonID: "0000000000000",
    cdPersonFirstName: "John",
    cdPersonLastName: "Doe",
    cdPersonAge: 30,
    cdPersonPhone1: "0811231234",
    emPatientCommitStatusCode: 1,
    crProvinceCode: "00",
    crAmpurCode: "01",
    createdAt: now,
  };

  const stubKy = stub(ky, "post", () => {
    throw new Error("Panic! Threw Error");
  });

  assertThrowsAsync(
    () => patientApiService.createPatient(request),
    Error,
    "Panic! Threw Error",
  );

  stubKy.restore();
});
