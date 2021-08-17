import { assertEquals } from "../../../../../../deps.ts";
import { mapPatientApiRequest } from "../../../../../../src/models/patient-api/request/mapper/patient-api.request.mapper.ts";
import { PublishPatientRequest } from "../../../../../../src/models/patient-api/request/patient-api.request.model.ts";
import { CreatePatientRequest } from "../../../../../../src/models/patient/request/patient.request.ts";
import {
  foreignPatientRequestMock,
  foreignWithPassportPatientRequestMock,
  thaiPatientRequestMock,
} from "../../../../../mock/patient/patient.request.mock.ts";

Deno.test("mapPatientApiRequest should return publishPatientRequest correctly given Thai National patient request", () => {
  const request: CreatePatientRequest = thaiPatientRequestMock;

  const publishPatientRequest: PublishPatientRequest = mapPatientApiRequest(
    request,
  );

  assertEquals(publishPatientRequest.cdPersonID, request.certificateId);
});

Deno.test("mapPatientApiRequest should return publishPatientRequest correctly given Foreign National patient request", () => {
  const request: CreatePatientRequest = foreignPatientRequestMock;

  const publishPatientRequest: PublishPatientRequest = mapPatientApiRequest(
    request,
  );

  assertEquals(publishPatientRequest.cdPersonForeignID, request.certificateId);
});

Deno.test("mapPatientApiRequest should return publishPatientRequest correctly given Foreign National with Passport patient request", () => {
  const request: CreatePatientRequest = foreignWithPassportPatientRequestMock;

  const publishPatientRequest: PublishPatientRequest = mapPatientApiRequest(
    request,
  );

  assertEquals(publishPatientRequest.cdPersonPassportID, request.certificateId);
});
