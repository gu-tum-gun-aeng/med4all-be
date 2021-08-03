import { traceWrapperAsync } from "../utils/trace.util.ts";
import patientRepository from "../repositories/patient.repository.ts";
import { Patient } from "../models/patient/patient.model.ts";

export const getPatients = async (): Promise<Patient[]> => {
  return await traceWrapperAsync<Patient[]>(
    () => patientRepository.getAll(),
    "route",
  );
};

// TODO: Implement this to connect to db instead.
// export const addPatients = async (patient: Patient) => {
//   return await 0;
// };

export default {
  getPatients,
  //addPatients,
};
