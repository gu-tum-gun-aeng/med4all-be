import { Context, isHttpError, State, Status } from "oak/mod.ts";
import configs from "src/config/config.ts";
import type { Err } from "src/types/interface.type.ts";
import log from "src/utils/logger.util.ts";

/**
 * Throws Error with provided params
 * @param options
 * @throws Error Throws Error
 */
export const throwError = (options: Err): Error => {
  throw options;
};

/**
 * Error Handler Middleware function
 * @param ctx
 * @param next
 * @returns Promise<void>
 */
export const errorHandler = async (
  // deno-lint-ignore no-explicit-any
  ctx: Context<State, Record<string, any>>,
  next: () => Promise<unknown>,
): Promise<void> => {
  try {
    await next();
  } catch (err) {
    let message = err.message;
    const { name, path, type } = err;
    const status = err.status || err.statusCode || Status.InternalServerError;
    const { env } = configs;

    if (!isHttpError(err)) {
      message = env === "dev" ? message : "Internal Server Error";
    }

    if (env === "dev") {
      log.debug(err, `Error::${status}`);
    }

    ctx.response.status = status;
    ctx.response.body = { message, name, path, type, status };
  }
};
