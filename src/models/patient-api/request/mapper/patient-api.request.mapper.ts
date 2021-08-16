import { CreatePatientRequest } from "../../../patient/request/patient.request.ts";
import { PublishPatientRequest } from "../patient-api.request.model.ts";

//TODO implement this
export const mapPatientApiRequest = (
  _createPatientRequest: CreatePatientRequest,
): PublishPatientRequest => {
  return {
    id: 1,
    cdPersonID: "0000000000000",
    cdPersonFirstName: "John",
    cdPersonLastName: "Doe",
    cdPersonAge: 30,
    cdPersonPhone1: "0811231234",
    emPatientCommitStatusCode: 1,
    crProvinceCode: "00",
    crAmpurCode: "01",
    createdAt: new Date(),
  };
};
