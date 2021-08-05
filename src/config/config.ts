import { dotenv } from "../../deps.ts";
import { getS3Config, S3Config } from "./s3.config.ts";
import { getNexmoApiConfig, NexmoApiConfig } from "./nexmo.config.ts";
import { getJwtConfig, JwtConfig } from "./jwt.config.ts";
import { DotenvConfig } from "https://deno.land/x/dotenv@v2.0.0/mod.ts"; // Todo: should move to deps

const env: string = Deno.env.toObject().ENV || "dev";
const dotenvConfig = createDotenvFor(env);

/**
 * Configuration
 */
const dbUsername = Deno.env.get("DB_USERNAME") || dotenvConfig.DB_USERNAME;
const dbPassword = Deno.env.get("DB_PASSWORD") || dotenvConfig.DB_PASSWORD;

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
  s3: S3Config;
  nexmo: NexmoApiConfig;
  jwt: JwtConfig;
}) = {
  env,
  appName: dotenvConfig.APP_NAME,
  logAppName: dotenvConfig.LOG_APP_NAME,
  ip: dotenvConfig.IP,
  host: dotenvConfig.HOST,
  port: Number(dotenvConfig.PORT) || 8000,
  protocol: dotenvConfig.PROTOCOL,
  url: `${dotenvConfig.PROTOCOL}://${dotenvConfig.HOST}:${dotenvConfig.PORT}`,
  dbConnectionPool: parseInt(dotenvConfig.DB_CONNECTION_POOL),
  dbConnectionString:
    `postgresql://${dbUsername}:${dbPassword}@${dotenvConfig.DB_HOST}:${dotenvConfig.DB_PORT}/${dotenvConfig.DB_NAME}?sslmode=prefer`,
  s3: getS3Config(dotenvConfig),
  nexmo: getNexmoApiConfig(dotenvConfig),
  jwt: getJwtConfig(dotenvConfig),
};

function createDotenvFor(targetEnv: string): DotenvConfig {
  const envPath: string = `.env/.env.${targetEnv}`.toString();

  return dotenv({
    path: envPath,
  });
}

export default config;
