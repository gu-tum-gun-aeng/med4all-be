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
