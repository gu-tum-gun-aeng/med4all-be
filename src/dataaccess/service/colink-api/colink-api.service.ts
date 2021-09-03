import config from "../../../config/config.ts";
import { ky } from "../../../../deps.ts";
import { ColinkCheckStatusRequest } from "../../../models/colink/request/colink.check-status.request.ts";
import {
  ColinkCheckStatusResponse,
  fromColinkCheckStatusResponse,
} from "../../../models/colink/response/colink.check-status.response.ts";

const ColinkApiService = {
  checkStatus: async (
    request: ColinkCheckStatusRequest,
  ): Promise<ColinkCheckStatusResponse> => {
    const url = `${config.colink.apiUrlCheckStatus}`;
    const result = await ky.post(url, {
      json: request,
    }).json<ColinkCheckStatusResponse>();
    return fromColinkCheckStatusResponse(result);
  },
};

export default ColinkApiService;
