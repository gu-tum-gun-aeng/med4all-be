import { RouterContext } from "../../deps.ts";
import { responseOk } from "../utils/response.util.ts";
import DoctorService from "../services/doctor.service.ts";
import DoctorTokenService from "../services/doctor.token.service.ts";
import { RequestOtpResponse } from "../models/doctor/response/request.otp.response.model.ts";
import * as tokenUtil from "../utils/token/token.util.ts";
import { TokenOtpResponse } from "../models/doctor/response/token.otp.response.model.ts";
import config from "../config/config.ts";
import * as dateUtils from "../utils/date.util.ts";

const USE_HASH_ALG = tokenUtil.HashAlgorithm.HS512;

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
      id: id.toString(),
      ttlSeconds: config.djwt.ttlSeconds,
      hashAlgorithm: USE_HASH_ALG,
    };

    const token = await tokenUtil.createToken(tokenInfo, config.djwt.key);
    const payload = await tokenUtil.verify(
      token,
      config.djwt.key,
      USE_HASH_ALG,
    );

    if (!payload.exp) throw new Error("invalid timesatamp");
    const expDate = dateUtils.toDate(payload.exp);
    const expDateFormat = expDate.toISOString();
    await DoctorTokenService.insert(token, expDateFormat);

    const res: TokenOtpResponse = {
      token,
    };

    responseOk(response, res);
  },
};

export default DoctorController;
