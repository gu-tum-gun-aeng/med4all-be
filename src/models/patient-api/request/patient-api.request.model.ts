export type CreatePatientRequest = {
  id: number;
  cdPersonID?: string;
  cdPersonForeignID?: string;
  cdPersonPassportID?: string;
  cdPersonNationalityCode?: number;
  cdPersonNameTitleCode?: number;
  cdPersonFirstName: string;
  cdPersonMiddleName?: string;
  cdPersonLastName: string;
  cdPersonGenderCode?: number;
  cdPersonAge: number;
  cdPersonBirthDate?: string;
  cdPersonPhone1: string;
  cdPersonPhone2?: string;
  cdPersonCustodialPhone1?: string;
  cdPersonCustodialPhone2?: string;
  cdPersonWeightMeasure?: number;
  cdPersonHeightMeasure?: number;
  cdPersonBMIMeasure?: string;
  emLaboratoryTestATK?: boolean;
  emLaboratoryTestRTPCR?: boolean;
  emLaboratoryTestDate?: Date;
  emPatientGotFavipiravir?: boolean;
  emPatientGotFavipiravirDate?: Date;
  emPatientCommitStatusCode: number;
  emPatientCommitTemperature?: number;
  emPatientCommitPulse?: number;
  emPatientCommitOxygenSaturation?: number;
  emPatientCommitOxygenSaturationPost?: number;
  emPatientCommitOxygenSaturationDiff?: number;
  emPatientCommitSystolic?: number;
  emPatientCommitDiastolic?: number;
  emPatientCommitInspirationRate?: number;
  emPatientPregnancyStatus?: boolean;
  emPatientPregnancyWeeks?: number;
  emPatientBedriddenStatus?: boolean;
  emPatientSymptomsText?: string;
  emPatientAllergyDrug?: string;
  emPatientAllergyFood?: string;
  emPatientFoodText?: string;
  emPatientSymptomsCL1?: boolean;
  emPatientSymptomsCL2?: boolean;
  emPatientSymptomsCL3?: boolean;
  emPatientSymptomsCL4?: boolean;
  emPatientSymptomsCL5?: boolean;
  emPatientSymptomsCL6?: boolean;
  emPatientSymptomsCL7?: boolean;
  emPatientSymptomsCL8?: boolean;
  emPatientSymptomsCL9?: boolean;
  emPatientSymptomsCL10?: boolean;
  emPatientSymptomsCL11?: boolean;
  emPatientSymptomsCL12?: boolean;
  emPatientSymptomsCL13?: boolean;
  emPatientSymptomsCL14?: boolean;
  emPatientDiseaseCD1?: boolean;
  emPatientDiseaseCD2?: boolean;
  emPatientDiseaseCD3?: boolean;
  emPatientDiseaseCD4?: boolean;
  emPatientDiseaseCD5?: boolean;
  emPatientDiseaseCD6?: boolean;
  emPatientDiseaseCD7?: boolean;
  emPatientDiseaseCD8?: boolean;
  emPatientDiseaseCD9?: boolean;
  emPatientDiseaseCD10?: boolean;
  emPatientDiseaseCD11?: boolean;
  emPatientDiseaseCD12?: boolean;
  emPatientDiseaseCD13?: boolean;
  emHICICode?: number;
  emHICITypeCode?: number;
  cdMedicalDoctorCode?: string;
  emPatientCheckInDate?: Date;
  emPatientCheckOutDate?: Date;
  crProvinceCode: string;
  crAmpurCode: string;
  crTumbolCode?: string;
  crMooCode?: string;
  crRoad?: string;
  crTrok?: string;
  crSoi?: string;
  crVillage?: string;
  crZoneCode?: number;
  crBuildingName?: string;
  crAddressText?: string;
  crGeographicCoordinateLatitude?: string;
  crGeographicCoordinateLongitude?: string;
  emPatientCommitDate?: Date;
  emPatientMovementDate?: Date;
  emPatientWaitingHours?: number;
  emSourceNumberCode?: number;
  emMoveToLocationCode?: string;
  emMoveToLocationTypeCode?: number;
  emMoveFromLocationCode?: string;
  emMoveFromLocationTypeCode?: number;
  emMoveToMethodCode?: number;
  cdOrganizationMedicalUnit?: number;
  hsPatientHospitalNumber?: string;
  hsPatientAdmissionNumber?: string;
  hsPatientHealthCoverage?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};