import {
  Address,
  CertificateType,
  MedicalInfo,
} from "../../patient/request/patient.request.ts";

export type PublishPatientRequest = {
  certificateId: string;
  certificateType: CertificateType;
  name: string;
  surname: string;
  gender?: number;
  ageYear?: number;
  patientPhone?: string;
  custodianPhone?: string;
  weightKg?: number;
  heightCm?: number;
  medicalInfo?: MedicalInfo;
  checkInDate?: string;
  checkOutDate?: string;
  address?: Address;
  patientDataSource?: number;
  sourceLocation?: string;
  admittedTo?: string;
  healthCoverage?: number;
  lineId?: string;
  homeTown?: number;
  equipments?: string[];
  certificatePictureUrl?: string;
  covidTestPictureUrl?: string;
};
