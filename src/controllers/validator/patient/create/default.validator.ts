import { isIn, isNumber, isString, required } from "../../../../../deps.ts";

export const createPatientDefaultValidator = {
  name: "Create patient default validator",
  schema: {
    certificateId: [required, isString],
    certificateType: [required, isNumber, isIn([1, 2, 3, 4])],
    name: [required, isString],
    surname: [required, isString],
    patientPhone: [required, isString],
  },
};
