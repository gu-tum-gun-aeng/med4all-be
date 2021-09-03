import { ColinkCheckStatusCamelCaseResponse } from "../../colink/response/colink.check-status.response.ts";

export type CreatePatientResponse =
  | CreatePatientDbResponse
  | ColinkCheckStatusCamelCaseResponse;

type CreatePatientDbResponse = {
  patientId: number;
};
