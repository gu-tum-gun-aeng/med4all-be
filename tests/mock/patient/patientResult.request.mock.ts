import { CreatePatientResultRequest } from "../../../src/models/patient/request/patientResult.request.ts";

export const patientResultRequestMock: CreatePatientResultRequest = {
  "patientId": 36,
  "doctorId": 100,
  "isApproved": true,
  "rejectReasonId": 20,
};

export const patientResultRequestMockInvalid = {
  "patientId": "36",
  "doctorId": 100,
  "isApproved": true,
  "rejectReasonId": 20,
};
