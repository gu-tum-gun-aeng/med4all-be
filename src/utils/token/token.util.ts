import * as Djwt from "https://deno.land/x/djwt@v2.2/mod.ts";
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
  idToVerify: string,
  token: string,
  key: string,
  hashAlgorithm: HashAlgorithm,
): Promise<boolean> => {
  try {
    const payload = await Djwt.verify(token, key, hashAlgorithm);

    return isIssuerValid(payload) &&
      isNotExpired(payload) &&
      isJtiMatch(payload, idToVerify);
  } catch (_) {
    return false;
  }

  function isIssuerValid(payload: Djwt.Payload): boolean {
    return payload.iss !== null && payload.iss! === ISSUER_CLAIM;
  }

  function isNotExpired(payload: Djwt.Payload): boolean {
    return payload.exp !== null && payload.exp! >= currentSecondsSinceEpoch();
  }

  function isJtiMatch(payload: Djwt.Payload, idToVerify: string): boolean {
    return payload.jti !== null && payload.jti! === idToVerify;
  }
};

export const verify = (
  token: string,
  key: string,
  hashAlgorithm: HashAlgorithm,
): Promise<Djwt.Payload> => {
  return Djwt.verify(token, key, hashAlgorithm);
};

export const getNumericDateFrom = (dateTimeMillisecs: number): number =>
  dateTimeMillisecs / 1000;

export const currentNumericDate = (): number =>
  getNumericDateFrom(new Date().getTime());

export enum HashAlgorithm {
  None = "none",
  HS256 = "HS256",
  HS512 = "HS512",
  RS256 = "RS256",
  RS512 = "RS512",
  PS256 = "PS256",
  PS512 = "PS512",
}
