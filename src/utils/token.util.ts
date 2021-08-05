import { create, Payload, verify } from "https://deno.land/x/djwt@v2.2/mod.ts";

// Todo: This should be a config.
const ISSUER_CLAIM = "med4all";

export type TokenInfo = {
  id: number;
  ttlSeconds: number;
  hashAlgorithm: HashAlgorithm;
};

export const createToken = async (
  tokenInfo: TokenInfo,
  key: string,
): Promise<string> => {
  const issueDateTime = getNumericDateFrom(new Date().getTime());

  const payload: Payload = {
    jti: tokenInfo.id.toString(),
    iss: ISSUER_CLAIM,
    ist: issueDateTime,
    exp: issueDateTime + tokenInfo.ttlSeconds,
  };

  return await create(
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
    const payload = await verify(token, key, hashAlgorithm);

    return isNotExpired(payload) && isIssuerValid(payload);
  } catch (_) {
    return false;
  }

  function isNotExpired(payload: Payload): boolean {
    return payload.exp != null && payload.exp! >= currentNumericDate();
  }

  function isIssuerValid(payload: Payload): boolean {
    return payload.iss != null && payload.iss! == ISSUER_CLAIM;
  }
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
