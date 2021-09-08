import { maxLength, minLength, required } from "../../../../deps.ts";
import { Validator } from "../../../utils/validation.util.ts";

export type VerifyOtpRequest = {
  telephone: string;
  requestId: string;
  code: string;
};

export const VerifyOtpRequestValidator: Validator = {
  name: "VerifyOtpRequest validator",
  schema: {
    telephone: [required, minLength(10), maxLength(10)],
    requestId: [required],
    code: [required],
  },
};
