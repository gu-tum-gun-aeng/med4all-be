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

  if (!token) {
    throw unauthorizedError(request.url.pathname);
  }

  if (
    !tokenUtil.isValid(token, config.jwt.key, tokenUtil.HashAlgorithm.HS512)
  ) {
    throw invalidTokenError(request.url.pathname);
  }

  try {
    ctx.userId = await tokenUtil.getIdFrom(
      token,
      config.jwt.key,
      tokenUtil.HashAlgorithm.HS512,
    );
  } catch {
    throw invalidTokenError(request.url.pathname);
  }

  if (ctx.userId) {
    await next();
  } else {
    throw invalidTokenError(request.url.pathname);
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
