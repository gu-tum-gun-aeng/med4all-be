import { Router } from "../../../deps.ts";
import DoctorController from "../../controllers/doctor.controller.ts";

const router = new Router();

router
  .post("/doctors/otp/request", DoctorController.requestOtp)
  .post("/doctors/otp/verify", DoctorController.verifyOtp);

export default router;
