import {
  maxLength,
  minLength,
  required,
  ValidationRules,
} from "../../../../deps.ts";

export type RequestOtpRequest = {
  telephone: string;
};

export const RequestOtpRequestValidationSchema: ValidationRules = {
  telephone: [required, minLength(10), maxLength(10)],
};
