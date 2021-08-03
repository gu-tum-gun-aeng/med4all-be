import type { RouterContext } from "../../deps.ts";
import { responseOk } from "../utils/response.util.ts";

const DoctorController = {
  requestOtp: async ({ request, response }: RouterContext): Promise<void> => {
    const { telephone } = await request.body({ type: "json" }).value

    // DoctorService.requestOtp(telephone)

    await responseOk(response, "success")
  },

  verifyOtp: async ({ request, response }: RouterContext): Promise<void> => {
    const { telephone, code } = await request.body({ type: "json" }).value

    // DoctorService.verifyOtp(telephone, code)

    await responseOk(response, "success")
  },
};

export default DoctorController;
