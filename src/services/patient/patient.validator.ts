import { ExternalRoutingDestination } from "../../models/enum/externalRoutingDestination.ts";
import { colinkValidator } from "../../models/patient/request/validator/colink.validator.ts";
import { createPatientDefaultValidator } from "../../models/patient/request/validator/default.validator.ts";
import { wisibleValidator } from "../../models/patient/request/validator/wisible.validator.ts";
import { Validator } from "../../utils/validation.util.ts";

export function getCreatePatientValidatorsFrom(
  destinations: ExternalRoutingDestination[],
): Validator[] {
  return destinations.map((destination) => {
    return getCreatePatientValidatorFrom(destination);
  });
}

export function getCreatePatientValidatorFrom(
  destination: ExternalRoutingDestination,
): Validator {
  switch (destination) {
    case ExternalRoutingDestination.Default:
      return createPatientDefaultValidator;
    case ExternalRoutingDestination.Colink:
      return colinkValidator;
    case ExternalRoutingDestination.Wisible:
      return wisibleValidator;
    default:
      return createPatientDefaultValidator;
  }
}
