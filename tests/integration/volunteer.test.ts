// import { stub, superdeno } from "../../deps.ts";
// import app from "../../src/app.ts";
// import VolunteerRepository from "../../src/dataaccess/database/volunteer.repository.ts";

// // Deno.test("when call /v1/volunteers/otp/request, it should return 200 OK", async () => {
// //   const stubVolunteerRepository = stub(
// //     VolunteerRepository,
// //     "isVolunteer",
// //     [await Promise.resolve(true)],
// //   );

// //   try {
// //     await superdeno(app.handle.bind(app))
// //       .post("/v1/volunteers/otp/request")
// //       .send({ "telephone": "0818126865" })
// //       .expect(200)
// //       .expect({ results: "success" });
// //   } finally {
// //     stubVolunteerRepository.restore();
// //   }
// // });

// // Deno.test("when call /v1/volunteers/otp/verify, it should return 200 OK", async () => {
// //   await superdeno(app.handle.bind(app))
// //     .post("/v1/volunteers/otp/verify")
// //     .send({
// //       "telephone": "0818126865",
// //       "code": "1112",
// //     })
// //     .expect(200)
// //     .expect({ results: "success" });
// // });
