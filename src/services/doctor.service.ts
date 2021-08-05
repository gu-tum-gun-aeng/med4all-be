import DoctorRepository from "../dataaccess/database/doctor.repository.ts";
import NexmoService from "../dataaccess/service/nexmo/nexmo.service.ts";
import { traceWrapperAsync } from "../utils/trace.util.ts";

const requestOtp = async (
  telephoneWithCountryCode: string,
): Promise<string> => {
  const isDoctor = await DoctorRepository.isDoctor(telephoneWithCountryCode);
  // TODO: properly declare custom error type
  if (!isDoctor) throw new Error("You are not the doctor.");

  const requestOtpResult = await NexmoService.requestOtp(
    telephoneWithCountryCode,
  );

  if (requestOtpResult.status != "0") {
    throw new Error(requestOtpResult.error_text);
  }

  return traceWrapperAsync<string>(
    () => Promise.resolve(requestOtpResult.request_id),
    "route",
  );
};

const verifyOtp = async (requestId: string, code: string): Promise<boolean> => {
  const requestOtpResult = await NexmoService.verifyOtp(code, requestId);
  if (requestOtpResult.status != "0") {
    throw new Error(requestOtpResult.error_text);
  }

  return traceWrapperAsync<boolean>(
    () => Promise.resolve(true),
    "route",
  );
};

const getIdByTelephone = async (
  telephoneWithCountryCode: string,
): Promise<number> => {
  const id = await DoctorRepository.getIdByTelePhone(telephoneWithCountryCode);
  if (!id) {
    throw new Error("You are not the doctor.");
  }

  return traceWrapperAsync<number>(
    () => Promise.resolve(id),
    "route",
  );
};

export default {
  requestOtp,
  verifyOtp,
  getIdByTelephone,
};
