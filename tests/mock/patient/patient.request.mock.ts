import { CreatePatientRequest } from "../../../src/models/patient/request/patient.request.ts";

export const patientRequestMock: CreatePatientRequest = {
  "patientName": "Test",
  "age": 15,
  "weightKg": 50,
  "heightCm": 160,
  "certificateId": "0000000000000",
  "certificateTypeId": 1,
  "certificatePictureUrl": "http://some-url.com/some-path/some-file.jpg",
  "covidTestPictureUrl": "http://some-url.com/some-path/some-file.jpg",
  "address": "address 1",
  "district": "district1",
  "province": "bangkok",
  "zipCode": 10220,
  "medicalInfo": {
    "value1": ["test"],
    "value2": true,
  },
};

export const patientRequestMockInvalid: CreatePatientRequest = {
  "patientName": "",
  "age": 0,
  "weightKg": 50,
  "heightCm": 160,
  "certificateId": "0000000000000",
  "certificateTypeId": 1,
  "certificatePictureUrl": "some-string-without-http",
  "covidTestPictureUrl": "http://some-url.com/some-path/some-file.jpg",
  "address": "address 1",
  "district": "district1",
  "province": "bangkok",
  "zipCode": 102200,
  "medicalInfo": {
    "value1": ["test"],
    "value2": true,
  },
};

export const getPatientIdMock = async () => await { value: BigInt(10) };
