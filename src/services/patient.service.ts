import { traceWrapperAsync } from "../utils/trace.util.ts";
import patientRepository from "../dataaccess/database/patient.repository.ts";
import { Patient } from "../models/patient/patient.model.ts";
import { CreatePatientRequest } from "../models/request/patient.request.ts";

export const getPatients = async (): Promise<Patient[]> => {
  return await traceWrapperAsync<Patient[]>(
    () => patientRepository.getAll(),
    "route",
  );
};

export const createPatient = async (patient: CreatePatientRequest) => {
  return await traceWrapperAsync<unknown>(
    () => patientRepository.createPatient(patient),
    "route",
  );
};

// TODO: Implement this to connect to db instead.
// export const addPatients = async (patient: Patient) => {
//   return await 0;
// };

export default {
  getPatients,
  createPatient,
};

// export function patientService(arg0: string, arg1: number) {
//   throw new Error("Function not implemented.");
// }
