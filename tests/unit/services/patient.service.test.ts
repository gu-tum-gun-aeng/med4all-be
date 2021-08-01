import { assertEquals } from "../../../deps.ts";
import * as patientService from "../../../src/services/patient.service.ts";

Deno.test("addPatient should add given patientService and ready to get when given ", async () => {
  await patientService.addPatients("Win", 20);

  const [patient] = await patientService.getPatients();

  assertEquals(patient, {
    age: 20,
    name: "Win",
  });
});
