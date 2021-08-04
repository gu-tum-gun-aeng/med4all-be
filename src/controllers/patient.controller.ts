import PatientService from "src/services/patient.service.ts";
import S3Service from "src/services/s3.service.ts";
import { responseOk } from "src/utils/response.util.ts";
import { throwError } from "src/middlewares/errorHandler.middleware.ts";
import { FormDataFile, RouterContext } from "oak/mod.ts";

const PatientController = {
  /**
   * Get Patients
   * @param response
   * @returns Promise<void>
   */
  patients: async ({ response }: RouterContext): Promise<void> => {
    const patient = await PatientService.getPatients();
    responseOk(response, patient);
  },

  uploadImagesByFormData: async (
    ctx: RouterContext,
    filterContentTypes: string[] = ["image/jpg", "image/jpeg", "image/png"],
  ): Promise<void> => {
    const fileDataFromRequestBody = await ctx.request.body({
      type: "form-data",
    });
    const imageData = await fileDataFromRequestBody.value.read();

    const images = imageData?.files?.filter((file: FormDataFile) =>
      filterContentTypes.some((contentType) => contentType == file.contentType)
    );
    if (!images) {
      throwError({
        status: 500,
        name: "images not found",
        path: "uploads",
        param: "",
        message: "images not found",
        type: "internal error",
      });
      return;
    }
    const s3Response = await S3Service.uploadFileToS3(images);
    responseOk(ctx.response, s3Response);
  },
};

export default PatientController;
