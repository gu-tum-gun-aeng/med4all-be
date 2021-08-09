import { Router } from "../../../deps.ts";
import PatientController from "../../controllers/patient.controller.ts";
import { authenticated }  from "../../middlewares/authenticated.middleware.ts"

const router = new Router();

router
  .get("/patients", authenticated, PatientController.patients)
  .get("/patients/waiting",  PatientController.getFirstWaitingPatient)
  .post("/patients",  (ctx) => PatientController.createPatient(ctx))
  .post(
    "/patients/upload",
    (ctx) => PatientController.uploadImagesByFormData(ctx),
  )
  .post(
    "/patients/result", 
    (ctx) => PatientController.createPatientResult(ctx),
  );

export default router;
