import { ColinkCheckStatusResponse } from "../../colink/response/colink.check-status.response.ts";

export type CreatePatientResponse =
  | CreatePatientDbResponse
  | ColinkCheckStatusResponse;

type CreatePatientDbResponse = {
  patientId: number;
};
