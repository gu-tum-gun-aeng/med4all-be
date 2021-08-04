import { Router } from "../../../deps.ts";
import PatientController from "../../controllers/patient.controller.ts";

const router = new Router();

router
  .get("/patients", PatientController.patients)
  .post("/patient", (ctx) => PatientController.createPatient(ctx))
  .post(
    "/patients/upload",
    (ctx) => PatientController.uploadImagesByFormData(ctx),
  );

export default router;
