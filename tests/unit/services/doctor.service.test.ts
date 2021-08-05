import { assertEquals, stub } from "../../../deps.ts";
import DoctorRepository from "../../../src/dataaccess/database/doctor.repository.ts";
import NexmoService from "../../../src/dataaccess/service/nexmo/nexmo.service.ts";

import DoctorService from "../../../src/services/doctor.service.ts";

const successResult = {
  "request_id": "123",
  status: "0",
};

Deno.test("requestOtp should return true when given valid phone number", async () => {
  const expectedResult = await Promise.resolve(true);
  const stubDoctorRepository = stub(
    DoctorRepository,
    "isDoctor",
    [expectedResult],
  );

  const expectedResultRequestOtp = await Promise.resolve(successResult);
  const stubNexmoRequestOtp = stub(
    NexmoService,
    "requestOtp",
    [expectedResultRequestOtp],
  );

  try {
    const actualResult = await DoctorService.requestOtp("66818126666");
    assertEquals(actualResult, successResult.request_id);
  } finally {
    stubDoctorRepository.restore();
    stubNexmoRequestOtp.restore();
  }
});

Deno.test("verifyOtp should return true when given valid request_id number and code", async () => {
  const expectedResult = true;
  const expectedResultRequestOtp = await Promise.resolve(successResult);
  const stubNexmoRequestOtp = stub(
    NexmoService,
    "verifyOtp",
    [expectedResultRequestOtp],
  );
  try {
    const actualResult = await DoctorService.verifyOtp("66818126866", "1112");
    assertEquals(actualResult, expectedResult);
  } finally {
    stubNexmoRequestOtp.restore();
  }
});
