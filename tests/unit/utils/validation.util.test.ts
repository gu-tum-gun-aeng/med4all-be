import { assertEquals, isNumber, isString, required } from "../../../deps.ts";
import { validateFor, Validator } from "../../../src/utils/validation.util.ts";
import {
  assertShouldNotReachThisLine,
  assertShouldNotThrowException,
  assertShouldNotThrowExceptionAsync,
} from "../../helper/assert.ts";

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

    await assertShouldNotThrowException(async () => {
      await validateFor(toValidate, [validator], "somePath");
    });
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

    await assertShouldNotThrowExceptionAsync(() => {
      return validateFor(
        toValidate,
        [nameValidator, ageValidator],
        "somePath",
      );
    });
  },
);

Deno.test(
  "validate should throw and error when the input is not match at least one of validator schemas",
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

      assertShouldNotReachThisLine();
    } catch (error) {
      assertEquals(
        error.message,
        '{"name":{"isString":"name must be a string"}}',
      );
    }
  }
);

Deno.test(
  "validate should throw and error with custom message when the input is not match at least one of validator schemas and the custom message is provided",
  async () => {

    const toValidate = {
      name: 1234,
      age: 1234,
    };

    const nameValidator: Validator = {
      name: "nameValidator",
      schema: {
        name: [required, isString],
      },
      options: {
        messages: {
          "name.required": "Some custom message."
        }
      }
    };

    const ageValidator: Validator = {
      name: "ageValidator",
      schema: {
        age: [required, isNumber],
      }
    };

    try {
      await validateFor(
        toValidate,
        [nameValidator, ageValidator],
        "somePath",
      );

      assertShouldNotReachThisLine();
    } catch (error) {
      assertEquals(
        error.message,
        'Some custom message.',
      );
    }
  },
);
