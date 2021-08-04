import { Patient } from "../../models/patient/patient.model.ts";
import { CreatePatientRequest } from "../../models/request/patient.request.ts";
import dbUtils from "../../utils/db.util.ts";

const PatientRepository = {
  getAll: async () => {
    const query = //dbUtils.toQuery
      `SELECT patient_id, name, age, weight_kg, height_cm, certificate_id, certificate_type_id, certificate_picture_url,
    covid_test_picture_url, medical_info, diagnostic_status_id FROM patient`;
    return await dbUtils.queryObject<Patient>(query);
  },
  createPatient: async (patient: CreatePatientRequest) => {
    const query = //dbUtils.toQuery
      `SELECT patient_id, name, age, weight_kg, height_cm, certificate_id, certificate_type_id, certificate_picture_url, covid_test_picture_url, medical_info, diagnostic_status_id FROM patient`;
    const tryGetAll = await dbUtils.queryObject<Patient>(query);
    console.log("getAll:", tryGetAll)

    const patientIdSequenceName = "public.patient_patient_id_seq";
    
    const nextPatientId = `SELECT nextval('${patientIdSequenceName}')`;
    const patientId = await dbUtils.queryOneObject<{nextval:number}>(nextPatientId);
    
    console.log("#########################patientId:", patientId.nextval);
    const insertPatient =  `INSERT INTO public.patient(
      patient_id, name, age, weight_kg, height_cm, certificate_id, certificate_type_id, certificate_picture_url, covid_test_picture_url, 
      medical_info, diagnostic_status_id, last_modified_by, last_modified_when, created_by, created_when)
      VALUES (${patientId.nextval}, '${patient.patientName}', ${patient.age}, ${patient.weightKg}, ${patient.heightCm}, '${patient.certificateId}', ${patient.certificateTypeId}, 
        '${patient.certificatePictureUrl}', '${patient.covidTestPictureUrl}', '${JSON.stringify(patient.medicalInfo)}', ${1}, '${"med4all"}', '2016-06-22 19:10:25', '${"med4all"}', '2016-06-22 19:10:25')`;
    
        const insertAddress = `INSERT INTO public.address(
      patient_id, address, district, province, zip_code, last_modified_by, last_modified_when, created_by, created_when)
      VALUES (${patientId.nextval}, '${patient.address}', '${patient.district}', '${patient.province}', ${patient.zipCode},'${"med4all"}', '2016-06-22 19:10:25', '${"med4all"}', '2016-06-22 19:10:25')`;

    return await dbUtils.excuteTransactional([insertPatient, insertAddress]);
  },
};

export default PatientRepository;
