import type { RouterContext, FormDataFile } from "../../deps.ts";
import { getPatients } from "../services/patient.service.ts";
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

  uploadImages: async (ctx: any, filterContentTypes: string[] = ['image/jpg', 'image/png'], type: string = 'form-data'): Promise<void> => {
    const data = await ctx.request.body({ type: type}).value.read();
    const images = data.files.filter((f: FormDataFile) => filterContentTypes.some(contentType => contentType == f.contentType))
    responseOk(ctx.response, images);
  }
};

export default PatientController;
