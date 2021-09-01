import { PublishPatientRequest } from "../../../src/models/patient-api/request/patient-api.request.model.ts";
import { CertificateType } from "../../../src/models/patient/request/patient.request.ts";

export const publishPatientRequestMock: PublishPatientRequest = {
  certificateId: "123456",
  certificateType: CertificateType.PersonalId,
  name: "Bruno",
  surname: "Fernandes",
};
