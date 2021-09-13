export type CreatePatientRequest = {
  certificateId: string;
  certificateType: CertificateType;
  name: string;
  surname: string;
  gender?: number;
  ageYear?: number;
  patientPhone?: string;
  custodianPhone?: string;
  weightKg?: number;
  heightCm?: number;
  medicalInfo?: MedicalInfo;
  checkInWhen?: string;
  checkOutWhen?: string;
  address?: Address;
  patientDataSource?: number;
  sourceLocation?: string;
  admittedTo?: string;
  healthCoverage?: number;
  lineId?: string;
  homeTown?: number;
  equipments?: string[];
  nhsoTicketId?: string;
  trustedSource?: string;
  riskScore?: RiskScore;
  certificatePictureUrl?: string;
  covidTestPictureUrl?: string;
};

export type MedicalInfo = {
  patientCovidClassificationColor?: number;
  isAtkPositive?: boolean;
  isRtPcrPositive?: boolean;
  labTestWhen?: string;
  isFavipiravirReceived?: boolean;
  receivedFavipiravirWhen?: string;
  bodyTemperatureCelsius?: number;
  pulseRateBpm?: number;
  oxygenSaturation?: number;
  oxygenSaturationAfterExercise?: number;
  oxygenSaturationDifference?: number;
  systolic?: number;
  diastolic?: number;
  inspirationRate?: number;
  isPregnant?: boolean;
  pregnancyWeeks?: number;
  isBedridden?: boolean;
  symptoms?: string;
  allergyToDrugs?: string[];
  allergyToFoods?: string[];
  isSymptomShortnessOfBreath?: boolean;
  isSymptomFever?: boolean;
  isSymptomCough?: boolean;
  isSymptomRunnyNose?: boolean;
  isSymptomSoreThroat?: boolean;
  isSymptomFatigue?: boolean;
  isSymptomHeadAche?: boolean;
  isSymptomDiarrhea?: boolean;
  isSymptomLossOfSmell?: boolean;
  isSymptomConjunctivitis?: boolean;
  isSymptomRash?: boolean;
  isSymptomLossOfTaste?: boolean;
  isSymptomTiredness?: boolean;
  isSymptomChestPain?: boolean;
  isSymptomPoorAppetite?: boolean;
  isSymptomGi?: boolean;
  isDiseaseUncontrolledDm?: boolean;
  isDiseaseCancer?: boolean;
  isDiseaseCopd?: boolean;
  isDiseaseAsthma?: boolean;
  isDiseaseObesity?: boolean;
  isDiseaseCkdLevelHigherThanFour?: boolean;
  isDiseaseStrokeWithinSixMonth?: boolean;
  isDiseaseCardioVascularDisease?: boolean;
  isDiseaseHiv?: boolean;
  isDiseaseHypertension?: boolean;
  isDiseaseHyperlipidemia?: boolean;
  isDiseaseCirrhosis?: boolean;
  isDiseaseTuberculosis?: boolean;
  isDiseaseEsrd?: boolean;
  vaccinationRecords?: string[];
  firstVaccinatedWhen?: string;
  secondVaccinatedWhen?: string;
  remark?: string;
  firstSymptomWhen?: string;
  isMedicineRequested?: boolean;
  isBypassScreening?: boolean;
  isBedRequested?: boolean;
  isOxygenRequested?: boolean;
};

export type RiskScore = {
  inclusionLabel?: string;
  inclusionLabelType?: string;
  triageScore?: number;
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
  PersonalId = 1,
  Passport = 2,
  ForeignId = 3,
  NoDoc = 4,
}
