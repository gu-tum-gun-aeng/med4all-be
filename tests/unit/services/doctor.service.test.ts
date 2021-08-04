import { assertEquals, assertThrowsAsync, stub } from "../../../deps.ts";
import DoctorRepository from "../../../src/dataaccess/database/doctor.repository.ts";

import DoctorService from "../../../src/services/doctor.service.ts";

Deno.test("requestOtp should return true when given valid phone number", async () => {
  const expectedResult = await Promise.resolve(true)
  const stubDoctorRepository = stub(
    DoctorRepository,
    "isDoctor",
    [expectedResult],
  );
  try {
    const actualResult = await DoctorService.requestOtp("0818126666");
    assertEquals(actualResult, expectedResult);
  } finally {
    stubDoctorRepository.restore();
  }
});

Deno.test("requestOtp should return error when given invalid phone number", async () => {
  const expectedResult = await Promise.resolve(false)
  const stubDoctorRepository = stub(
    DoctorRepository,
    "isDoctor",
    [expectedResult],
  );
  try {
    const actualResult = DoctorService.requestOtp("0818126666");
    assertThrowsAsync(() => actualResult)
  } finally {
    stubDoctorRepository.restore();
  }
});

Deno.test("verifyOtp should return true when given valid phone number and code", async () => {
  const expectedResult = true;
  const actualResult = await DoctorService.verifyOtp("0818126866", "1112");
  assertEquals(actualResult, expectedResult);
});
