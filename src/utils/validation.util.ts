import { validate, ValidationOptions, ValidationRules } from "../../deps.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";

export const validateAndThrow = async (
  input: Record<string, unknown> | undefined,
  schema: ValidationRules,
  path: string,
  options?: ValidationOptions,
) => {
  if (input === undefined || input === null) {
    return;
  }

  const [passes, errors] = await validate(input, schema, options);
  if (!passes) {
    throwError({
      status: 200,
      name: "validation errors",
      path: path,
      param: JSON.stringify(input),
      message: JSON.stringify(errors),
      type: "internal error",
    });
  }
};

export async function validateFor(
  input: Record<string, unknown> | undefined,
  validators: Array<Validator>,
  path: string,
  options?: ValidationOptions,
) {
  if (input === undefined || input === null) {
    return;
  }

  for (const validator of validators) {
    const [passes, errors] = await validate(input, validator.schema, options);

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

type Validator = {
  name: string;
  schema: ValidationRules;
};
