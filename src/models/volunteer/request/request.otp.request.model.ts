import { maxLength, minLength, required } from "../../../../deps.ts";
import { Validator } from "../../../utils/validation.util.ts";

export type RequestOtpRequest = {
  telephone: string;
};

export const requestOtpValidator: Validator = {
  name: "Request OTP validator",
  schema: {
    telephone: [required, minLength(10), maxLength(10)],
  },
};
