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
  return await traceWrapperAsync<number>(
    () => patientRepository.createPatient(patient),
    "route",
  );
};

export default {
  getPatients,
  createPatient,
};
