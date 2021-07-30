import { dotEnv } from "../../deps.ts";

const env: string = Deno.env.toObject().ENV || "dev";
const envPath: string = `.env/.env.${env}`.toString();
const envConfig = dotEnv({
  path: envPath,
});

/**
 * Configuration
 */
const config: ({
  env: string;
  appName: string;
  logAppName: string;
  ip: string;
  host: string;
  port: number;
  protocol: string;
  url: string;
}) = {
  env,
  appName: envConfig.APP_NAME,
  logAppName: envConfig.LOG_APP_NAME,
  ip: envConfig.IP,
  host: envConfig.HOST,
  port: Number(envConfig.PORT) || 8000,
  protocol: envConfig.PROTOCOL,
  url: `${envConfig.PROTOCOL}://${envConfig.HOST}:${envConfig.PORT}`,
};

export default config;
