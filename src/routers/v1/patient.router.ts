import { Router } from "../../../deps.ts";
import PatientController from "../../controllers/patient.controller.ts";
import { authenticated } from "../../middlewares/authenticated.middleware.ts";

const router = new Router();

router
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

export default router;
