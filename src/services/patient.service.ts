import { Patient } from "../models/patient/patient.model.ts";
import { traceWrapperAsync } from "../utils/trace.util.ts";

//Todo: remove this list and add the data to db instead
const patients: Patient[] = [];

export const getPatients = async (): Promise<Patient[]> => {
  return await traceWrapperAsync<Patient[]>(
    async () => await patients,
    "route",
  );
};

export const addPatients = async (name: string, age: number) => {
  await patients.push({
    name: name,
    age: age,
  });
};
