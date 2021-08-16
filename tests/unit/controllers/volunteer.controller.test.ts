// deno-lint-ignore-file no-explicit-any
import { assertEquals, stub } from "../../../deps.ts";
import { testing } from "../../../deps.ts";
import VolunteerController from "../../../src/controllers/volunteer.controller.ts";
import VolunteerService from "../../../src/services/volunteer.service.ts";
import VolunteerTokenService from "../../../src/services/volunteer.token.service.ts";

Deno.test("VolunteerController.requestOtp should response with 200 ok", async () => {
  const stubVolunteerService = stub(
    VolunteerService,
    "requestOtp",
    [await Promise.resolve("REQUEST_ID")],
  );
  const stubGetActiveIdByTelephone = stub(
    VolunteerService,
    "getActiveIdByTelephone",
    [await Promise.resolve(1)],
  );

  const expectedResult = { "requestId": "REQUEST_ID" };
  const mockContext = testing.createMockContext();
  (mockContext.request.body as any) = () => ({
    type: "json",
    value: { "telephone": "0818126666" },
  });

  try {
    await VolunteerController.requestOtp(mockContext);
    assertEquals(mockContext.response.body, { results: expectedResult });
  } finally {
    stubVolunteerService.restore();
    stubGetActiveIdByTelephone.restore();
  }
});

Deno.test("VolunteerController.verifyOtp should response with 200 ok", async () => {
  const stubVerifyOtp = stub(
    VolunteerService,
    "verifyOtp",
    [await Promise.resolve(true)],
  );
  const stubGetActiveIdByTelephone = stub(
    VolunteerService,
    "getActiveIdByTelephone",
    [await Promise.resolve(1)],
  );
  const stubInsertToken = stub(
    VolunteerTokenService,
    "insert",
    [await Promise.resolve(1)],
  );

  const mockContext = testing.createMockContext();
  (mockContext.request.body as any) = () => ({
    type: "json",
    value: {
      "telephone": "0818126666",
      "requestId": "REQUEST_ID",
      "code": "1911",
    },
  });

  try {
    await VolunteerController.verifyOtp(mockContext);
    assertEquals(mockContext.response.status, 200);
  } finally {
    stubVerifyOtp.restore();
    stubGetActiveIdByTelephone.restore();
    stubInsertToken.restore();
  }
});
