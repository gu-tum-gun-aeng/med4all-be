import { assertEquals } from "testing/asserts.ts";
import { verify } from "djwt/mod.ts";

import * as tokenUtil from "src/utils/token.util.ts";

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

Deno.test("isValid should return true when given token is not expired yet", async () => {
  const key = "someKey";
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
  const key = "someKey";
  const tokenInfo = {
    id: 123,
    ttlSeconds: 0,
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
