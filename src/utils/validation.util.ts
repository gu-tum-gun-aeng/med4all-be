import { validate, ValidationOptions, ValidationRules } from "../../deps.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";

export const validateAndThrow = async (
  input: Record<string, unknown>,
  schema: ValidationRules,
  path: string,
  options?: ValidationOptions,
) => {
  const [passes, errors] = await validate(input, schema, options);
  if (!passes) {
    throwError({
      status: 500,
      name: "validation errors",
      path: path,
      param: JSON.stringify(input),
      message: JSON.stringify(errors),
      type: "internal error",
    });
  }
};
