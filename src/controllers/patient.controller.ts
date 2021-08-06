import type { FormDataFile, RouterContext } from "../../deps.ts";
import PatientService from "../services/patient.service.ts";
import S3Service from "../services/s3.service.ts";
import { responseOk } from "../utils/response.util.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import {
  CreatePatientRequest,
  CreatePatientRequestValidationSchema,
} from "../models/patient/request/patient.request.ts";
import {
  CreatePatientResultRequest,
  CreatePatientResultRequestValidationSchema,
} from "../models/patient/request/patientResult.request.ts";
import { CreatePatientResponse } from "../models/patient/response/patient.response.ts";
import { CreatePatientResultResponse } from "../models/patient/response/patientResult.response.ts";
import { validateAndThrow } from "../utils/validation.util.ts";

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

  getFirstWaitingPatient: async (
    { response }: RouterContext,
  ): Promise<void> => {
    const patient = await PatientService.getFirstWaitingPatient();
    responseOk(response, patient);
  },

  createPatient: async (
    ctx: RouterContext,
  ): Promise<void> => {
    const createPatientRequest: CreatePatientRequest = await ctx.request.body({
      type: "json",
    }).value;

    await validateAndThrow(
      createPatientRequest,
      CreatePatientRequestValidationSchema,
      "createPatient",
    );

    const patientId = await PatientService.createPatient(createPatientRequest);
    const response: CreatePatientResponse = {
      patientId,
    };
    responseOk(ctx.response, response);
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

  createPatientResult: async (
    ctx: RouterContext,
  ): Promise<void> => {
    const createPatientResultRequest: CreatePatientResultRequest = await ctx
      .request.body({
        type: "json",
      }).value;

    await validateAndThrow(
      createPatientResultRequest,
      CreatePatientResultRequestValidationSchema,
      "createPatientResult",
    );

    await PatientService.createPatientResult(createPatientResultRequest);
    const response: CreatePatientResultResponse = {
      isSuccess: true,
    };
    responseOk(ctx.response, response);
  },
};

export default PatientController;
