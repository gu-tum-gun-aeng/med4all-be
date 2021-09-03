import {
  CertificateType,
  CreatePatientRequest,
} from "../../patient/request/patient.request.ts";

export type ColinkCheckStatusRequest =
  | PersonalIdColinkCheckStatusRequest
  | PassportColinkCheckStatusRequest
  | NoDocColinkCheckStatusRequest;

export type PersonalIdColinkCheckStatusRequest = {
  cid: string;
};

export type PassportColinkCheckStatusRequest = {
  passport: string;
};

export type NoDocColinkCheckStatusRequest = {
  firstname: string;
  lastname: string;
  "contact_number": string;
};

export const from = (req: CreatePatientRequest): ColinkCheckStatusRequest => {
  if (req.certificateType === CertificateType.PersonalId) {
    return {
      cid: req.certificateId,
    };
  }

  if (req.certificateType === CertificateType.Passport) {
    return {
      passport: req.certificateId,
    };
  }

  return {
    firstname: req.name,
    lastname: req.surname,
    contact_number: req.patientPhone,
  };
};
