// import { Volunteer } from "../../models/volunteer/volunteer.model.ts";
import dbUtils from "../../utils/db.util.ts";

const VolunteerRepository = {
  isVolunteer: async (telephone: string) => {
    const result = await dbUtils.queryOneObject
      `SELECT volunteer_id FROM volunteer WHERE mobile_phone_number = ${telephone} AND is_active = true LIMIT 1`;

    return result !== undefined;
  },
  getActiveIdByTelephone: async (
    telephone: string,
  ): Promise<number | undefined> => {
    const result = await dbUtils.queryOneObject<number>
      `SELECT volunteer_id FROM volunteer WHERE mobile_phone_number = ${telephone} AND is_active = true LIMIT 1`;

    return result;
  },
};

export default VolunteerRepository;
