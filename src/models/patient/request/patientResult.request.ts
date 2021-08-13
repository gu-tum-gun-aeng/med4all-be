import {
  isBool,
  isNumber,
  required,
  ValidationRules,
} from "../../../../deps.ts";

export type CreatePatientResultRequest = {
  patientId: number;
  volunteerId: number;
  isApproved: boolean;
  rejectReasonId?: number;
  remark?: string;
};

export const CreatePatientResultRequestValidationSchema: ValidationRules = {
  patientId: [required, isNumber],
  volunteerId: [required, isNumber],
  isApproved: [required, isBool],
  rejectReasonId: [isNumber],
};
