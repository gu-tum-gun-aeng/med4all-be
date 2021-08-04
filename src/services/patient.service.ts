import { traceWrapperAsync } from "src/utils/trace.util.ts";
import patientRepository from "src/dataaccess/database/patient.repository.ts";
import { Patient } from "src/models/patient/patient.model.ts";

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

// export function patientService(arg0: string, arg1: number) {
//   throw new Error("Function not implemented.");
// }
