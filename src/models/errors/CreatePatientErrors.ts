// Error number start from 100x
export const CreatePatientErrors: ErrorGroup = {
  PatientAlreadyExistInColink: {
    id: 1001,
    message: "Patient is already exist in Colink system.",
  },
  PatientAlreadyExistInMed4All: {
    id: 1002,
    message: "Patient is already exist in med4all system.",
  },
};
