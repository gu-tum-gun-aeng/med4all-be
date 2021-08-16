import { traceWrapperAsync } from "../utils/trace.util.ts";
import patientRepository from "../dataaccess/database/patient.repository.ts";
import patientApiService from "../dataaccess/service/patient-api/patient-api.service.ts";
import { Patient } from "../models/patient/patient.model.ts";
import { CreatePatientRequest } from "../models/patient/request/patient.request.ts";
import { CreatePatientResultRequest } from "../models/patient/request/patientResult.request.ts";
import { PatientRegisterStatus } from "../models/patient/response/patientRegisterStatus.response.ts";
import { mapPatientApiRequest } from "../models/patient-api/request/mapper/patient-api.request.mapper.ts";
import { PublishPatientResponse } from "../models/patient-api/response/patient-api.response.model.ts";

export const getPatients = async (): Promise<Patient[]> => {
  return await traceWrapperAsync<Patient[]>(
    () => patientRepository.getAll(),
    "db",
    "getPatients",
  );
};

export const getPatientRegisterStatus = async (
  certificateId: string,
): Promise<PatientRegisterStatus> => {
  return await traceWrapperAsync<PatientRegisterStatus>(
    () => patientRepository.getPatientRegisterStatus(certificateId),
    "db",
    "getPatientRegisterStatus",
  );
};

export const getFirstWaitingPatient = async () => {
  return await traceWrapperAsync<Patient | undefined>(
    () => patientRepository.getFirstWaitingPatient(),
    "db",
    "getFirstWaitingPatient",
  );
};

export const createPatient = async (
  patient: CreatePatientRequest,
  createdByUserId: string,
) => {
  const dbPromise = traceWrapperAsync<number>(
    () => patientRepository.createPatient(patient, createdByUserId),
    "db",
    "createPatient",
  );

  const apiPromise = traceWrapperAsync<PublishPatientResponse>(
    () => patientApiService.publishPatient(mapPatientApiRequest(patient)),
    "externalApi",
    "publishPatient",
  );

  return await Promise.all([dbPromise, apiPromise]);
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
    "db",
    "createPatientResultAndUpdatePaientDiagnosticStatus",
  );
};

export default {
  getPatients,
  getPatientRegisterStatus,
  getFirstWaitingPatient,
  createPatient,
  createPatientResult,
};
