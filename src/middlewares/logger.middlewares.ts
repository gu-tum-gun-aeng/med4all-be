import { Context, State } from "../../deps.ts";
import { traceWrapperAsync } from "../utils/trace.util.ts";

/**
 *Logger Middleware function
 * @param ctx
 * @param next
 * @returns Promise<void>
 */
export const logMiddleware = async (
  // deno-lint-ignore no-explicit-any
  ctx: Context<State, Record<string, any>>,
  next: () => Promise<unknown>,
): Promise<void> => {
  const url = ctx.request.url.toString();
  const parsedUrl = new URL(url);

  await traceWrapperAsync(next, "route", parsedUrl.pathname, ctx.request);
};
