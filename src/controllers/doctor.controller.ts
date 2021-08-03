import type { RouterContext } from "../../deps.ts";
import { responseOk } from "../utils/response.util.ts";

const DoctorController = {
  requestOtp: async ({ response }: RouterContext): Promise<void> => {
    await responseOk(response, "success")
  },

  verifyOtp: async ({ response }: RouterContext): Promise<void> => {
    await responseOk(response, "success")
  },
};

export default DoctorController;
