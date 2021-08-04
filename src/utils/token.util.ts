import { create, Payload, verify } from "djwt/mod.ts";

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

    if (payload.exp == null || payload.exp! < currentNumericDate()) {
      return false;
    }

    return true;
  } catch (_) {
    return false;
  }
};

const getNumericDateFrom = (dateTimeMillisecs: number): number =>
  dateTimeMillisecs / 1000;

const currentNumericDate = (): number =>
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
