import { assertEquals } from "../../../deps.ts";
import config from "../../../src/config/config.ts";

Deno.test("config should be able to get related config from env file when call", () => {
  assertEquals(config.appName, "med4all-be-test");

  assertEquals(config.s3.accessKeyID, "someS3AccessKey");
  assertEquals(config.s3.secretKey, "someS3SecretKey");
});
