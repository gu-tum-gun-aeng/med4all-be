import { Router } from "../../../deps.ts";
import PatientController from "../../controllers/patient.controller.ts";
import { responseOk } from "../../utils/response.util.ts";

const router = new Router();

router
    .get("/patients", PatientController.patients)
    .post('/uploads', ctx => PatientController.uploadImages(ctx))

export default router;
