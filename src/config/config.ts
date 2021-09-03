import { dotenv } from "../../deps.ts";
import { getS3Config, S3Config } from "./s3.config.ts";
import { getNexmoApiConfig, NexmoApiConfig } from "./nexmo.config.ts";
import { getJwtConfig, JwtConfig } from "./jwt.config.ts";
import { DotenvConfig } from "https://deno.land/x/dotenv@v2.0.0/mod.ts"; // Todo: should move to deps
import { ColinkConfig, getColinkConfig } from "./colink.config.ts";

// Todo: should consider to change ENV to more specific name
const env: string = Deno.env.toObject().ENV;
const dotenvConfig = createDotenvFor(env);

/**
 * Configuration
 */
const config: ({
  env: string;
  appName: string;
  logAppName: string;
  host: string;
  port: number;
  protocol: string;
  url: string;
  dbConnectionPool: number;
  dbConnectionString: string;
  s3: S3Config;
  nexmo: NexmoApiConfig;
  jwt: JwtConfig;
  patientApiUrl: string;
  colink: ColinkConfig;
}) = {
  env,
  appName: dotenvConfig.APP_NAME,
  logAppName: dotenvConfig.LOG_APP_NAME,
  host: dotenvConfig.HOST,
  port: getConfigPort(dotenvConfig),
  protocol: dotenvConfig.PROTOCOL,
  url: getUrl(dotenvConfig),
  dbConnectionPool: parseInt(dotenvConfig.DB_CONNECTION_POOL),
  dbConnectionString: getDbConnectionString(dotenvConfig),
  s3: getS3Config(dotenvConfig),
  nexmo: getNexmoApiConfig(dotenvConfig),
  jwt: getJwtConfig(dotenvConfig),
  patientApiUrl: dotenvConfig.PATIENT_API_URL,
  colink: getColinkConfig(dotenvConfig),
};

function createDotenvFor(targetEnv: string): DotenvConfig {
  const envPath: string = `.env/.env.${targetEnv}`.toString();

  return dotenv({
    path: envPath,
  });
}

function getConfigPort(dotenvConfig: DotenvConfig): number {
  return Number(dotenvConfig.PORT) || 8000;
}

function getUrl(dotenvConfig: DotenvConfig): string {
  return `${dotenvConfig.PROTOCOL}://${dotenvConfig.HOST}:${dotenvConfig.PORT}`;
}

function getDbConnectionString(dotenvConfig: DotenvConfig): string {
  const dbUsername = Deno.env.get("DB_USERNAME") || dotenvConfig.DB_USERNAME;
  const dbPassword = Deno.env.get("DB_PASSWORD") || dotenvConfig.DB_PASSWORD;

  return `postgresql://${dbUsername}:${dbPassword}@${dotenvConfig.DB_HOST}:${dotenvConfig.DB_PORT}/${dotenvConfig.DB_NAME}?sslmode=prefer`;
}

export default config;
