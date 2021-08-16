import { PublishPatientRequest } from "../request/patient-api.request.model.ts";

export type PublishPatientResponse = {
  data: PublishPatientRequest;
  message: string;
};
