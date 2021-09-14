import {
  Address,
  CreatePatientRequest,
  MedicalInfo,
} from "../../../src/models/patient/request/patient.request.ts";

const medicalInfo: MedicalInfo = {
  patientCovidClassificationColor: 1,
  isAtkPositive: true,
  isRtPcrPositive: true,
  labTestWhen: "2021-08-17T08:41:48.912Z",
  isFavipiravirReceived: true,
  receivedFavipiravirWhen: "2021-08-17T08:41:48.912Z",
  bodyTemperatureCelsius: 27,
  pulseRateBpm: 80,
  oxygenSaturation: 99,
  oxygenSaturationAfterExercise: 99,
  oxygenSaturationDifference: 99,
  systolic: 99,
  diastolic: 99,
  inspirationRate: 99,
  isPregnant: false,
  pregnancyWeeks: 0,
  isBedridden: true,
  symptoms: "hello",
  allergyToDrugs: ["aaa", "bbbb"],
  allergyToFoods: ["aaa", "bbbb"],
  isSymptomShortnessOfBreath: true,
  isSymptomFever: true,
  isSymptomCough: true,
  isSymptomRunnyNose: true,
  isSymptomSoreThroat: true,
  isSymptomFatigue: true,
  isSymptomHeadAche: true,
  isSymptomDiarrhea: true,
  isSymptomLossOfSmell: true,
  isSymptomConjunctivitis: true,
  isSymptomRash: true,
  isSymptomLossOfTaste: true,
  isSymptomTiredness: true,
  isSymptomChestPain: true,
  isDiseaseUncontrolledDm: true,
  isDiseaseCancer: true,
  isDiseaseCopd: true,
  isDiseaseAsthma: true,
  isDiseaseObesity: true,
  isDiseaseCkdLevelHigherThanFour: true,
  isDiseaseStrokeWithinSixMonth: true,
  isDiseaseCardioVascularDisease: true,
  isDiseaseHiv: true,
  isDiseaseHypertension: true,
  isDiseaseHyperlipidemia: true,
  isDiseaseCirrhosis: true,
  isDiseaseTuberculosis: true,
  vaccinationRecords: ["aaa", "bbbb"],
  firstVaccinatedWhen: "2021-08-17T08:41:48.912Z",
  secondVaccinatedWhen: "2021-08-17T08:41:48.912Z",
  remark: "Hi",
  firstSymptomWhen: "2021-08-17T08:41:48.912Z",
};

const address: Address = {
  province: "someProvince",
  district: "someDistrict",
  subDistrict: "someSubDistrict",
  moo: "4",
  road: "bangwak",
  alley: "sss",
  soi: "bangwak 2",
  village: "my Village",
  bangkokZone: "someBangkokZone",
  zipCode: 10867,
  building: "",
  note: "",
};

export const patientRequestMock: CreatePatientRequest = {
  certificateId: "1123123124355",
  certificateType: 1,
  name: "Krittipong",
  surname: "Kanc",
  gender: 1,
  ageYear: 26,
  patientPhone: "08762845932",
  custodianPhone: "0876284532",
  weightKg: 70,
  heightCm: 175,
  medicalInfo: medicalInfo,
  checkInWhen: "2021-08-17T08:41:48.912Z",
  checkOutWhen: "2021-08-17T08:41:48.912Z",
  address: address,
  patientDataSource: 1,
  sourceLocation: "home",
  admittedTo: "Chula",
  healthCoverage: 1,
  lineId: "myline",
  homeTown: 1,
};

export const getPatientIdMock = async () => await { value: BigInt(10) };
