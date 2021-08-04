import configs from "src/config/config.ts";
import { getHostname } from "src/utils/os.util.ts";
import { HttpRequestTracing } from "src/types/http.type.ts";
import { getLogger, handlers, setup } from "log/mod.ts";

const { env, logAppName } = configs;
const hostname = await getHostname();

await setup({
  handlers: {
    functionFmt: new handlers.ConsoleHandler("DEBUG", {
      formatter: (logRecord) => {
        const elapsedMilliseconds =
          logRecord.args.length > 2 && logRecord.args[2] !== undefined
            ? (logRecord.args[2] as number)
            : null;
        const requestContext =
          logRecord.args.length > 1 && logRecord.args[1] !== undefined
            ? (logRecord.args[1] as HttpRequestTracing)
            : null;

        const message = {
          v: "0",
          name: logAppName,
          msg: logRecord.msg,
          level: logRecord.level,
          hostname: hostname,
          time: logRecord.datetime.toISOString(),
          target: logRecord.args[0],
          "elapsed_milliseconds": elapsedMilliseconds ?? undefined,
          "http.user_agent": requestContext?.userAgent,
          "http.target": requestContext?.target,
          "http.client_ip": requestContext?.clientIp,
          "http.host": requestContext?.host,
          "http.route": requestContext?.route,
        };
        return JSON.stringify(message);
      },
    }),
  },

  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["functionFmt"],
    },
    tests: {
      level: "CRITICAL",
      handlers: ["functionFmt"],
    },
  },
});

const logger = (env === "test") ? getLogger() : getLogger("tests");

const Logger = {
  info: (
    message: string,
    target: string,
  ) => logger.info(message, target),
  error: (
    message: string,
    target: string,
  ) => logger.error(message, target),
  trace: (
    message: string,
    target: string,
    request?: HttpRequestTracing,
    elapsedMilliseconds?: number,
  ) => logger.info(message, target, request, elapsedMilliseconds),
  debug: (message: string, target: string) => logger.debug(message, target),
};

export default Logger;
