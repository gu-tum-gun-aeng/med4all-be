import config from "../../../config/config.ts";
import { ky } from "../../../../deps.ts";
import { CreatePatientRequest } from "../../../models/patient-api/request/patient-api.request.model.ts";
import { CreatePatientResponse } from "../../../models/patient-api/response/patient-api.response.model.ts";

const PatientApiService = {
  createPatient: (
    request: CreatePatientRequest,
  ): Promise<CreatePatientResponse> => {
    const url = `${config.patientApiUrl}/patient`;
    return ky.post(url, {
      json: request,
    }).json<CreatePatientResponse>();
  },
};

export default PatientApiService;
