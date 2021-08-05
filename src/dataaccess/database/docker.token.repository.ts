import { format } from "../../../deps.ts";
import config from "../../config/config.ts";
import dbUtils from "../../utils/db.util.ts";

const DoctorTokenRepository = {
  insert: async (token: string, validUntil: Date) => {
    const currentDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS");
    const insertQuery = await dbUtils.toQuery`
      INSERT INTO public.doctor_token(
        token,
        valid_until, 
        last_modified_by,
        last_modified_when,
        created_by,
        created_when)
        VALUES (
          ${token},
          ${validUntil},
          ${config.appName},
          ${currentDateTime},
          ${config.appName},
          ${currentDateTime})
    `;
    await dbUtils.excuteTransactional([
        insertQuery,
      ]);
    
    return result !== undefined;
  },
};

export default DoctorTokenRepository;
