import {
  create,
  decode,
  Payload,
  verify,
} from "https://deno.land/x/djwt@v2.2/mod.ts";

const ISSUER_CLAIM = "med4all";

export interface TokenInfo {
  id: number;
  ttlSeconds: number;
  hashAlgorithm: HashAlgorithm;
}

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

const getNumericDateFrom = (dateTimeMillisecs: number) =>
  dateTimeMillisecs / 1000;

export enum HashAlgorithm {
  None = "none",
  HS256 = "HS256",
  HS512 = "HS512",
  RS256 = "RS256",
  RS512 = "RS512",
  PS256 = "PS256",
  PS512 = "PS512",
}
