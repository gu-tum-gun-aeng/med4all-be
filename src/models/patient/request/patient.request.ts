export type CreatePatientRequest = {
  certificateId: string;
  certificateType: CertificateType;
  name: string;
  surname: string;
  gender: number;
  ageYear: number;
  patientPhone: string;
  custodianPhone: string;
  weightKg: number;
  heightCm: number;
  medicalInfo: MedicalInfo;
  checkInDate: Date;
  checkOutDate: Date;
  address: Address;
  patientDataSource: number;
  admittedTo: string;
  healthCoverage: number;
  lineId: string;
  homeTown: number;
  equipments: string[];
};

export type MedicalInfo = {
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
  vaccinationRecords: string[];
  firstVaccinedDate: Date;
  secondVaccinedDate: Date;
  remark: string;
  firstDateOfSymtom: Date;
};

export type Address = {
  provinceCode: number;
  districtCode: number;
  subDistrictCode: number;
  moo: string;
  road: string;
  alley: string;
  soi: string;
  village: string;
  bangkokZoneCode: number;
  zipCode: number;
  building: string;
  note: string;
};

export enum CertificateType {
  PersonalId = 0,
  Passport = 1,
  ForeignId = 2,
  NoDoc = 3,
}
