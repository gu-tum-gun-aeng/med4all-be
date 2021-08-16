import config from "../../../config/config.ts";
import { ky } from "../../../../deps.ts";
import { PublishPatientRequest } from "../../../models/patient-api/request/patient-api.request.model.ts";
import { PublishPatientResponse } from "../../../models/patient-api/response/patient-api.response.model.ts";

const PatientApiService = {
  publishPatient: (
    request: PublishPatientRequest,
  ): Promise<PublishPatientResponse> => {
    const url = `${config.patientApiUrl}/patient`;
    return ky.post(url, {
      json: request,
    }).json<PublishPatientResponse>();
  },
};

export default PatientApiService;
