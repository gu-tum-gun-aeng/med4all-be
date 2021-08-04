import { Patient } from "../../models/patient/patient.model.ts";
import dbUtils from "../../utils/db.util.ts";

const PatientRepository = {
  getAll: async () => {
    return await dbUtils.queryObject<Patient>`SELECT 
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
  createPatient: async (patient: CreatePatientRequest): Promise<number> => {
    let result = -1;
    const currentDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS");
    const patientId = await dbUtils.queryOneObject<{ value: BigInt }>`
      SELECT nextval('patient_patient_id_seq') as value
    `;
    if (patientId) {
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
          ${patientId.value},
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
          ${patientId.value}, 
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
      await dbUtils.excuteTransactional([
        insertPatient,
        insertAddress,
      ]);
      result = Number(patientId.value);
    } else {
      throwError({
        status: 500,
        name: "cannot get patientId",
        path: "patient",
        param: "",
        message: "cannot get patientId",
        type: "internal error",
      });
    }
    return result;
  },
};

export default PatientRepository;
