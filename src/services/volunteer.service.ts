import VolunteerRepository from "../dataaccess/database/volunteer.repository.ts";
import NexmoService from "../dataaccess/service/nexmo/nexmo.service.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import { traceWrapperAsync } from "../utils/trace.util.ts";

const requestOtp = async (
  telephoneWithCountryCode: string,
): Promise<string> => {
  const isVolunteer = await VolunteerRepository.isVolunteer(
    telephoneWithCountryCode,
  );
  // TODO: properly declare custom error type
  if (!isVolunteer) {
    throwError({
      status: 400,
      name: "You are not the volunteer.",
      path: "volunteers/otp/request",
      param: "",
      message: "You are not the volunteer.",
      type: "bad request",
    });
  }

  const requestOtpResult = await NexmoService.requestOtp(
    telephoneWithCountryCode,
  );

  if (requestOtpResult.status != "0") {
    throwError({
      status: 400,
      name: requestOtpResult.error_text!,
      path: "volunteers/otp/request",
      param: "",
      message: requestOtpResult.error_text!,
      type: "bad request",
    });
  }

  return traceWrapperAsync<string>(
    () => Promise.resolve(requestOtpResult.request_id),
    "route",
  );
};

const verifyOtp = async (requestId: string, code: string): Promise<boolean> => {
  const requestOtpResult = await NexmoService.verifyOtp(code, requestId);
  if (requestOtpResult.status != "0") {
    throwError({
      status: 400,
      name: requestOtpResult.error_text!,
      path: "volunteers/otp/verify",
      param: "",
      message: requestOtpResult.error_text!,
      type: "bad request",
    });
  }

  return traceWrapperAsync<boolean>(
    () => Promise.resolve(true),
    "route",
  );
};

const getIdByTelephone = async (
  telephoneWithCountryCode: string,
): Promise<number> => {
  const id = await VolunteerRepository.getIdByTelePhone(
    telephoneWithCountryCode,
  );
  if (!id) {
    throwError({
      status: 400,
      name: "You are not the volunteer.",
      path: "volunteers/otp/request",
      param: "",
      message: "You are not the volunteer.",
      type: "bad request",
    });
  }

  return traceWrapperAsync<number>(
    () => Promise.resolve(id!),
    "route",
  );
};

export default {
  requestOtp,
  verifyOtp,
  getIdByTelephone,
};
