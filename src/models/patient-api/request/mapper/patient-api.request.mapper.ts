import {
  CreatePatientRequest,
} from "../../../patient/request/patient.request.ts";
import { PublishPatientRequest } from "../patient-api.request.model.ts";

export const mapPatientApiRequest = (
  createPatientRequest: CreatePatientRequest,
): PublishPatientRequest => {
  return {
    certificateId: createPatientRequest.certificateId,
    certificateType: createPatientRequest.certificateType,
    name: createPatientRequest.name,
    surname: createPatientRequest.surname,
    gender: createPatientRequest.gender,
    ageYear: createPatientRequest.ageYear,
    patientPhone: createPatientRequest.patientPhone,
    custodianPhone: createPatientRequest.custodianPhone,
    weightKg: createPatientRequest.weightKg,
    heightCm: createPatientRequest.heightCm,
    medicalInfo: createPatientRequest.medicalInfo,
    checkInWhen: createPatientRequest.checkInWhen,
    checkOutWhen: createPatientRequest.checkOutWhen,
    address: createPatientRequest.address,
    patientDataSource: createPatientRequest.patientDataSource,
    sourceName: createPatientRequest.sourceName,
    admittedTo: createPatientRequest.admittedTo,
    healthCoverage: createPatientRequest.healthCoverage,
    lineId: createPatientRequest.lineId,
    homeTown: createPatientRequest.homeTown,
    equipments: createPatientRequest.equipments,
    nhsoTicketId: createPatientRequest.nhsoTicketId,
    trustedSource: createPatientRequest.trustedSource,
    riskScore: createPatientRequest.riskScore,
    certificatePictureUrl: createPatientRequest.certificatePictureUrl,
    covidTestPictureUrl: createPatientRequest.covidTestPictureUrl,
  };
};
