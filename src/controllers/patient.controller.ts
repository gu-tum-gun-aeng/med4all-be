import type { FormDataFile } from "../../deps.ts";
import PatientService from "../services/patient.service.ts";
import S3Service from "../services/s3.service.ts";
import { responseOk } from "../utils/response.util.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import {
  CreatePatientRequest,
} from "../models/patient/request/patient.request.ts";
import { CreatePatientResponse } from "../models/patient/response/patient.response.ts";
import Context from "../types/context.type.ts";

const PatientController = {

  getPatientRegisterStatus: async (
    ctx: Context,
  ): Promise<void> => {
    const patientRegisterStatus = await PatientService.getPatientRegisterStatus(
      ctx.params.certificateId!,
    );
    responseOk(ctx.response, patientRegisterStatus);
  },

  createPatient: async (
    ctx: Context,
  ): Promise<void> => {
    const createPatientRequest: CreatePatientRequest = await ctx.request.body({
      type: "json",
    }).value;

    const [patientId] = await PatientService.createPatient(
      createPatientRequest,
      ctx.userId!,
    );
    const response: CreatePatientResponse = {
      patientId,
    };
    responseOk(ctx.response, response);
  },

  uploadImagesByFormData: async (
    ctx: Context,
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
