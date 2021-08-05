import {
  isBool,
  isNumber,
  required,
  ValidationRules,
} from "../../../../deps.ts";

export type CreatePatientResultRequest = {
  patientId: number;
  doctorId: number;
  isApproved: boolean;
  rejectReasonId?: number;
  remark?: string;
};

export const CreatePatientResultRequestValidationSchema: ValidationRules = {
  patientId: [required, isNumber],
  doctorId: [required, isNumber],
  isApproved: [required, isBool],
  rejectReasonId: [isNumber],
};
