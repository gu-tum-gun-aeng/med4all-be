import { ExternalRoutingDestinations } from "../../models/enum/externalRoutingDestination.ts";
import { colinkValidator } from "../../models/patient/request/validator/colink.validator.ts";
import { createPatientDefaultValidator } from "../../models/patient/request/validator/default.validator.ts";
import { wisibleValidator } from "../../models/patient/request/validator/wisible.validator.ts";
import { Validator } from "../../utils/validation.util.ts";

export function getCreatePatientValidatorsFrom(
  destinations: ExternalRoutingDestinations[],
): Validator[] {
  return destinations.map((destination) => {
    return getCreatePatientValidatorFrom(destination);
  });
}

export function getCreatePatientValidatorFrom(
  destination: ExternalRoutingDestinations,
): Validator {
  switch (destination) {
    case ExternalRoutingDestinations.Default:
      return createPatientDefaultValidator;
    case ExternalRoutingDestinations.Colink:
      return colinkValidator;
    case ExternalRoutingDestinations.Wisible:
      return wisibleValidator;
    default:
      return createPatientDefaultValidator;
  }
}
