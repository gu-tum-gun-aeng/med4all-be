import { assertEquals } from "../../../deps.ts";
import { create, Payload, verify } from "https://deno.land/x/djwt@v2.2/mod.ts";
import * as tokenUtil from "../../../src/utils/token.util.ts";
import config from "../../../src/config/config.ts"

Deno.test("createToken should create valid Token with given token id when call", async () => {
  const key = "someKey";
  const tokenInfo = {
    id: 123,
    ttlSeconds: 60,
    hashAlgorithm: tokenUtil.HashAlgorithm.HS512,
  };

  const token = await tokenUtil.createToken(tokenInfo, key);
  const payload = await verify(token, key, tokenUtil.HashAlgorithm.HS512);

  assertEquals(payload.jti, tokenInfo.id.toString());
});

Deno.test("isValid should return true when given token is not expired and issuer cliam is correct", async () => {
  const key = config.djwt.key;
  const tokenInfo = {
    id: 123,
    ttlSeconds: 60,
    hashAlgorithm: tokenUtil.HashAlgorithm.HS512,
  };

  const token = await tokenUtil.createToken(tokenInfo, key);
  const isValid = await tokenUtil.isValid(
    token,
    key,
    tokenUtil.HashAlgorithm.HS512,
  );

  assertEquals(isValid, true);
});

Deno.test("isValid should return false when given token is already expired", async () => {
  const key = config.djwt.key;
  const tokenInfo = {
    id: 123,
    ttlSeconds: -10,
    hashAlgorithm: tokenUtil.HashAlgorithm.HS512,
  };

  const token = await tokenUtil.createToken(tokenInfo, key);
  const isValid = await tokenUtil.isValid(
    token,
    key,
    tokenUtil.HashAlgorithm.HS512,
  );

  assertEquals(isValid, false);
});

Deno.test("isValid should return false when given token issuer claim is incorrect", async () => {
  const key = "someKey";

  const issueDateTime = tokenUtil.getNumericDateFrom(new Date().getTime());
  const payload: Payload = {
    jti: "1",
    iss: "some other issuer",
    ist: issueDateTime,
    exp: issueDateTime + 60,
  };

  const token = await create(
    { alg: tokenUtil.HashAlgorithm.HS512, typ: "JWT" },
    payload,
    key,
  );

  const isValid = await tokenUtil.isValid(
    token,
    key,
    tokenUtil.HashAlgorithm.HS512,
  );

  assertEquals(isValid, false);
});
