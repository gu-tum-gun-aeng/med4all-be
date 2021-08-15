import { CreatePatientRequest } from "../request/patient-api.request.model.ts";

export type CreatePatientResponse = {
  data: CreatePatientRequest;
  message: string;
};
