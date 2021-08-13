import { RouterContext } from "../../deps.ts";
import { responseOk } from "../utils/response.util.ts";
import VolunteerService from "../services/volunteer.service.ts";
import VolunteerTokenService from "../services/volunteer.token.service.ts";
import { RequestOtpResponse } from "../models/volunteer/response/request.otp.response.model.ts";
import * as tokenUtil from "../utils/token/token.util.ts";
import { TokenOtpResponse } from "../models/volunteer/response/token.otp.response.model.ts";
import config from "../config/config.ts";
import * as dateUtils from "../utils/date.util.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";
import {
  RequestOtpRequest,
  RequestOtpRequestValidationSchema,
} from "../models/volunteer/request/request.otp.request.model.ts";
import {
  VerifyOtpRequest,
  VerifyOtpRequestValidationSchema,
} from "../models/volunteer/request/verfity.otp.request.model.ts";
import { validateAndThrow } from "../utils/validation.util.ts";

const USE_HASH_ALG = tokenUtil.HashAlgorithm.HS512;

const VolunteerController = {
  requestOtp: async (ctx: RouterContext): Promise<void> => {
    const req: RequestOtpRequest = await ctx.request.body({ type: "json" })
      .value;

    await validateAndThrow(
      req,
      RequestOtpRequestValidationSchema,
      "RequestOtpRequest",
    );

    const telephoneTh = `66${req.telephone.slice(1)}`;
    const requestId = await VolunteerService.requestOtp(telephoneTh);
    const res: RequestOtpResponse = {
      requestId,
    };

    responseOk(ctx.response, res);
  },

  verifyOtp: async (ctx: RouterContext): Promise<void> => {
    const req: VerifyOtpRequest = await ctx.request.body({
      type: "json",
    }).value;

    await validateAndThrow(
      req,
      VerifyOtpRequestValidationSchema,
      "VerifyOtpRequest",
    );

    const telephoneTh = `66${req.telephone.slice(1)}`;
    const _ = await VolunteerService.verifyOtp(req.requestId, req.code);
    const id = await VolunteerService.getIdByTelephone(telephoneTh);

    const tokenInfo: tokenUtil.TokenInfo = {
      id: id.toString(),
      ttlSeconds: config.jwt.ttlSeconds,
      hashAlgorithm: USE_HASH_ALG,
    };

    const token = await tokenUtil.createToken(tokenInfo, config.jwt.key);
    const payload = await tokenUtil.verify(
      token,
      config.jwt.key,
      USE_HASH_ALG,
    );

    if (!payload.exp) {
      throwError({
        status: 500,
        name: "token exp not found",
        path: "/volunteers/otp/verify",
        param: "",
        message: "token exp not found",
        type: "internal error",
      });
      return;
    }

    const expDate = dateUtils.toDate(payload.exp);
    const expDateFormat = expDate.toISOString();
    await VolunteerTokenService.insert(token, expDateFormat);

    const res: TokenOtpResponse = {
      token,
    };

    responseOk(ctx.response, res);
  },
};

export default VolunteerController;
