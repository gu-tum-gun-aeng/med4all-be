import { format } from "../../../deps.ts";
import { DiagnosticStatus, Patient } from "../../models/patient/patient.model.ts";
import { CreatePatientRequest } from "../../models/request/patient.request.ts";
import dbUtils from "../../utils/db.util.ts";
import config from "../../config/config.ts";

const PatientRepository = {
  getAll: async () => {
    return await dbUtils.queryObject<Patient>
      `SELECT 
        patient_id, 
        name, 
        age, 
        weight_kg, 
        height_cm, 
        certificate_id, 
        certificate_type_id, 
        certificate_picture_url,
        covid_test_picture_url, 
        medical_info, 
        diagnostic_status_id 
      FROM 
        patient
    `;
  },
  createPatient: async (patient: CreatePatientRequest) => {
    const currentDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS");
    const patientId = await dbUtils.queryOneObject<{ nextval: number }>`
      SELECT nextval('patient_patient_id_seq')
    `;
    const insertPatient = dbUtils.toQuery`
      INSERT INTO public.patient(
        patient_id,
        name, 
        age,
        weight_kg,
        height_cm,
        certificate_id,
        certificate_type_id,
        certificate_picture_url,
        covid_test_picture_url, 
        medical_info,
        diagnostic_status_id,
        last_modified_by,
        last_modified_when,
        created_by,
        created_when)
        VALUES (
          ${patientId.nextval},
          ${patient.patientName},
          ${patient.age},
          ${patient.weightKg},
          ${patient.heightCm},
          ${patient.certificateId}, 
          ${patient.certificateTypeId},
          ${patient.certificatePictureUrl},
          ${patient.covidTestPictureUrl},
          ${patient.medicalInfo},
          ${DiagnosticStatus.Waiting},
          ${config.appName},
          ${currentDateTime},
          ${config.appName},
          ${currentDateTime})
    `;
    const insertAddress = dbUtils.toQuery`
      INSERT INTO public.address(
        patient_id, 
        address, 
        district, 
        province, 
        zip_code, 
        last_modified_by, 
        last_modified_when, 
        created_by, 
        created_when)
        VALUES (
          ${patientId.nextval}, 
          ${patient.address}, 
          ${patient.district}, 
          ${patient.province}, 
          ${patient.zipCode}, 
          ${config.appName}, 
          ${currentDateTime}, 
          ${config.appName}, 
          ${currentDateTime}
          )
    `;
    const result = await dbUtils.excuteTransactional([
      insertPatient,
      insertAddress,
    ]);
    return;
  },
};

export default PatientRepository;
