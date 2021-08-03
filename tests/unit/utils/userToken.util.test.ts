import { assertEquals } from "../../../deps.ts";
import { createUserToken } from "../../../src/utils/userToken.util.ts";

Deno.test("createToken should create Token with key when given key to the function", async () => {
  const key = "someKey";
  const userPayload = { id: 123 };

  const expectedToken =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzfQ.IjNmcIjZ7w3kIITfFW9oqawU87mHpXjspttbteFG25285ATEWuw4uKNDgrKWtvIkEPrPOf7UtBORE3foYKKgzg";

  const actualResult = await createUserToken(userPayload, key);

  assertEquals(expectedToken, actualResult);
});
