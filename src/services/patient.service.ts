import { traceWrapperAsync } from "../utils/trace.util.ts";
import patientRepository from "../dataaccess/database/patient.repository.ts";
import { Patient } from "../models/patient/patient.model.ts";
import { CreatePatientRequest } from "../models/patient/request/patient.request.ts";
import { CreatePatientResultRequest } from "../models/patient/request/patientResult.request.ts";
import { PatientRegisterStatus } from "../models/patient/response/patientRegisterStatus.response.ts";

export const getPatients = async (): Promise<Patient[]> => {
  return await traceWrapperAsync<Patient[]>(
    () => patientRepository.getAll(),
    "route",
  );
};

export const getPatientRegisterStatus = async (
  certificateId: string
): Promise<PatientRegisterStatus> => {
  return await traceWrapperAsync<PatientRegisterStatus>(
    () => patientRepository.getPatienRegisterStatus(certificateId),
    "route",
  );
};

export const getFirstWaitingPatient = async () => {
  return await traceWrapperAsync<Patient | undefined>(
    () => patientRepository.getFirstWaitingPatient(),
    "route",
  );
};

export const createPatient = async (
  patient: CreatePatientRequest,
  createdByUserId: string,
) => {
  return await traceWrapperAsync<number>(
    () => patientRepository.createPatient(patient, createdByUserId),
    "route",
  );
};

export const createPatientResult = async (
  patient: CreatePatientResultRequest,
  createdByUserId: string,
) => {
  return await traceWrapperAsync<void>(
    () =>
      patientRepository.createPatientResultAndUpdatePaientDiagnosticStatus(
        patient,
        createdByUserId,
      ),
    "route",
  );
};

export default {
  getPatients,
  getPatientRegisterStatus,
  getFirstWaitingPatient,
  createPatient,
  createPatientResult,
};
