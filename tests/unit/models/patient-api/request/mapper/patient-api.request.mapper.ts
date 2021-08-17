import { mapPatientApiRequest } from "../../../../../../src/models/patient-api/request/mapper/patient-api.request.mapper.ts";
import { PublishPatientRequest } from "../../../../../../src/models/patient-api/request/patient-api.request.model.ts";
import { CreatePatientRequest } from "../../../../../../src/models/patient/request/patient.request.ts";
import { patientRequestMock } from "../../../../../mock/patient/patient.request.mock.ts";

Deno.test("mapPatientApiRequest should return PublishPatientRequest correctly given Thai National patient request", () => {
  const request: CreatePatientRequest = patientRequestMock;

  const _res: PublishPatientRequest = mapPatientApiRequest(request);
});
