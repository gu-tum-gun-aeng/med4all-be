import { DotenvConfig } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

export interface NexmoApiConfig {
  requesOtptUrl: string;
  verifyOtpUrl: string;
  apiKey: string;
  ApiSecret: string;
  brand: string;
  workflowId: string;
  pinExpire: string;
}

export function getNexmoApiConfig(dotenvConfig: DotenvConfig): NexmoApiConfig {
  return {
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
  };
}
