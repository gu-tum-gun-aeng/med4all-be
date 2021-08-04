import { assertEquals } from "../../../deps.ts";

import DoctorService from "../../../src/services/doctor.service.ts";

Deno.test("requestOtp should return true when given valid phone number", async () => {
  const expectedResult = true;
  const actualResult = await DoctorService.requestOtp("0818126666");
  assertEquals(actualResult, expectedResult);
});

Deno.test("verifyOtp should return true when given valid phone number and code", async () => {
  const expectedResult = true;
  const actualResult = await DoctorService.verifyOtp("0818126866", "1112");
  assertEquals(actualResult, expectedResult);
});
