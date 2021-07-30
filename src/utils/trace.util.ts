import { Request } from "../../deps.ts";
import log from "../utils/logger.util.ts";
import { HttpRequestTracing } from "../types/http.type.ts";
import configs from "../config/config.ts";

type Context = "route" | "externalApi" | "log" | "test";
const { logAppName } = configs;

const getHttpObjectFromRequest = (request: Partial<Request>) => {
  const url = request?.url?.toString() as string;
  const parsedUrl = new URL(url);

  const host = parsedUrl.host;
  const clientIp = request?.ip as string;
  const userAgent = request?.headers?.get("user-agent") as string;
  const target = parsedUrl.pathname + parsedUrl.search;
  const scheme = parsedUrl.protocol;
  const route = parsedUrl.pathname;

  const httpRequest = {
    host,
    clientIp,
    userAgent,
    target,
    route,
    scheme,
  };
  return httpRequest;
};

/**
 * Tracer Wrapper function
 * @param fx (arg?: any) => Promise<any>
 * @param context route | externalApi
 * @param name string
 * @param request Request
 * @returns Promise<void>
 */
export const traceWrapper = async <T>(
  // deno-lint-ignore no-explicit-any
  fx: (arg?: any) => Promise<T>,
  context: Context,
  name?: string,
  request?: Partial<Request>,
): Promise<T> => {
  const functionName = name ? name : fx.name;
  const message = functionName.toUpperCase();
  const startTime = new Date();

  const httpRequest: HttpRequestTracing | undefined = request
    ? getHttpObjectFromRequest(request)
    : undefined;

  log.trace(
    `[${message} - START]`,
    `${logAppName}::${context}::${functionName}`,
    httpRequest,
  );
  const result = await fx();
  const endTime = new Date();
  log.trace(
    `[${message} - END]`,
    `${logAppName}::${context}::${functionName}`,
    httpRequest,
    endTime.getTime() - startTime.getTime(),
  );

  return result;
};
