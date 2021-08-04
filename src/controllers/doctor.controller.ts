import type { RouterContext } from "../../deps.ts";
import { responseOk } from "../utils/response.util.ts";
import DoctorService from "../services/doctor.service.ts";

const DoctorController = {
  requestOtp: async ({ request, response }: RouterContext): Promise<void> => {
    const { telephone } = await request.body({ type: "json" }).value;

    const result = DoctorService.requestOtp(telephone);

    await responseOk(response, await result ? "success" : "failed");
  },

  verifyOtp: async ({ request, response }: RouterContext): Promise<void> => {
    const { telephone, code } = await request.body({ type: "json" }).value;

    const result = DoctorService.verifyOtp(telephone, code);

    await responseOk(response, await result ? "success" : "failed");
  },
};

export default DoctorController;
