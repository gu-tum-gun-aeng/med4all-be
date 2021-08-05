// import { Doctor } from "../../models/doctor/doctor.model.ts";
import config from "../../../config/config.ts";
import { ky } from "../../../../deps.ts";
import { RequestOtpResponse } from "../../../models/nexmo/response/request.response.model.ts";
import { VerifyOtpResponse } from "../../../models/nexmo/response/verify.response.model.ts";

const NexmoService = {
  requestOtp: (
    telephoneWithCountryCode: string,
  ): Promise<RequestOtpResponse> => {
    const url =
      `${config.nexmo.requesOtptUrl}?api_key=${config.nexmo.apiKey}&api_secret=${config.nexmo.ApiSecret}&number=${telephoneWithCountryCode}&brand=${config.nexmo.brand}`;
    return get(url).json<RequestOtpResponse>();
  },
  verifyOtp: (code: string, requestId: string): Promise<VerifyOtpResponse> => {
    const url =
      `${config.nexmo.verifyOtpUrl}?api_key=${config.nexmo.apiKey}&api_secret=${config.nexmo.ApiSecret}&request_id=${requestId}&code=${code}`;
    return get(url).json<VerifyOtpResponse>();
  },
};

const get = (url: string) => {
  return ky.get(url);
};

export default NexmoService;
