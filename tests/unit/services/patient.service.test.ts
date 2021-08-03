import { assertEquals } from "../../../deps.ts";
import { Patient } from "../../../src/models/patient/patient.model.ts";

import * as patientService from "../../../src/services/patient.service.ts";

Deno.test("addPatient should add given patientService and ready to get when given ", async () => {
  const patientToInsert: Patient = {
    "patient_id": 12345,
    "name": "Test Patient",
    "age": 30,
    "weight_kg": 70,
    "height_cm": 170,
    "certificate_id": "1234567890123",
    "certificate_type_id": 1,
    "certificate_picture_url": "http://some-url.com/some-path/some-name.jpg",
    "covid_test_picture_url": "http://some-url.com/some-path/some-name.jpg",
    "medical_info": {
      "drug_allergy": ["aspirin"],
    },
  };

  await patientService.addPatients(patientToInsert);

  const [patient] = await patientService.getPatients();

  assertEquals(patient, patientToInsert);
});
