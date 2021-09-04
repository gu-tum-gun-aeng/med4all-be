export type CreatePatientResponse =
  | CreatePatientDbResponse
  | ColinkCheckStatusCamelCaseResponse;

import { ColinkCheckStatusCamelCaseResponse } from "../../colink/response/colink.check-status.response.ts";

type CreatePatientDbResponse = {
  patientId: number;
};
