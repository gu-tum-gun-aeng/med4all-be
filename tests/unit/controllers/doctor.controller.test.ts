// // deno-lint-ignore-file ban-types
// import { assertEquals, stub } from "../../../deps.ts";
// import { testing } from "../../../deps.ts";
// import DoctorController from "../../../src/controllers/doctor.controller.ts";
// import DoctorService from "../../../src/services/doctor.service.ts";

// // Deno.test("DoctorController.requestOtp should response with 200 ok", async () => {
// //   const stubDoctorService = stub(
// //     DoctorService,
// //     "requestOtp",
// //     [await Promise.resolve(true)],
// //   );

// //   const expectedResult = "success";
// //   const mockContext = testing.createMockContext();
// //   (mockContext.request.body as object) = () => ({
// //     type: "json",
// //     value: {
// //       read: () => ({ "telephone": "0818126666" }),
// //     },
// //   });

// //   try {
// //     await DoctorController.requestOtp(mockContext);
// //     assertEquals(mockContext.response.body, { results: expectedResult });
// //   } finally {
// //     stubDoctorService.restore();
// //   }
// // });

// // Deno.test("DoctorController.verifyOtp should response with 200 ok", async () => {
// //   const expectedResult = "success";
// //   const mockContext = testing.createMockContext();
// //   (mockContext.request.body as object) = () => ({
// //     type: "json",
// //     value: {
// //       read: () => ({
// //         "telephone": "0818126666",
// //         "code": "1911",
// //       }),
// //     },
// //   });
// //   await DoctorController.verifyOtp(mockContext);
// //   assertEquals(mockContext.response.body, { results: expectedResult });
// // });
