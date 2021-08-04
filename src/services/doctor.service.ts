import DoctorRepository from "../dataaccess/database/doctor.repository.ts";
import NexmoService from "../dataaccess/service/nexmo/nexmo.service.ts";
import { traceWrapperAsync } from "../utils/trace.util.ts";

const requestOtp = async (telephone: string): Promise<boolean> => {
  const isDoctor = await DoctorRepository.isDoctor(telephone)
  // TODO: properly declare custom error type
  if (!isDoctor) throw new Error("You are not the doctor.")

  const requestOtpResult = await NexmoService.requestOtp(telephone)

  const isSuccess = requestOtpResult

  return await traceWrapperAsync<boolean>(
    () => Promise.resolve(isSuccess),
    "route",
  );
};

const verifyOtp = async (telephone: string, code: string): Promise<boolean> => {
  return await traceWrapperAsync<boolean>(
    () => Promise.resolve(true),
    "route",
  );
};

export default {
  requestOtp,
  verifyOtp,
};
