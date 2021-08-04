import { Router } from "oak/mod.ts";
import PatientController from "src/controllers/patient.controller.ts";

const router = new Router();

router
  .get("/patients", PatientController.patients)
  .post(
    "/patients/upload",
    (ctx) => PatientController.uploadImagesByFormData(ctx),
  );

export default router;
