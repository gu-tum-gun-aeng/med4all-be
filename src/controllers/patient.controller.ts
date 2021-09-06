import type { FormDataFile } from "../../deps.ts";
import PatientService from "../services/patient.service.ts";
import S3Service from "../services/s3.service.ts";
import { responseOk } from "../utils/response.util.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import {
  CreatePatientRequest,
  CreatePatientRequestValidationMessage,
  CreatePatientRequestValidationSchema,
  MedicalInfoValidationMessage,
  MedicalInfoValidationSchema,
} from "../models/patient/request/patient.request.ts";
import { CreatePatientResponse } from "../models/patient/response/patient.response.ts";
import Context from "../types/context.type.ts";
import { validateAndThrow } from "../utils/validation.util.ts";
import log from "../utils/logger.util.ts";

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
    log.debug(
      `create patient request: ${JSON.stringify(createPatientRequest)}`,
      "createPatient",
    );

    await validateCreatePatientRequest(createPatientRequest);

    const patientRespose = await PatientService.createPatient(
      createPatientRequest,
      ctx.userId!,
    );

    const response: CreatePatientResponse = patientRespose;

    log.debug(
      `create patient response: ${JSON.stringify(response)}`,
      "createPatient",
    );
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

async function validateCreatePatientRequest(request: CreatePatientRequest) {
  await Promise.all([
    validateAndThrow(
      request,
      CreatePatientRequestValidationSchema,
      "createPatient",
      CreatePatientRequestValidationMessage,
    ),
    validateAndThrow(
      request.medicalInfo,
      MedicalInfoValidationSchema,
      "createPatient",
      MedicalInfoValidationMessage,
    ),
  ]);
}

export default PatientController;
