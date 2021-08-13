import { Router } from "../../../deps.ts";
import VolunteerController from "../../controllers/volunteer.controller.ts";

const router = new Router();

router
  .post("/volunteers/otp/request", VolunteerController.requestOtp)
  .post("/volunteers/otp/verify", VolunteerController.verifyOtp);

export default router;
