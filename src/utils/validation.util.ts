import { validate, ValidationOptions, ValidationRules } from "../../deps.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";

export async function validateFor(
  input: Record<string, unknown> | undefined,
  validators: Array<Validator>,
  path: string,
) {
  if (input === undefined || input === null) {
    return;
  }

  for (const validator of validators) {
    const [passes, errors] = await validate(
      input,
      validator.schema,
      validator.options,
    );

    if (!passes) {
      throwError({
        status: 200,
        name: "validation error: " + validator.name,
        path: path,
        param: JSON.stringify(input),
        message: JSON.stringify(errors),
        type: "validation error",
      });
    }
  }
}

export type Validator = {
  name: string;
  schema: ValidationRules;
  options?: ValidationOptions;
};
