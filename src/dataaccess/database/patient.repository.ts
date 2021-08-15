import {
  DiagnosticStatus,
  Patient,
} from "../../models/patient/patient.model.ts";
import { CreatePatientRequest } from "../../models/patient/request/patient.request.ts";
import dbUtils from "../../utils/db.util.ts";
import { throwError } from "../../middlewares/errorHandler.middleware.ts";
import { CreatePatientResultRequest } from "../../models/patient/request/patientResult.request.ts";
import { PatientRegisterStatus } from "../../models/patient/response/patientRegisterStatus.response.ts";

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

  getPatienRegisterStatus: async (
    certificateId: string,
  ): Promise<PatientRegisterStatus> => {
    const userInfo = await dbUtils.queryOneObject<PatientRegisterStatus>`
    SELECT true AS is_registered, v.name AS volunteer_name, vt.volunteer_team_name AS volunteer_team, p.created_when AS created_when
    FROM patient p
    LEFT JOIN volunteer v on p.volunteer_id = v.volunteer_id
    LEFT JOIN volunteer_team vt on v.volunteer_team_id = vt.volunteer_team_id
    WHERE certificate_id=${certificateId}
    `;
    if (userInfo) {
      return userInfo;
    } else {
      return { "is_registered": false };
    }
  },

  getFirstWaitingPatient: async () => {
    const patientDiagnosingTimeout = 8; //Hours
    return await dbUtils.queryOneObject<Patient>`
      UPDATE patient
      SET    diagnostic_status_id = ${DiagnosticStatus.Diagnosing},
      last_modified_when = current_timestamp
      WHERE  patient_id = (
              SELECT patient_id
              FROM   patient
              WHERE  diagnostic_status_id = ${DiagnosticStatus.Waiting} OR (
                diagnostic_status_id = ${DiagnosticStatus.Diagnosing} AND
                  DATE_PART('day', current_timestamp - last_modified_when) * 24 + 
                  DATE_PART('hour', current_timestamp - last_modified_when) >= ${patientDiagnosingTimeout}
              )
              ORDER BY last_modified_when ASC
              LIMIT  1
              FOR UPDATE SKIP LOCKED
      )
      RETURNING  patient_id, 
      name, 
      age, 
      weight_kg, 
      height_cm, 
      certificate_id, 
      certificate_type_id, 
      certificate_picture_url,
      covid_test_picture_url, 
      medical_info, 
      diagnostic_status_id;
    `; // We use 'FOR UPDATE SKIP LOCKED' to prevent race condition.
  },

  createPatient: async (
    patient: CreatePatientRequest,
    createdByUserId: string,
  ): Promise<number> => {
    let result = -1;
    const currentDateTime = (new Date()).toISOString();
    const patientId = await dbUtils.queryOneObject<{ value: BigInt }>`
      SELECT nextval('patient_patient_id_seq') as value
    `;
    if (patientId) {
      const insertPatientSQL = dbUtils.toQuery`
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
        volunteer_id,
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
          ${createdByUserId},
          ${createdByUserId},
          ${currentDateTime},
          ${createdByUserId},
          ${currentDateTime})
    `;
      const insertAddressSQL = dbUtils.toQuery`
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
          ${createdByUserId}, 
          ${currentDateTime}, 
          ${createdByUserId}, 
          ${currentDateTime}
          )
    `;
      await dbUtils.excuteTransactional([
        insertPatientSQL,
        insertAddressSQL,
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

  createPatientResultAndUpdatePaientDiagnosticStatus: async (
    patientResult: CreatePatientResultRequest,
    createdByUserId: string,
  ): Promise<void> => {
    const currentDateTime = (new Date()).toISOString();
    const insertPatientResultSQL = dbUtils.toQuery`
    INSERT INTO 
      patient_result (
        patient_id, 
        doctor_id, 
        is_approved, 
        reject_reason_id, 
        remark, 
        last_modified_by, 
        last_modified_when, 
        created_by, 
        created_when
      )
    VALUES (
      ${patientResult.patientId},
      ${patientResult.volunteerId},
      ${patientResult.isApproved},
      ${patientResult.rejectReasonId},
      ${patientResult.remark},
      ${createdByUserId},
      ${currentDateTime},
      ${createdByUserId},
      ${currentDateTime}
    );
    `;

    const updatePatientDiagnosticStatusSQL = dbUtils.toQuery`
      UPDATE patient
      SET 
        diagnostic_status_id = ${DiagnosticStatus.Completed},
        last_modified_by = ${createdByUserId},
        last_modified_when = ${currentDateTime}
      WHERE patient_id = ${patientResult.patientId};
    `;

    await dbUtils.excuteTransactional([
      insertPatientResultSQL,
      updatePatientDiagnosticStatusSQL,
    ]);
    return;
  },
};

export default PatientRepository;
