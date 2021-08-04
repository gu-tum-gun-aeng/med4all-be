import { Patient } from "../models/patient/patient.model.ts";
import dbUtils from "../utils/db.util.ts";

const PatientRepository = {
  getAll: async () => {
    const query = dbUtils.toQuery
      `SELECT patient_id, name, age, weight_kg, height_cm, certificate_id, certificate_type_id, certificate_picture_url,
    covid_test_picture_url, medical_info FROM patient`;
    return await dbUtils.queryObject<Patient>(query);
  },
};

export default PatientRepository;
