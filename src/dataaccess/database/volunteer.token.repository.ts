import { format } from "../../../deps.ts";
import config from "../../config/config.ts";
import dbUtils from "../../utils/db.util.ts";

const VolunteerTokenRepository = {
  insert: async (token: string, validUntil: string): Promise<number> => {
    const currentDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS");
    const volunteerTokenId = await dbUtils.queryOneObject<{ value: BigInt }>`
      SELECT nextval('volunteer_token_volunteer_token_id_seq') as value
    `;
    const insertQuery = await dbUtils.toQuery`
      INSERT INTO public.volunteer_token(
        volunteer_token_id,
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
    await dbUtils.executeTransactional([
      insertQuery,
    ]);

    return Number(volunteerTokenId?.value);
  },
};

export default VolunteerTokenRepository;
