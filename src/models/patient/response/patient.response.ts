import { AppError } from "../../error.ts";

export type CreatePatientResponse = {
  patientId?: number;
  error?: AppError;
};
