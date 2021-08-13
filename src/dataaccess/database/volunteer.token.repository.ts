import { format } from "../../../deps.ts";
import config from "../../config/config.ts";
import dbUtils from "../../utils/db.util.ts";

// TODO: ESSENTIAL: Fix query to be 'volunteer' instead
const VolunteerTokenRepository = {
  insert: async (token: string, validUntil: string): Promise<number> => {
    const currentDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS");
    const volunteerTokenId = await dbUtils.queryOneObject<{ value: BigInt }>`
      SELECT nextval('doctor_token_doctor_token_id_seq') as value
    `;
    const insertQuery = await dbUtils.toQuery`
      INSERT INTO public.doctor_token(
        doctor_token_id,
        token,
        valid_until, 
        last_modified_by,
        last_modified_when,
        created_by,
        created_when)
        VALUES (
            ${volunteerTokenId?.value},
            ${token},
            ${validUntil},
            ${config.appName},
            ${currentDateTime},
            ${config.appName},
            ${currentDateTime}
        )`;
    await dbUtils.excuteTransactional([
      insertQuery,
    ]);

    return Number(volunteerTokenId?.value);
  },
};

export default VolunteerTokenRepository;
