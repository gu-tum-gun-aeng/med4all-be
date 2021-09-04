import config from "../../../config/config.ts";
import { ky } from "../../../../deps.ts";
import {
  ColinkCheckStatusRequest,
} from "../../../models/colink/request/colink.check-status.request.ts";
import {
  ColinkCheckStatusCamelCaseResponse,
  fromColinkCheckStatusResponse,
} from "../../../models/colink/response/colink.check-status.response.ts";

const ColinkApiService = {
  checkStatus: async (
    request: ColinkCheckStatusRequest,
  ): Promise<ColinkCheckStatusCamelCaseResponse> => {
    const colinkUrl = `${config.colink.apiUrlCheckStatus}`;

    const api = ky.extend({
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set(
              "Authorization",
              `Bearer ${config.colink.token}`,
            );
          },
        ],
      },
    });

    const result = await api.post(colinkUrl, {
      json: request,
    }).json<ColinkCheckStatusCamelCaseResponse>();

    return fromColinkCheckStatusResponse(result);
  },
};

export default ColinkApiService;
