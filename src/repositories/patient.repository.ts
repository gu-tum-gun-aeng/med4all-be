import { Patient } from "../models/patient.model.ts";
import dbUtils from "../utils/db.util.ts";

const SELECT_ALL_PATIENTS =
  "SELECT patient_id, name, age, weight_kg, height_cm, certificate_id, certificate_type_id, certificate_picture_url, covid_test_picture_url, medical_info FROM patient";

const PatientRepository = {
  getAll: async () => {
    return await dbUtils.queryObject<Patient>(SELECT_ALL_PATIENTS);
  },
};

export default PatientRepository;
