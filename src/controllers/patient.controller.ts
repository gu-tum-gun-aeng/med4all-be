import type { RouterContext } from "../../deps.ts";
import { getPatients } from "../services/externalApi.service.ts";
import { responseOk } from "../utils/response.util.ts";

const PatientController = {
  /**
   * Get Patients
   * @param response
   * @returns Promise<void>
   */
  patients: async ({ response }: RouterContext): Promise<void> => {
    const patient = await getPatients();
    responseOk(response, patient);
  },
};

export default PatientController;
