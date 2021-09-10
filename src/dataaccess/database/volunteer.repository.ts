import {
  Volunteer,
  VolunteerId,
} from "../../models/volunteer/volunteer.model.ts";
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
    const result = await dbUtils.queryOneObject<VolunteerId>
      `SELECT volunteer_id as id FROM volunteer WHERE mobile_phone_number = ${telephone} AND is_active = true LIMIT 1`;

    return result?.id;
  },
  getVolunteerById: async (
    volunteerId: number,
  ): Promise<Volunteer | undefined> => {
    const result = await dbUtils.queryOneObject<Volunteer>
      `SELECT volunteer_id as id
            , name as name
            , volunteer_team_id as team
            , mobile_phone_number as mobilePhone
            , is_active as isActive 
      FROM volunteer 
      WHERE volunteer_id = ${volunteerId} AND is_active = true LIMIT 1`;

    return result;
  },
};

export default VolunteerRepository;
