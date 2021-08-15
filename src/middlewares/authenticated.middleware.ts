import Context from "../types/context.type.ts";
import * as tokenUtil from "../utils/token/token.util.ts";
import config from "../config/config.ts";
import { Err } from "../types/interface.type.ts";

export const authenticated = async (
  ctx: Context,
  next: () => Promise<unknown>,
): Promise<void> => {
  const request = ctx.request;
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.replace(/^bearer/i, "").trim();

  if (token) {
    try {
      const payload = await tokenUtil.verify(
        token,
        config.jwt.key,
        tokenUtil.HashAlgorithm.HS512,
      );
      ctx.userId = payload.jti;
    } catch {
      const err: Err = {
        status: 401,
        name: "Invalid token",
        path: request.url.pathname,
        param: "",
        message: "Invalid token",
        type: "",
      };
      throw err;
    }
    if (ctx.userId) {
      await next();
    } else {
      const err: Err = {
        status: 401,
        name: "Invalid token",
        path: request.url.pathname,
        param: "",
        message: "Invalid token",
        type: "",
      };
      throw err;
    }
  } else {
    const err: Err = {
      status: 401,
      name: "Unauthorized",
      path: request.url.pathname,
      param: "",
      message: "Unauthorized",
      type: "",
    };
    throw err;
  }
};
