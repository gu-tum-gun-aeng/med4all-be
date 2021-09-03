import { traceWrapperAsync } from "../utils/trace.util.ts";
import patientRepository from "../dataaccess/database/patient.repository.ts";
import patientApiService from "../dataaccess/service/patient-api/patient-api.service.ts";
import { CreatePatientRequest } from "../models/patient/request/patient.request.ts";
import { PatientRegisterStatus } from "../models/patient/response/patientRegisterStatus.response.ts";
import { mapPatientApiRequest } from "../models/patient-api/request/mapper/patient-api.request.mapper.ts";
import { PublishPatientResponse } from "../models/patient-api/response/patient-api.response.model.ts";
import ColinkApiService from "../dataaccess/service/colink-api/colink-api.service.ts";
import * as ColinkCheckStatusRequest from "../models/colink/request/colink.check-status.request.ts";
import { ColinkCheckStatusResponse } from "../models/colink/response/colink.check-status.response.ts";
import { CreatePatientResponse } from "../models/patient/response/patient.response.ts";

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
  const publishPatientApiPromise = traceWrapperAsync<PublishPatientResponse>(
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

  const apiColinkCheckStatusPromise = traceWrapperAsync<
    ColinkCheckStatusResponse
  >(
    async () => {
      try {
        return await ColinkApiService.checkStatus(
          ColinkCheckStatusRequest.from(patient),
        );
      } catch (error) {
        throw new Error("Cannot send request to colink api. Msg: " + error);
      }
    },
    "externalApi",
    "colinkCheckStatus",
  );

  const dbResult = await savePatientToDb();
  const colinkCheckStatusResponse = await apiColinkCheckStatusPromise;

  if (colinkCheckStatusResponse.found) {
    return colinkCheckStatusResponse;
  } else {
    await publishPatientApiPromise;

    return {
      patientId: dbResult,
    };
  }

  function savePatientToDb() {
    return traceWrapperAsync<number>(
      () => patientRepository.createPatient(patient, createdByUserId),
      "db",
      "createPatient",
    );
  }
};

export default {
  getPatientRegisterStatus,
  createPatient,
};
