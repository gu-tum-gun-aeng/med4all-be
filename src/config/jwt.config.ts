import { DotenvConfig } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

export interface JwtConfig {
  key: string;
  ttlSeconds: number;
}

export function getJwtConfig(dotenvConfig: DotenvConfig): JwtConfig {
  return {
    key: Deno.env.get("JWT_KEY") || dotenvConfig.JWT_KEY,
    ttlSeconds: parseInt(
      Deno.env.get("JWT_TTL_SECONDS") || dotenvConfig.JWT_TTL_SECONDS,
    ),
  };
}
