import { assertEquals } from "../../../deps.ts";
import { Patient } from "../../../src/models/patient/patient.model.ts";
import * as patientService from "../../../src/services/patient.service.ts";

Deno.test("addPatient should add given patientService and ready to get when given ", async () => {
  const patientToInsert: Patient = {
    name: "Win",
    age: 18,
    addressToSendMedicine: {
      address: "some address",
      district: "some district",
      province: "some province",
      zipCode: 10110,
    },
    personalId: "1111111111111",
    medicalInfo: {
      weightKg: 72,
      heightCm: 174,
      allegicMedicines: ["some medicine", "some other medicine"],
    },
    personalIdPicture: "some personalIdPicture",
    rapidTestPicture: "some rapidTestPicture",
  };

  await patientService.addPatients(patientToInsert);

  const [patient] = await patientService.getPatients();

  assertEquals(patient, patientToInsert);
});
