import { Router } from "../../../deps.ts";
import PatientController from "../../controllers/patient.controller.ts";
import { authenticated } from "../../middlewares/authenticated.middleware.ts";

const router = new Router();

router
  .get("/patients", authenticated, PatientController.patients)
  .get(
    "/patients/:certificateId/register-status",
    authenticated,
    (ctx) => PatientController.getPatientRegisterStatus(ctx),
  )
  .post(
    "/patients",
    authenticated,
    (ctx) => PatientController.createPatient(ctx),
  )
  .post(
    "/patients/upload",
    authenticated,
    (ctx) => PatientController.uploadImagesByFormData(ctx),
  )
  .post(
    "/patients/result",
    authenticated,
    (ctx) => PatientController.createPatientResult(ctx),
  );

export default router;
