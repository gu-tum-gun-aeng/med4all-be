// deno-lint-ignore-file ban-types
import { assertEquals } from "../../../deps.ts";
import { testing } from "../../../deps.ts";
import DoctorController from "../../../src/controllers/doctor.controller.ts";

Deno.test("DoctorController.requestOtp should response with 200 ok", async () => {
  const expectedResult = "success";
  const mockContext = testing.createMockContext();
  (mockContext.request.body as object) = () => ({
    type: "json",
    value: {
      read: () => ({ "telephone": "0818126666" }),
    },
  });
  await DoctorController.requestOtp(mockContext);
  assertEquals(mockContext.response.body, { results: expectedResult });
});

Deno.test("DoctorController.verifyOtp should response with 200 ok", async () => {
  const expectedResult = "success";
  const mockContext = testing.createMockContext();
  (mockContext.request.body as object) = () => ({
    type: "json",
    value: {
      read: () => ({
        "telephone": "0818126666",
        "code": "1911",
      }),
    },
  });
  await DoctorController.verifyOtp(mockContext);
  assertEquals(mockContext.response.body, { results: expectedResult });
});
