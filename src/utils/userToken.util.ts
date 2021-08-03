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

  return await create({ alg: "HS512", typ: "JWT" }, payload, key);
};

const getNumericDateFrom = (dateTimeMillisecs: number) =>
  dateTimeMillisecs / 1000;
