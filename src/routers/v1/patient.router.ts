import { Router } from "../../../deps.ts";
import PatientController from "../../controllers/patient.controller.ts";
import { authenticated } from "../../middlewares/authenticated.middleware.ts";

const router = new Router();

router
  /**
   * @deprecated
   */
  .get("/patients", authenticated, PatientController.patients)
  /**
   * @deprecated
   */
  .get(
    "/patients/waiting",
    authenticated,
    PatientController.getFirstWaitingPatient,
  )
  .post(
    "/patients",
    authenticated,
    (ctx) => PatientController.createPatient(ctx),
  )
  /**
   * @deprecated
   */
  .post(
    "/patients/upload",
    authenticated,
    (ctx) => PatientController.uploadImagesByFormData(ctx),
  )
  /**
   * @deprecated
   */
  .post(
    "/patients/result",
    authenticated,
    (ctx) => PatientController.createPatientResult(ctx),
  );

export default router;
