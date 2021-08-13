import { traceWrapperAsync } from "../utils/trace.util.ts";
import patientRepository from "../dataaccess/database/patient.repository.ts";
import { Patient } from "../models/patient/patient.model.ts";
import { CreatePatientRequest } from "../models/patient/request/patient.request.ts";
import { CreatePatientResultRequest } from "../models/patient/request/patientResult.request.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import patientService from "../dataaccess/service/patient/patient.service.ts";

/**
 * @deprecated
 */
export const getPatients = async (): Promise<Patient[]> => {
  return await traceWrapperAsync<Patient[]>(
    () => patientRepository.getAll(),
    "route",
  );
};

// TODO: Implement this (later).
export const getPatientsFromVolunteer = async (
  volunteerId: string,
): Promise<Patient[]> => {
  return [];
};

/**
 * @deprecated
 */
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
  const computation = async () => {
    if (await patientRepository.isExist(patient.certificateId)) {
      throwError({
        status: 500,
        name: "patient already exists",
        path: "create patient",
        param: "",
        message: "patient already exists",
        type: "internal error",
      });
    }
  
    if (!(await patientService.createPatient(patient))) {
      throwError({
        status: 500,
        name: "creating patient failed.",
        path: "create patient",
        param: "",
        message: "patient already exists",
        type: "internal error",
      });
    }
  
    return patientRepository.createPatient(patient, createdByUserId)
  }

  return await traceWrapperAsync<number>(
    computation,
    "route",
  );
};

/**
 * @deprecated
 */
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
  getFirstWaitingPatient,
  createPatient,
  createPatientResult,
};
