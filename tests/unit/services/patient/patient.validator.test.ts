import { assertEquals } from "../../../../deps.ts";
import { ExternalRoutingDestinations } from "../../../../src/models/externalRoutingDestination.ts";
import { colinkValidator } from "../../../../src/models/patient/request/validator/colink.validator.ts";
import { wisibleValidator } from "../../../../src/models/patient/request/validator/wisible.validator.ts";
import {
  getCreatePatientValidatorFrom,
  getCreatePatientValidatorsFrom,
} from "../../../../src/services/patient/patient.validator.ts";

Deno.test("getCreatePatientValidatorsFrom should return validators when given external destinations", () => {
  const destinations = [
    ExternalRoutingDestinations.Colink,
    ExternalRoutingDestinations.Wisible,
  ];

  const validator = getCreatePatientValidatorsFrom(destinations);

  assertEquals(validator, [colinkValidator, wisibleValidator]);
});

Deno.test("getCreatePatientValidatorFrom should return validator base on specified external destination when given existing external destination", () => {
  const validator = getCreatePatientValidatorFrom(
    ExternalRoutingDestinations.Colink,
  );

  assertEquals(validator, colinkValidator);
});
