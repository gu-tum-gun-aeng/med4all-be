import { DotenvConfig } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

export interface S3Config {
  accessKeyID: string;
  secretKey: string;
  bucketName: string;
  region: string;
}

export function getS3Config(dotenvConfig: DotenvConfig): S3Config {
  return {
    accessKeyID: Deno.env.get("S3_ACCESS_KEY_ID") ||
      dotenvConfig.S3_ACCESS_KEY_ID,
    secretKey: Deno.env.get("S3_SECRET_KEY") || dotenvConfig.S3_SECRET_KEY,
    bucketName: Deno.env.get("S3_BUCKET_NAME") || dotenvConfig.S3_BUCKET_NAME,
    region: Deno.env.get("S3_REGION") || dotenvConfig.S3_REGION,
  };
}
