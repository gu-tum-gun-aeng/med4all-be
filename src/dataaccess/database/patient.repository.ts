import { CreatePatientRequest } from "../../models/patient/request/patient.request.ts";
import dbUtils from "../../utils/db.util.ts";
import { throwError } from "../../middlewares/errorHandler.middleware.ts";
import { PatientRegisterStatus } from "../../models/patient/response/patientRegisterStatus.response.ts";
import log from "../../utils/logger.util.ts";

const PatientRepository = {
  getPatientRegisterStatus: async (
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

  createPatient: async (
    patient: CreatePatientRequest,
    createdByUserId: string,
  ): Promise<number> => {
    let result = -1;
    const currentDateTime = (new Date()).toISOString();

    log.debug("will fetch patientId from db", "createPatient");

    const patientId = await dbUtils.queryOneObject<{ value: BigInt }>`
      SELECT nextval('patient_patient_id_seq') as value
    `;

    log.debug(`patientId: ${patientId}`, "createPatient");

    if (patientId) {
      const equipments = patient.equipments ? patient.equipments.join(",") : "";

      const insertPatientSQL = dbUtils.toQuery`
      INSERT INTO patient (
        patient_id,
        certificate_id, 
        certificate_type, 
        name, 
        surname, 
        gender, 
        age_year, 
        patient_phone,
        custodian_phone,
        weight_kg, 
        height_cm, 
        medical_info, 
        check_in_date, 
        check_out_date,
        patient_data_source, 
        source_location,
        admitted_to, 
        health_coverage, 
        line_id, 
        home_town, 
        equipments,
        certificate_picture_url,
        covid_test_picture_url,
        volunteer_id,
        last_modified_by, 
        last_modified_when, 
        created_by, 
        created_when
      )
      VALUES (
        ${patientId.value},
        ${patient.certificateId}, 
        ${patient.certificateType}, 
        ${patient.name}, 
        ${patient.surname}, 
        ${patient.gender}, 
        ${patient.ageYear}, 
        ${patient.patientPhone},
        ${patient.custodianPhone},
        ${patient.weightKg}, 
        ${patient.heightCm}, 
        ${patient.medicalInfo}, 
        ${patient.checkInWhen}, 
        ${patient.checkOutWhen},
        ${patient.patientDataSource}, 
        ${patient.sourceLocation}, 
        ${patient.admittedTo}, 
        ${patient.healthCoverage}, 
        ${patient.lineId}, 
        ${patient.homeTown}, 
        ${equipments}, 
        ${patient.certificatePictureUrl}, 
        ${patient.covidTestPictureUrl}, 
        ${createdByUserId},
        ${createdByUserId}, 
        ${currentDateTime}, 
        ${createdByUserId}, 
        ${currentDateTime}
      );
    `;
      const insertAddressSQL = dbUtils.toQuery`
      INSERT INTO address (
        patient_id,
        address_detail,
        province, 
        district, 
        sub_district,
        moo, 
        road, 
        alley, 
        soi,
        village, 
        bangkok_zone, 
        zip_code, 
        building, 
        note, 
        last_modified_by, 
        last_modified_when,
        created_by, 
        created_when
      )
      VALUES (
        ${patientId.value},
        ${patient.address?.addressDetail}
        ${patient.address?.province}, 
        ${patient.address?.district}, 
        ${patient.address?.subDistrict}, 
        ${patient.address?.moo}, 
        ${patient.address?.road}, 
        ${patient.address?.alley}, 
        ${patient.address?.soi}, 
        ${patient.address?.village}, 
        ${patient.address?.bangkokZone}, 
        ${patient.address?.zipCode}, 
        ${patient.address?.building}, 
        ${patient.address?.note}, 
        ${createdByUserId}, 
        ${currentDateTime}, 
        ${createdByUserId}, 
        ${currentDateTime}
      );
    `;

      log.debug(
        `will run transaction with patientId=${patientId}`,
        "createPatient",
      );

      await dbUtils.executeTransactional([
        insertPatientSQL,
        insertAddressSQL,
      ]);
      result = Number(patientId.value);

      log.debug(`get result patientId number=${result}`, "createPatient");
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
