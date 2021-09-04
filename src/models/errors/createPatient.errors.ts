import { ErrorGroup } from "../error.ts";

// Error number start from 100x
export const CreatePatientErrors: ErrorGroup = {
  PatientAlreadyExistInMed4all: {
    id: 1001,
    message: "Patient is already exist in med4all system.",
  },
  PatientAlreadyExistInColink: {
    id: 1002,
    message: "Patient is already exist in Colink system.",
  },
};
