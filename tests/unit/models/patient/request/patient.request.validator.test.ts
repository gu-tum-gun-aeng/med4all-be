import { assertEquals } from "../../../../../deps.ts";
import {
  ExternalDestinations,
  getCreatePatientValidatorFrom,
} from "../../../../../src/models/patient/request/patient.request.validator.ts";
import { colinkValidator } from "../../../../../src/models/patient/request/validator/colink.validator.ts";

Deno.test("getCreatePatientValidatorFrom should return validator base on specified external destination when given existing external destination", () => {
  const validator = getCreatePatientValidatorFrom(ExternalDestinations.Colink);

  assertEquals(validator, colinkValidator);
});
