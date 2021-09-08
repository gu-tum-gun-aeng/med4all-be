import { assertEquals } from "../../../../deps.ts";
import { ExternalRoutingDestinations } from "../../../../src/models/externalRoutingDestination.ts";
import { colinkValidator } from "../../../../src/models/patient/request/validator/colink.validator.ts";
import { getCreatePatientValidatorFrom } from "../../../../src/services/patient/patient.validator.ts";

Deno.test("getCreatePatientValidatorFrom should return validator base on specified external destination when given existing external destination", () => {
  const validator = getCreatePatientValidatorFrom(
    ExternalRoutingDestinations.Colink,
  );

  assertEquals(validator, colinkValidator);
});
