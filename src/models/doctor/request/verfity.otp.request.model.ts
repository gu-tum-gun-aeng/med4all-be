import {
  maxLength,
  minLength,
  required,
  ValidationRules,
} from "../../../../deps.ts";

export type VerifyOtpRequest = {
  telephone: string;
  requestId: string;
  code: string;
};

export const VerifyOtpRequestValidationSchema: ValidationRules = {
  telephone: [required, minLength(10), maxLength(10)],
  requestId: [required],
  code: [required],
};
