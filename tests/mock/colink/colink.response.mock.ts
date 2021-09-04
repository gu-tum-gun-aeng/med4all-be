import {
  ColinkCheckStatusCamelCaseResponse,
  ColinkCheckStatusResponse,
  fromColinkCheckStatusResponse,
} from "../../../src/models/colink/response/colink.check-status.response.ts";

export const mockColinkApiCheckStatusDuplicatePatientResponse =
  async (): Promise<
    ColinkCheckStatusCamelCaseResponse
  > => {
    const mock: ColinkCheckStatusResponse = {
      found: true,
      // deno-lint-ignore camelcase
      record_details: {
        passport: "",
        cid: "1100800861504",
        firstname: "วีรญา",
        lastname: "ชื่นปรีชา",
        contact_number: "0999876509",
        status: "Admit แล้ว(ปิดเคส)",
        hospital_admitted: "อื่นๆ",
        hospital_admitted_datetime: "2021-05-03T00:00:00.000Z",
      },
    };

    return await fromColinkCheckStatusResponse(mock);
  };
