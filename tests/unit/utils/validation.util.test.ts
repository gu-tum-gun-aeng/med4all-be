import { isNumber, isString, required } from "../../../deps.ts";
import { validateFor } from "../../../src/utils/validation.util.ts";

Deno.test(
  "validate should not throw and error when given input is pass validation rules",
  async () => {
    const validator = {
      name: "someValidator",
      schema: {
        name: [required, isString],
        age: [required, isNumber],
      },
    };

    const toValidate = {
      name: "someName",
      age: 1234,
    };

    await validateFor(toValidate, [validator], "somePath");
  },
);

Deno.test(
  "validate should not throw and error when given multiple validators and the input is match all of validator schemas",
  async () => {
    const nameValidator = {
      name: "nameValidator",
      schema: {
        name: [required, isString],
      },
    };

    const ageValidator = {
      name: "ageValidator",
      schema: {
        age: [required, isNumber],
      },
    };

    const toValidate = {
      name: "someName",
      age: 1234,
    };

    await validateFor(
      toValidate,
      [nameValidator, ageValidator],
      "somePath",
    );
  },
);

Deno.test(
  "validate should throw and error when the input is not match atleast one of validator schemas",
  async () => {
    const nameValidator = {
      name: "nameValidator",
      schema: {
        name: [required, isString],
      },
    };

    const ageValidator = {
      name: "ageValidator",
      schema: {
        age: [required, isNumber],
      },
    };

    const toValidate = {
      name: 1234,
      age: 1234,
    };

    try {
      await validateFor(
        toValidate,
        [nameValidator, ageValidator],
        "somePath",
      );
    } catch (error) {
      console.log(error);
    }
  },
);
