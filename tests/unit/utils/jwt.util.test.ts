import { assertEquals, stub } from "../../../deps.ts";
import * as jwt from "../../../src/utils/jwt.util.ts";

Deno.test("createToken should create Token with key when given key to the function", async () => {
  const key = "someKey";
  const expectedToken =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzfQ.IjNmcIjZ7w3kIITfFW9oqawU87mHpXjspttbteFG25285ATEWuw4uKNDgrKWtvIkEPrPOf7UtBORE3foYKKgzg";

  const actualResult = await jwt.createUserToken({ id: 123 }, key);

  assertEquals(expectedToken, actualResult);
});
