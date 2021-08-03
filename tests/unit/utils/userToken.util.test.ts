import { assertEquals } from "../../../deps.ts";
import { verify } from "https://deno.land/x/djwt@v2.2/mod.ts";
import {
  createToken,
  HashAlgorithm,
} from "../../../src/utils/userToken.util.ts";

Deno.test("createToken should create valid Token with given token id when call", async () => {
  const key = "someKey";
  const tokenInfo = {
    id: 123,
    ttlSeconds: 60,
    hashAlgorithm: HashAlgorithm.HS512,
  };

  const token = await createToken(tokenInfo, key);
  const payload = await verify(token, key, HashAlgorithm.HS512);

  assertEquals(payload.jti, tokenInfo.id.toString());
});
