// import { Doctor } from "../../models/doctor/doctor.model.ts";
import dbUtils from "../../utils/db.util.ts";

const DoctorRepository = {
  isDoctor: async (telephone: string) => {
    const result = await dbUtils.queryOneObject
      `SELECT doctor_id FROM doctor WHERE mobile_phone_number = ${telephone} LIMIT 1`  
    
    return result !== undefined
  },
};

export default DoctorRepository;
