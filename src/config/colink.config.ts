import { DotenvConfig } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

export interface ColinkConfig {
  apiUrlCheckStatus: string;
  token: string;
}

export function getColinkConfig(dotenvConfig: DotenvConfig): ColinkConfig {
  return {
    apiUrlCheckStatus: Deno.env.get("COLINK_API_URL_CHECK_STATUS") ||
      dotenvConfig.COLINK_API_URL_CHECK_STATUS,
    token: Deno.env.get("COLINK_TOKEN") || dotenvConfig.COLINK_TOKEN,
  };
}
