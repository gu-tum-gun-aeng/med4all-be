import {
  CertificateType,
  CreatePatientRequest,
} from "../../../patient/request/patient.request.ts";
import { PublishPatientRequest } from "../patient-api.request.model.ts";

export const mapPatientApiRequest = (
  createPatientRequest: CreatePatientRequest,
): PublishPatientRequest => {
  const certificate = {
    cdPersonID:
      createPatientRequest.certificateType === CertificateType.PersonalId
        ? createPatientRequest.certificateId
        : "",
    cdPersonForeignID:
      createPatientRequest.certificateType === CertificateType.ForeignId
        ? createPatientRequest.certificateId
        : "",
    cdPersonPassportID:
      createPatientRequest.certificateType === CertificateType.Passport
        ? createPatientRequest.certificateId
        : "",
  };

  return {
    ...certificate,
    cdPersonFirstName: createPatientRequest.name,
    cdPersonLastName: createPatientRequest.surname,
    cdPersonGenderCode: createPatientRequest.gender,
    cdPersonAge: createPatientRequest.ageYear,
    cdPersonPhone1: createPatientRequest.patientPhone,
    cdPersonCustodialPhone1: createPatientRequest.custodianPhone,
    cdPersonWeightMeasure: createPatientRequest.weightKg,
    cdPersonHeightMeasure: createPatientRequest.heightCm,
    emLaboratoryTestATK: createPatientRequest.medicalInfo.isAtkPositive,
    emLaboratoryTestRTPCR: createPatientRequest.medicalInfo.isRtPcrPositive,
    emLaboratoryTestDate: createPatientRequest.medicalInfo.labTestWhen,
    emPatientGotFavipiravir:
      createPatientRequest.medicalInfo.isFavipiravirReceived,
    emPatientGotFavipiravirDate:
      createPatientRequest.medicalInfo.receivedFavipiravirWhen,
    emPatientCommitStatusCode:
      createPatientRequest.medicalInfo.patientCovidClassificationColor,
    emPatientCommitTemperature:
      createPatientRequest.medicalInfo.bodyTemperatureCelcius,
    emPatientCommitPulse: createPatientRequest.medicalInfo.pulseRateBpm,
    emPatientCommitOxygenSaturation:
      createPatientRequest.medicalInfo.oxygenSaturation,
    emPatientCommitOxygenSaturationPost:
      createPatientRequest.medicalInfo.oxygenSaturationAfterExercise,
    emPatientCommitOxygenSaturationDiff:
      createPatientRequest.medicalInfo.oxygenSaturationDifference,
    emPatientCommitSystolic: createPatientRequest.medicalInfo.systolic,
    emPatientCommitDiastolic: createPatientRequest.medicalInfo.diastolic,
    emPatientCommitInspirationRate:
      createPatientRequest.medicalInfo.inspirationRate,
    emPatientPregnancyStatus: createPatientRequest.medicalInfo.isPregnant,
    emPatientPregnancyWeeks: createPatientRequest.medicalInfo.pregnancyWeeks,
    emPatientBedriddenStatus: createPatientRequest.medicalInfo.isBedridden,
    emPatientSymptomsText: createPatientRequest.medicalInfo.symptoms,
    emPatientAllergyDrug: createPatientRequest.medicalInfo.allergyToDrugs.join(
      ",",
    ),
    emPatientAllergyFood: createPatientRequest.medicalInfo.allergyToFoods.join(
      ",",
    ),
    emPatientSymptomsCL1:
      createPatientRequest.medicalInfo.isSymptomShortnessOfBreath,
    emPatientSymptomsCL2: createPatientRequest.medicalInfo.isSymptomFever,
    emPatientSymptomsCL3: createPatientRequest.medicalInfo.isSymptomCough,
    emPatientSymptomsCL4: createPatientRequest.medicalInfo.isSymptomRunnyNose,
    emPatientSymptomsCL5: createPatientRequest.medicalInfo.isSymptomSoreThroat,
    emPatientSymptomsCL6: createPatientRequest.medicalInfo.isSymptomFatigue,
    emPatientSymptomsCL7: createPatientRequest.medicalInfo.isSymptomHeadAche,
    emPatientSymptomsCL8: createPatientRequest.medicalInfo.isSymptomDiarrhea,
    emPatientSymptomsCL9: createPatientRequest.medicalInfo.isSymptomLossOfSmell,
    emPatientSymptomsCL10:
      createPatientRequest.medicalInfo.isSymptomConjunctivitis,
    emPatientSymptomsCL11: createPatientRequest.medicalInfo.isSymptomRash,
    emPatientSymptomsCL12:
      createPatientRequest.medicalInfo.isSymptomLossOfTaste,
    emPatientSymptomsCL13: createPatientRequest.medicalInfo.isSymptomTiredness,
    emPatientSymptomsCL14: createPatientRequest.medicalInfo.isSymptomChestPain,
    emPatientDiseaseCD1: createPatientRequest.medicalInfo.isDiseaseUncontrollDm,
    emPatientDiseaseCD2: createPatientRequest.medicalInfo.isDiseaseCancer,
    emPatientDiseaseCD3: createPatientRequest.medicalInfo.isDiseaseCopd,
    emPatientDiseaseCD4: createPatientRequest.medicalInfo.isDiseaseAsthma,
    emPatientDiseaseCD5: createPatientRequest.medicalInfo.isDiseaseObesity,
    emPatientDiseaseCD6:
      createPatientRequest.medicalInfo.isDiseaseCkdLevelHigherThanFour,
    emPatientDiseaseCD7:
      createPatientRequest.medicalInfo.isDiseaseStrokeWithinSixMonth,
    emPatientDiseaseCD8:
      createPatientRequest.medicalInfo.isDiseaseCardioVascularDisease,
    emPatientDiseaseCD9: createPatientRequest.medicalInfo.isDiseaseHiv,
    emPatientDiseaseCD10:
      createPatientRequest.medicalInfo.isDiseaseHypertension,
    emPatientDiseaseCD11:
      createPatientRequest.medicalInfo.isDiseaseHyperlipidemia,
    emPatientDiseaseCD12: createPatientRequest.medicalInfo.isDiseaseCirrhosis,
    emPatientDiseaseCD13:
      createPatientRequest.medicalInfo.isDiseaseTuberculosis,
    emPatientCheckInDate: createPatientRequest.checkInDate,
    emPatientCheckOutDate: createPatientRequest.checkOutDate,
    crProvinceCode: createPatientRequest.address.provinceCode.toString(),
    crAmpurCode: createPatientRequest.address.districtCode.toString(),
    crTumbolCode: createPatientRequest.address.subDistrictCode.toString(),
    crMooCode: createPatientRequest.address.moo,
    crRoad: createPatientRequest.address.road,
    crTrok: createPatientRequest.address.alley,
    crSoi: createPatientRequest.address.soi,
    crVillage: createPatientRequest.address.village,
    crZoneCode: createPatientRequest.address.bangkokZoneCode,
    crBuildingName: createPatientRequest.address.building,
    crAddressText: createPatientRequest.address.note,
    emSourceNumberCode: createPatientRequest.patientDataSource,
    emMoveToLocationCode: createPatientRequest.admittedTo,
    emMoveToLocationTypeCode: createPatientRequest.admittedTo,
    emMoveFromLocationCode: createPatientRequest.sourceLocation,
    emMoveFromLocationTypeCode: createPatientRequest.sourceLocation,
    hsPatientHealthCoverage: createPatientRequest.healthCoverage,
  };
};
