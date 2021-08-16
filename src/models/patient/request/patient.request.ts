import {
  isNumber,
  maxNumber,
  minLength,
  minNumber,
  required,
  startsWith,
  ValidationRules,
} from "../../../../deps.ts";

export type CreatePatientRequest = {
  certificateId: string;
  certificateType: ENUM;
  name: string;
  surname: string;
  gender: ENUM;
  ageYear: number;
  patientPhone: string;
  custodianPhone: string;
  weightKg: number;
  heightCm: number;
  isAtkPositive: boolean;
  isRtPcrPositive: boolean;
  labTestWhen: Date;
  isFavipiravirReceived: boolean;
  receivedFavipiravirWhen: Date;
  bodyTemperatureCelcius: number;
  pulseRateBpm: number;
  oxygenSaturation: number;
  oxygenSaturationAfterExercise: number;
  oxygenSaturationDifference: number;
  systolic: number;
  diastolic: number;
  inspirationRate: number;
  isPregnant: boolean;
  pregnancyWeeks: number;
  isBedridden: boolean;
  symptoms: string;
  allergyToDrugs: string[];
  allergyToFoods: string[];
  isSymptomShortnessOfBreath: boolean;
  isSymptomFever: boolean;
  isSymptomCough: boolean;
  isSymptomRunnyNose: boolean;
  isSymptomSoreThroat: boolean;
  isSymptomFatigue: boolean;
  isSymptomHeadAche: boolean;
  isSymptomDiarrhea: boolean;
  isSymptomLossOfSmell: boolean;
  isSymptomConjunctivitis: boolean;
  isSymptomRash: boolean;
  isSymptomLossOfTaste: boolean;
  isSymptomTiredness: boolean;
  isSymptomChestPain: boolean;
  isDiseaseUncontrollDm: boolean;
  isDiseaseCancer: boolean;
  isDiseaseCopd: boolean;
  isDiseaseAsthma: boolean;
  isDiseaseObesity: boolean;
  isDiseaseCkdLevelHigherThanFour: boolean;
  isDiseaseStrokeWithinSixMonth: boolean;
  isDiseaseCardioVascularDisease: boolean;
  isDiseaseHiv: boolean;
  isDiseaseHypertension: boolean;
  isDiseaseHyperlipidemia: boolean;
  isDiseaseCirrhosis: boolean;
  isDiseaseTuberculosis: boolean;
  checkInDate: Date;
  checkOutDate: Date;
  addressProvince: string;
  addressDistrict: string;
  addressSubDistrict: string;
  addressMoo: string;
  addressRoad: string;
  addressAlley: string;
  addressSoi: string;
  addressVillage: string;
  addressBangkokZone: string;
  addressBuilding: string;
  addressNote: string;
  patientDataSource: ENUM;
  admittedTo: ENUM;
  healthCoverage: ENUM;
  lineId: string;
  homeTown: ENUM;
  equipments: ENUM[];
  vaccinationRecords: ENUM[];
  firstVaccinedDate: Date;
  secondVaccinedDate: Date;
  remark: string;
  firstDateOfSymtom: Date;
  createdDate: Date;
}


export const CreatePatientRequestValidationSchema: ValidationRules = {
  patientName: [required, minLength(1)],
  age: [required, isNumber, minNumber(15)],
  weightKg: [required, isNumber],
  heightCm: [required, isNumber],
  certificateId: [required, minLength(1)],
  certificateTypeId: [required, isNumber],
  certificatePictureUrl: [required, startsWith("http"), minLength(1)],
  covidTestPictureUrl: [required, startsWith("http"), minLength(1)],
  address: [required, minLength(1)],
  district: [required, minLength(1)],
  province: [required, minLength(1)],
  zipCode: [required, maxNumber(99999)],
};
