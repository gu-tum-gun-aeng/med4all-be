import type { RouterContext } from "../../deps.ts";
import { responseOk } from "../utils/response.util.ts";
import DoctorService from "../services/doctor.service.ts";
import { RequestOtpResponse } from "../models/doctor/response/request.otp.response.model.ts";
import * as tokenUtil from "../utils/token.util.ts";
import { TokenOtpResponse } from "../models/doctor/response/token.otp.response.model.ts";
import config from "../config/config.ts";

const DoctorController = {
  requestOtp: async ({ request, response }: RouterContext): Promise<void> => {
    const { telephone } = await request.body({ type: "json" })
      .value;

    const requestId = await DoctorService.requestOtp(telephone);
    const res: RequestOtpResponse = {
      requestId,
    };

    responseOk(response, res);
  },

  verifyOtp: async ({ request, response }: RouterContext): Promise<void> => {
    const { telephone, requestId, code } = await request.body({
      type: "json",
    }).value;

    const _ = await DoctorService.verifyOtp(requestId, code);
    const id = await DoctorService.getIdByTelephone(telephone);

    const tokenInfo: tokenUtil.TokenInfo = {
      id: id,
      ttlSeconds: config.djwt.ttlSeconds,
      hashAlgorithm: tokenUtil.HashAlgorithm.HS512,
    };

    const token = await tokenUtil.createToken(tokenInfo, config.djwt.key);

    const res: TokenOtpResponse = {
      token,
    };

    responseOk(response, res);
  },
};

export default DoctorController;
