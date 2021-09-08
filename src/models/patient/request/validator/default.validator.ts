import {
  isIn,
  isNumber,
  isString,
  match,
  required,
} from "../../../../../deps.ts";
import { Validator } from "../../../../utils/validation.util.ts";

const regexIso8601 =
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(\.\d+)*([+-][0-2]\d:[0-5]\d|Z)/;
const dateFormatErrorMessage = "Date format should be YYYY-MM-DDTHH:MM:SS.sssZ";

export const createPatientDefaultValidator: Validator = {
  name: "Create patient default validator",
  schema: {
    certificateId: [required, isString],
    certificateType: [required, isNumber, isIn([1, 2, 3, 4])],
    name: [required, isString],
    surname: [required, isString],
    patientPhone: [required, isString],
    checkInWhen: [match(regexIso8601, true)],
    checkOutWhen: [match(regexIso8601, true)],
    labTestWhen: [match(regexIso8601, true)],
    receivedFavipiravirWhen: [match(regexIso8601, true)],
    firstVaccinatedWhen: [match(regexIso8601, true)],
    secondVaccinatedWhen: [match(regexIso8601, true)],
    firstSymptomWhen: [match(regexIso8601, true)],
  },
  options: {
    messages: {
      "checkInWhen.match": dateFormatErrorMessage,
      "checkOutWhen.match": dateFormatErrorMessage,
      "labTestWhen.match": dateFormatErrorMessage,
      "receivedFavipiravirWhen.match": dateFormatErrorMessage,
      "firstVaccinatedWhen.match": dateFormatErrorMessage,
      "secondVaccinatedWhen.match": dateFormatErrorMessage,
      "firstSymptomWhen.match": dateFormatErrorMessage,
    },
  },
};
