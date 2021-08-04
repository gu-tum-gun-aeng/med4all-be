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
  zipCode: string;
  medicalInfo?: Record<string, unknown>;
};
