// import { Volunteer } from "../../models/volunteer/volunteer.model.ts";
import dbUtils from "../../utils/db.util.ts";

// TODO: Fix query to be 'volunteer' instead
const VolunteerRepository = {
  isVolunteer: async (telephone: string) => {
    const result = await dbUtils.queryOneObject
      `SELECT doctor_id FROM doctor WHERE mobile_phone_number = ${telephone} LIMIT 1`;

    return result !== undefined;
  },
  getIdByTelePhone: async (telephone: string): Promise<number | undefined> => {
    const result = await dbUtils.queryOneObject<number>
      `SELECT doctor_id FROM doctor WHERE mobile_phone_number = ${telephone} LIMIT 1`;

    return result;
  },
};

export default VolunteerRepository;
