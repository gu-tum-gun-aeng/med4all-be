import { traceWrapperAsync } from "../utils/trace.util.ts";
import patientRepository from "../dataaccess/database/patient.repository.ts";
import patientApiService from "../dataaccess/service/patient-api/patient-api.service.ts";
import { CreatePatientRequest } from "../models/patient/request/patient.request.ts";
import { PatientRegisterStatus } from "../models/patient/response/patientRegisterStatus.response.ts";
import { mapPatientApiRequest } from "../models/patient-api/request/mapper/patient-api.request.mapper.ts";
import { PublishPatientResponse } from "../models/patient-api/response/patient-api.response.model.ts";
import { CreatePatientResponse } from "../models/patient/response/patient.response.ts";
import { CreatePatientErrors } from "../models/errors/createPatient.errors.ts";

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
): Promise<CreatePatientResponse> => {
  if (await isPatientAlreadyRegistered(patient.certificateId)) {
    return {
      error: CreatePatientErrors.PatientAlreadyExistInMed4all,
    };
  }

  const patientId = await savePatientToDb(patient, createdByUserId);

  await publishToPatientApi(patient);

  return {
    patientId: patientId,
  };

  function isPatientAlreadyRegistered(certificateId: string) {
    return traceWrapperAsync<boolean>(
      async () => {
        const registerStatus = await patientRepository.getPatientRegisterStatus(
          certificateId,
        );

        return registerStatus.is_registered;
      },
      "db",
      "createPatient-getPatientRegisterStatus",
    );
  }

  function savePatientToDb(
    patient: CreatePatientRequest,
    createdByUserId: string,
  ) {
    return traceWrapperAsync<number>(
      () => patientRepository.createPatient(patient, createdByUserId),
      "db",
      "createPatient",
    );
  }

  function publishToPatientApi(patient: CreatePatientRequest) {
    return traceWrapperAsync<PublishPatientResponse>(
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
  }
};

export default {
  getPatientRegisterStatus,
  createPatient,
};
