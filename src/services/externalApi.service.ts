import { Patient } from "../models/patient.model.ts";
import { traceWrapper } from "../utils/trace.util.ts";

export const getPatients = async (): Promise<Patient[]> => {
  const getPatients = async () => await [];
  return await traceWrapper<Patient[]>(
    getPatients,
    "externalApi",
  );
};
