import * as Djwt from "https://deno.land/x/djwt@v2.2/mod.ts";
import { currentSecondsSinceEpoch } from "../date.util.ts";
import config from "../../config/config.ts";

const ISSUER_CLAIM = config.appName;

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

  const payload: Djwt.Payload = {
    jti: tokenInfo.id,
    iss: ISSUER_CLAIM,
    ist: issueDateTime,
    exp: issueDateTime + tokenInfo.ttlSeconds,
  };

  return await Djwt.create(
    { alg: tokenInfo.hashAlgorithm, typ: "JWT" },
    payload,
    key,
  );
};

export const isValid = async (
  token: string,
  key: string,
  hashAlgorithm: HashAlgorithm,
): Promise<boolean> => {
  try {
    const payload = await Djwt.verify(token, key, hashAlgorithm);

    return isIssuerValid(payload) && isNotExpired(payload);
  } catch (_) {
    return false;
  }

  function isIssuerValid(payload: Djwt.Payload): boolean {
    return payload.iss !== null && payload.iss! === ISSUER_CLAIM;
  }

  function isNotExpired(payload: Djwt.Payload): boolean {
    return payload.exp !== null && payload.exp! >= currentSecondsSinceEpoch();
  }
};

export const verify = (
  token: string,
  key: string,
  hashAlgorithm: HashAlgorithm,
): Promise<Djwt.Payload> => {
  return Djwt.verify(token, key, hashAlgorithm);
};

export async function getIdFrom(
  token: string,
  key: string,
  hashAlgorithm: HashAlgorithm,
) {
  const t = await Djwt.verify(token, key, hashAlgorithm);

  return t.jti;
}

export enum HashAlgorithm {
  None = "none",
  HS256 = "HS256",
  HS512 = "HS512",
  RS256 = "RS256",
  RS512 = "RS512",
  PS256 = "PS256",
  PS512 = "PS512",
}
