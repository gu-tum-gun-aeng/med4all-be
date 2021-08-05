import { assertEquals, stub } from "../../../deps.ts";
import { testing } from "../../../deps.ts";
import DoctorController from "../../../src/controllers/doctor.controller.ts";
import DoctorService from "../../../src/services/doctor.service.ts";
import * as tokenUtil from "../../../src/utils/token.util.ts";
import DoctorTokenService from "../../../src/services/doctor.token.service.ts";

Deno.test("DoctorController.requestOtp should response with 200 ok", async () => {
  const stubDoctorService = stub(
    DoctorService,
    "requestOtp",
    [await Promise.resolve("REQUEST_ID")],
  );

  const expectedResult = {"requestId": "REQUEST_ID"};
  const mockContext = testing.createMockContext();
  (mockContext.request.body as object) = () => ({
    type: "json",
    value: {
      read: () => ({ "telephone": "0818126666" }),
    },
  });

  try {
    await DoctorController.requestOtp(mockContext);
    assertEquals(mockContext.response.body, { results: expectedResult });
  } finally {
    stubDoctorService.restore();
  }
});

Deno.test("DoctorController.verifyOtp should response with 200 ok", async () => {
  const stubVerifyOtp = stub(
    DoctorService,
    "verifyOtp",
    [await Promise.resolve(true)],
  );
  const stubGetIdByTelephone = stub(
    DoctorService,
    "getIdByTelephone",
    [await Promise.resolve(1)],
  );
  const stubInsertToken = stub(
    DoctorTokenService,
    "insert",
    [await Promise.resolve(1)],
  );

  const mockContext = testing.createMockContext();
  (mockContext.request.body as object) = () => ({
    type: "json",
    value: {
      read: () => ({
        "telephone": "0818126666",
        "requestId": "REQUEST_ID",
        "code": "1911",
      }),
    },
  });

  try {
    await DoctorController.verifyOtp(mockContext);
    assertEquals(mockContext.response.status, 200);
  } finally {
    stubVerifyOtp.restore()
    stubGetIdByTelephone.restore()
    // stubCreateToken.restore()
    // stubVerifyToken.restore()
    stubInsertToken.restore()
  }
});
