import * as jwt from "https://deno.land/x/djwt@v2.2/mod.ts";
import { currentSecondsSinceEpoch } from "../date.util.ts";

// Todo: This should be a config.
const ISSUER_CLAIM = "med4all";

export type TokenInfo = {
  id: string;
  ttlSeconds: number;
  hashAlgorithm: HashAlgorithm;
};

export const createToken = async (
  tokenInfo: TokenInfo,
  key: string,
): Promise<string> => {
  const issueDateTime = currentSecondsSinceEpoch();

  const payload: jwt.Payload = {
    jti: tokenInfo.id,
    iss: ISSUER_CLAIM,
    ist: issueDateTime,
    exp: issueDateTime + tokenInfo.ttlSeconds,
  };

  return await jwt.create(
    { alg: tokenInfo.hashAlgorithm, typ: "JWT" },
    payload,
    key,
  );
};

export const isValid = async (
  idToVerify: string,
  token: string,
  key: string,
  hashAlgorithm: HashAlgorithm,
): Promise<boolean> => {
  try {
    const payload = await jwt.verify(token, key, hashAlgorithm);

    return isIssuerValid(payload) &&
      isNotExpired(payload) &&
      isJtiMatch(payload, idToVerify);
  } catch (_) {
    return false;
  }

  function isIssuerValid(payload: jwt.Payload): boolean {
    return payload.iss !== null && payload.iss! === ISSUER_CLAIM;
  }

  function isNotExpired(payload: jwt.Payload): boolean {
    return payload.exp !== null && payload.exp! >= currentSecondsSinceEpoch();
  }

  function isJtiMatch(payload: jwt.Payload, idToVerify: string): boolean {
    return payload.jti !== null && payload.jti! === idToVerify;
  }
};

export enum HashAlgorithm {
  None = "none",
  HS256 = "HS256",
  HS512 = "HS512",
  RS256 = "RS256",
  RS512 = "RS512",
  PS256 = "PS256",
  PS512 = "PS512",
}
