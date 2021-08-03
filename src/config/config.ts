import { dotEnv } from "../../deps.ts";

const env: string = Deno.env.toObject().ENV || "dev";
const envPath: string = `.env/.env.${env}`.toString();
const envConfig = dotEnv({
  path: envPath,
});

/**
 * Configuration
 */
const dbUsername = Deno.env.get("DB_USERNAME") || envConfig.DB_USERNAME;
const dbPassword = Deno.env.get("DB_PASSWORD") || envConfig.DB_PASSWORD;
const config: ({
  env: string;
  appName: string;
  logAppName: string;
  ip: string;
  host: string;
  port: number;
  protocol: string;
  url: string;
  dbConnectionPool: number;
  dbConnectionString: string;
}) = {
  env,
  appName: envConfig.APP_NAME,
  logAppName: envConfig.LOG_APP_NAME,
  ip: envConfig.IP,
  host: envConfig.HOST,
  port: Number(envConfig.PORT) || 8000,
  protocol: envConfig.PROTOCOL,
  url: `${envConfig.PROTOCOL}://${envConfig.HOST}:${envConfig.PORT}`,
  dbConnectionPool: parseInt(envConfig.DB_CONNECTION_POOL),
  dbConnectionString: `postgresql://${dbUsername}:${dbPassword}@${envConfig.DB_HOST}:${envConfig.DB_PORT}/${envConfig.DB_NAME}?sslmode=prefer`
};

export default config;
