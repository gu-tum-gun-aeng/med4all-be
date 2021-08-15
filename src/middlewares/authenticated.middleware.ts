import Context from "../types/context.type.ts";
import * as tokenUtil from "../utils/token/token.util.ts";
import config from "../config/config.ts";
import { Err } from "../types/error.type.ts";

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
      throw invalidTokenError(request.url.pathname);
    }

    if (ctx.userId) {
      await next();
    } else {
      throw invalidTokenError(request.url.pathname);
    }
  } else {
    throw unauthorizedError(request.url.pathname);
  }
};

const invalidTokenError = (pathname: string): Err => {
  return {
    status: 401,
    name: "Invalid token",
    path: pathname,
    param: "",
    message: "Invalid token",
    type: "",
  };
};

const unauthorizedError = (pathname: string): Err => {
  return {
    status: 401,
    name: "Invalid token",
    path: pathname,
    param: "",
    message: "Invalid token",
    type: "",
  };
};
