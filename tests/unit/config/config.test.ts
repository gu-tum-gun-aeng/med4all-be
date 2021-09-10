import { assertEquals } from "../../../deps.ts";
import config from "../../../src/config/config.ts";
import { ExternalRoutingDestination } from "../../../src/models/enum/externalRoutingDestination.ts";
import { VolunteerTeam } from "../../../src/models/volunteer/volunteer.team.ts";

Deno.test("config should be able to get related config from env file when OS env variable didn't set", () => {
  assertEquals(config.appName, "med4all-be-test");

  assertEquals(config.jwt.key, "someKey");
  assertEquals(config.jwt.ttlSeconds, 60);

  assertEquals(config.s3.accessKeyID, "someS3AccessKey");
  assertEquals(config.s3.secretKey, "someS3SecretKey");
  assertEquals(config.s3.bucketName, "someBucketName");
  assertEquals(config.s3.region, "someS3Region");

  assertEquals(config.nexmo.apiKey, "someNexmoApiKey");
  assertEquals(config.nexmo.ApiSecret, "someNexmoApiSecret");
});

Deno.test("config should be able to get related config from env file when OS env variable didn't set", () => {
  assertEquals(config.appName, "med4all-be-test");

  assertEquals(config.jwt.key, "someKey");
  assertEquals(config.jwt.ttlSeconds, 60);

  assertEquals(config.s3.accessKeyID, "someS3AccessKey");
  assertEquals(config.s3.secretKey, "someS3SecretKey");
  assertEquals(config.s3.bucketName, "someBucketName");
  assertEquals(config.s3.region, "someS3Region");

  assertEquals(config.nexmo.apiKey, "someNexmoApiKey");
  assertEquals(config.nexmo.ApiSecret, "someNexmoApiSecret");
});

Deno.test("config.dbConnectionString should return correct connection string when all required config are present", () => {
  const expected =
    `postgresql://someDbUserName:someDbPassword@someDbHost:5432/med4all?sslmode=prefer`;

  assertEquals(config.dbConnectionString, expected);
});

Deno.test("config.url should return correct url when all required config are present", () => {
  const expected = `http://localhost:8000`;

  assertEquals(config.url, expected);
});

Deno.test("config.volunteerTeamExternalRoutingDestinations should contain define external routing base on team when called", () => {
  assertEquals(
    config.volunteerTeamExternalRoutingDestinations.find((teamDestination) =>
      teamDestination.team == VolunteerTeam.Siriraj
    ),
    {
      team: VolunteerTeam.Siriraj,
      externalRoutingDestination: [ExternalRoutingDestination.Default],
    },
  );
});
