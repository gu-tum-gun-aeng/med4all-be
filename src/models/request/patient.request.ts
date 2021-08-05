import {
  isNumber,
  maxNumber,
  minLength,
  minNumber,
  required,
  startsWith,
} from "../../../deps.ts";
export type CreatePatientRequest = {
  patientName: string;
  age: number;
  weightKg: number;
  heightCm: number;
  certificateId: string;
  certificateTypeId: number;
  certificatePictureUrl: string;
  covidTestPictureUrl: string;
  address: string;
  district: string;
  province: string;
  zipCode: number;
  medicalInfo?: Record<string, unknown>;
};

export const CreatePatientRequestValidationSchema = {
  patientName: [required, minLength(1)],
  age: [required, isNumber, minNumber(15)],
  weightKg: [required, isNumber],
  heightCm: [required, isNumber],
  certificateId: [required, minLength(1)],
  certificateTypeId: [required, isNumber],
  certificatePictureUrl: [required, startsWith("http"), minLength(1)],
  covidTestPictureUrl: [required, startsWith("http"), minLength(1)],
  address: [required, minLength(1)],
  district: [required, minLength(1)],
  province: [required, minLength(1)],
  zipCode: [required, maxNumber(99999)],
};
