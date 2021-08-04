import { traceWrapperAsync } from "../utils/trace.util.ts";

const requestOtp = async (telephone: string): Promise<boolean> => {
  return await traceWrapperAsync<boolean>(
    () => Promise.resolve(true),
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
