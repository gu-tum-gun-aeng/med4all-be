import { assertEquals } from "../../../deps.ts";
import { CreatePatientErrors } from "../../../src/models/errors/CreatePatientErrors.ts";

Deno.test("error should return expected when call", () => {
  assertEquals(CreatePatientErrors.PatientAlreadyExistInColink, {
    id: 1001,
    message: "Patient is already exist in Colink system.",
  });
});
