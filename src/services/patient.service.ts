import { traceWrapperAsync } from "../utils/trace.util.ts";
import patientRepository from "../dataaccess/database/patient.repository.ts";
import patientApiService from "../dataaccess/service/patient-api/patient-api.service.ts";
import { CreatePatientRequest } from "../models/patient/request/patient.request.ts";
import { PatientRegisterStatus } from "../models/patient/response/patientRegisterStatus.response.ts";
import { mapPatientApiRequest } from "../models/patient-api/request/mapper/patient-api.request.mapper.ts";
import { PublishPatientResponse } from "../models/patient-api/response/patient-api.response.model.ts";

export const getPatientRegisterStatus = async (
  certificateId: string,
): Promise<PatientRegisterStatus> => {
  return await traceWrapperAsync<PatientRegisterStatus>(
    () => patientRepository.getPatientRegisterStatus(certificateId),
    "db",
    "getPatientRegisterStatus",
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
    async () => {
      try {
        return await patientApiService.publishPatient(
          mapPatientApiRequest(patient),
        );
      } catch (error) {
        throw new Error("Cannot send request to patient api. Msg: " + error);
      }
    },
    "externalApi",
    "publishPatient",
  );

  return await Promise.all([dbPromise, apiPromise]);
};

export default {
  getPatientRegisterStatus,
  createPatient,
};
