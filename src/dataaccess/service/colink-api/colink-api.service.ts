import config from "../../../config/config.ts";
import { ky } from "../../../../deps.ts";
import { ColinkCheckStatusRequest } from "../../../models/colink/request/colink.check-status.request.ts";
import { ColinkCheckStatusResponse } from "../../../models/colink/response/colink.check-status.response.ts";

const ColinkApiService = {
  checkStatus: (
    request: ColinkCheckStatusRequest,
  ): Promise<ColinkCheckStatusResponse> => {
    const url = `${config.colink.apiUrlCheckStatus}`;
    return ky.post(url, {
      json: request,
    }).json<ColinkCheckStatusResponse>();
  },
};

export default ColinkApiService;
