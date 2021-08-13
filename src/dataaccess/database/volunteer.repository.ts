// import { Volunteer } from "../../models/volunteer/volunteer.model.ts";
import dbUtils from "../../utils/db.util.ts";

// TODO: ESSENTIAL: #20 Fix query to be 'volunteer' instead
// TODO: ESSENTIAL: #21 add column 'volunteer_group' to table 'volunteer'
const VolunteerRepository = {
  isExist: async (telephone: string) => {
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
