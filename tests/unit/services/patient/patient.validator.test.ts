import { assertEquals } from "../../../../deps.ts";
import { ExternalRoutingDestination } from "../../../../src/models/enum/externalRoutingDestination.ts";
import { colinkValidator } from "../../../../src/models/patient/request/validator/colink.validator.ts";
import { wisibleValidator } from "../../../../src/models/patient/request/validator/wisible.validator.ts";
import {
  getCreatePatientValidatorFrom,
  getCreatePatientValidatorsFrom,
} from "../../../../src/services/patient/patient.validator.ts";

Deno.test("getCreatePatientValidatorsFrom should return validators when given external destinations", () => {
  const destinations = [
    ExternalRoutingDestination.Colink,
    ExternalRoutingDestination.Wisible,
  ];

  const validator = getCreatePatientValidatorsFrom(destinations);

  assertEquals(validator, [colinkValidator, wisibleValidator]);
});

Deno.test("getCreatePatientValidatorsFrom should return validators when given external destinations as array of int", () => {
  const destinations: ExternalRoutingDestination[] = [
    2,
    3,
  ];

  const validator = getCreatePatientValidatorsFrom(destinations);

  assertEquals(validator, [colinkValidator, wisibleValidator]);
});

Deno.test("getCreatePatientValidatorFrom should return validator base on specified external destination when given existing external destination", () => {
  const validator = getCreatePatientValidatorFrom(
    ExternalRoutingDestination.Colink,
  );

  assertEquals(validator, colinkValidator);
});
