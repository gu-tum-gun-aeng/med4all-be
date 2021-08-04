import { stub, superdeno } from "../../deps.ts";
import app from "../../src/app.ts";
import DoctorRepository from "../../src/dataaccess/database/doctor.repository.ts";

Deno.test("when call /v1/doctors/otp/request, it should return 200 OK", async () => {
  const stubDoctorRepository = stub(
    DoctorRepository,
    "isDoctor",
    [await Promise.resolve(true)],
  );

  try {
    await superdeno(app.handle.bind(app))
    .post("/v1/doctors/otp/request")
    .send({ "telephone": "0818126865" })
    .expect(200)
    .expect({ results: "success" });
  } finally {
    stubDoctorRepository.restore()
  }
});

Deno.test("when call /v1/doctors/otp/verify, it should return 200 OK", async () => {
  await superdeno(app.handle.bind(app))
    .post("/v1/doctors/otp/verify")
    .send({
      "telephone": "0818126865",
      "code": "1112",
    })
    .expect(200)
    .expect({ results: "success" });
});
