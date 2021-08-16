import { Cookies, RouterContext } from "https://deno.land/x/oak@v7.6.3/mod.ts";
import VolunteerRepository from "../dataaccess/database/volunteer.repository.ts";
import NexmoService from "../dataaccess/service/nexmo/nexmo.service.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import { traceWrapperAsync } from "../utils/trace.util.ts";

const requestOtp = async (
  telephone: string,
): Promise<string> => {
  const telephoneWithCountryCode = `66${telephone.slice(1)}`;
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

const getActiveIdByTelephone = async (
  telephoneWithCountryCode: string,
): Promise<number> => {
  const id = await VolunteerRepository.getActiveIdByTelephone(
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

const setCookie = (ctx: RouterContext, token: string): Cookies => {
  return ctx.cookies.set("token", token, { httpOnly: true });
};

export default {
  requestOtp,
  verifyOtp,
  getActiveIdByTelephone,
  setCookie,
};
