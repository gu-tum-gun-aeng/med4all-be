import { assertEquals } from "../../../deps.ts";
import { PatientRepo } from "../../../src/utils/db.util.ts"

Deno.test("PatientRepo.getAll should return patient data rows when called", async () => {
  assertEquals((await new PatientRepo().getAll()).length, 1)
});
