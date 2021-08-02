import { Patient } from "../models/patient/patient.model.ts";
import { traceWrapperAsync } from "../utils/trace.util.ts";
import { PatientRepo } from "../utils/db.util.ts";

//Todo: remove this list and add the data to db instead
const patients: Patient[] = [];

export const getPatients = async (): Promise<Patient[]> => {
  console.log((await (new PatientRepo()).getAll()).length)

  return await traceWrapperAsync<Patient[]>(
    async () => await patients,
    "route",
  );
};

export const addPatients = async (patient: Patient) => {
  await patients.push(patient);
};
