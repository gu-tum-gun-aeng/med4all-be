import { assertEquals } from "../../../deps.ts";
import { createUserToken } from "../../../src/utils/userToken.util.ts";

// Deno.test("createToken should create Token with key when given key to the function", async () => {
//   const key = "someKey";
//   const tokenInfo = { id: 123, ttlSeconds: 60 };

//   const expectedToken =
//     "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMjMiLCJpc3MiOiJtZWQ0YWxsIiwiaXN0IjoxNjI3OTkxMTUzLjY5NCwiZXhwIjoxNjI3OTkxMjEzLjY5NH0.IGkUue_aNd4DEz-3tJ4Ft9qsqhzn_plnBA_3MiwD94oJgEUYnuWOWWpzV9RFdn_Ukti3mGlencNDIESNkgC0Kw";

//   const actualResult = await createUserToken(tokenInfo, key);

//   assertEquals(actualResult, expectedToken);
// });
