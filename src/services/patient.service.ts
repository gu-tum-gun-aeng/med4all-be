import { traceWrapperAsync } from "../utils/trace.util.ts";
import patientRepository from "../repositories/patient.repository.ts";
import { Patient } from "../models/patient/patient.model.ts";


//Todo: remove this list and add the data to db instead
const patients: Patient[] = [];

export const getPatients = async (): Promise<Patient[]> => {
  // const patient = await patientRepository.getAll();
  // console.log(patient);
  return await traceWrapperAsync<Patient[]>(
    async () => await patients,
    "route",
  );
};

export const addPatients = async (patient: Patient) => {
  await patients.push(patient);
};
