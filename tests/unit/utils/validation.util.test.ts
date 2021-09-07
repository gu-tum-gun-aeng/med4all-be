import { isNumber, isString, required } from "../../../deps.ts";
import { validateFor } from "../../../src/utils/validation.util.ts";

Deno.test(
  "validate should not throw and error when given input is pass validation rules",
  async () => {
    const validatorSchema = {
      name: [required, isString],
      age: [required, isNumber],
    };

    const toValidate = {
      name: "someName",
      age: 1234,
    };

    await validateFor(toValidate, [validatorSchema], "somePath");
  },
);

Deno.test(
  "validate should not throw and error when given multiple validators and the input is match all of validator schemas",
  async () => {
    const nameValidatorSchema = {
      name: [required, isString],
    };

    const ageValidatorSchema = {
      age: [required, isNumber],
    };

    const toValidate = {
      name: "someName",
      age: 1234,
    };

    await validateFor(
      toValidate,
      [nameValidatorSchema, ageValidatorSchema],
      "somePath",
    );
  },
);
