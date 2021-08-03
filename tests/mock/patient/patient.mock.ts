import { Patient } from "../../../src/models/patient/patient.model.ts";

export const getMockPatients = async (): Promise<Patient[]> => {
  return await [
    {
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
    },
    {
      "patient_id": 67890,
      "name": "Test Patient2",
      "age": 31,
      "weight_kg": 75,
      "height_cm": 150,
      "certificate_id": "0000000000000",
      "certificate_type_id": 1,
      "certificate_picture_url": "http://some-url.com/some-path/some-name.jpg",
      "covid_test_picture_url": "http://some-url.com/some-path/some-name.jpg",
      "medical_info": {},
    },
  ];
};
