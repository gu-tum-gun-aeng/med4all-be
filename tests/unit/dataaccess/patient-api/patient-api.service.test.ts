import patientApiService from "../../../../src/dataaccess/service/patient-api/patient-api.service.ts";
import { assertThrowsAsync, ky } from "../../../../deps.ts";
import { assertEquals, stub } from "../../../../deps.ts";
import { PublishPatientResponse } from "../../../../src/models/patient-api/response/patient-api.response.model.ts";
import { publishPatientRequestMock } from "../../../mock/patient-api/publishPatient.request.mock.ts";

Deno.test("createPatient should post http request to patient-api endpoint", async () => {
  const expectedResult: PublishPatientResponse = {
    data: publishPatientRequestMock,
    message: "success",
  };

  const stubKy = stub(ky, "post", [{
    json: () => expectedResult,
  }]);

  const result = await patientApiService.publishPatient(
    publishPatientRequestMock,
  );
  assertEquals(result, expectedResult);

  stubKy.restore();
});

Deno.test("createPatient should post http request to patient-api endpoint", () => {
  const stubKy = stub(ky, "post", () => {
    throw new Error("Panic! Threw Error");
  });

  assertThrowsAsync(
    () => patientApiService.publishPatient(publishPatientRequestMock),
    Error,
    "Panic! Threw Error",
  );

  stubKy.restore();
});
