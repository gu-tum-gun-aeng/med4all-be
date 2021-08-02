import type { RouterContext, FormDataFile } from "../../deps.ts";
import { getBucket, uploadImageObject } from "../services/s3.service.ts";
import { getPatients } from "../services/patient.service.ts";
import { responseOk } from "../utils/response.util.ts";
import { v4 } from "../../deps.ts";
import { S3DataInfo } from "../models/s3/s3_data_info.model.ts";
import config from "../config/config.ts"

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

  uploadImages: async (ctx: any, filterContentTypes: string[] = ['image/jpg', 'image/jpeg', 'image/png'], bodyType='form-data'): Promise<void> => {

    const data = await ctx.request.body({ type: bodyType}).value.read();
    const images = data.files.filter((f: FormDataFile) => filterContentTypes.some(contentType => contentType == f.contentType))
    const s3Response = await uploadFileToS3(images);
    responseOk(ctx.response, s3Response);
  }
};

const uploadFileToS3 =  (images: FormDataFile[]) => {
    const bucket = getBucket()
    return Promise.all(images.map(async(f: FormDataFile) => { 
      const imageData = await Deno.readFile(f.filename!);
      const uuidFileName = `${f.name}/${v4.generate()}`;
      await uploadImageObject(bucket, uuidFileName, imageData, f.contentType);
      const response: S3DataInfo = { 
        key: f.name, 
        url: `https://${config.s3.bucketName}.s3.${config.s3.region}.amazonaws.com/${uuidFileName}`
      };
      return response;
    }));
  }
  
export default PatientController;
