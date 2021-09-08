import { Validator } from "../../../utils/validation.util.ts";
import { colinkValidator } from "./validator/colink.validator.ts";
import { createPatientDefaultValidator } from "./validator/default.validator.ts";
import { wisibleValidator } from "./validator/wisible.validator.ts";

export enum ExternalDestinations {
  Colink = 1,
  Wisible = 2,
}

export function getCreatePatientValidatorFrom(
  destination: ExternalDestinations,
): Validator {
  switch (destination) {
    case ExternalDestinations.Colink:
      return colinkValidator;
    case ExternalDestinations.Wisible:
      return wisibleValidator;
    default:
      return createPatientDefaultValidator;
  }
}
