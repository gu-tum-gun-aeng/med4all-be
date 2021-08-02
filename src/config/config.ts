import { dotEnv } from "../../deps.ts";
import { S3Config } from "./s3.ts";

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
  s3: S3Config;
}) = {
  env,
  appName: envConfig.APP_NAME,
  logAppName: envConfig.LOG_APP_NAME,
  ip: envConfig.IP,
  host: envConfig.HOST,
  port: Number(envConfig.PORT) || 8000,
  protocol: envConfig.PROTOCOL,
  url: `${envConfig.PROTOCOL}://${envConfig.HOST}:${envConfig.PORT}`,
  s3: {
    accessKeyID: envConfig.S3_ACCESS_KEY_ID,
    secretKey: envConfig.S3_SECRET_KEY,
    bucketName: envConfig.S3_BUCKET_NAME,
    region: envConfig.S3_REGION,
  },
};

export default config;
