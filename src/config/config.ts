import { dotenv } from "../../deps.ts";
import { getS3Config, S3Config } from "./s3.ts";
import { NexmoApiConfig } from "./nexmo.ts";
import { Djwt } from "./djwt.ts";
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
  djwt: Djwt;
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
  nexmo: {
    apiKey: Deno.env.get("NEXMO_API_KEY") || dotenvConfig.NEXMO_API_KEY,
    ApiSecret: Deno.env.get("NEXMO_API_SECRET") ||
      dotenvConfig.NEXMO_API_SECRET,
    requesOtptUrl: Deno.env.get("NEXMO_REQUEST_OTP_URL") ||
      dotenvConfig.NEXMO_REQUEST_OTP_URL,
    verifyOtpUrl: Deno.env.get("NEXMO_VERIFY_OTP_URL") ||
      dotenvConfig.NEXMO_VERIFY_OTP_URL,
    brand: Deno.env.get("NEXMO_BRAND") || dotenvConfig.NEXMO_BRAND,
    workflowId: Deno.env.get("NEXMO_WORKFLOW_ID") ||
      dotenvConfig.NEXMO_WORKFLOW_ID,
    pinExpire: Deno.env.get("NEXMO_PIN_EXPIRE") ||
      dotenvConfig.NEXMO_PIN_EXPIRE,
  },
  djwt: {
    key: Deno.env.get("DJWT_KEY") || dotenvConfig.DJWT_KEY,
    ttlSeconds: parseInt(
      Deno.env.get("DJWT_TTL_SECONDS") || dotenvConfig.DJWT_TTL_SECONDS,
    ),
  },
};

function createDotenvFor(targetEnv: string): DotenvConfig {
  const envPath: string = `.env/.env.${targetEnv}`.toString();

  return dotenv({
    path: envPath,
  });
}

export default config;
