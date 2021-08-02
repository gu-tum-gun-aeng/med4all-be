export interface Patient {
  name: string;
  age: number;
  addressToSendMedicine: Address;
  personalId: string;
  medicalInfo: MedicalInfo;

  // deno-lint-ignore no-explicit-any
  personalIdPicture: any;

  // deno-lint-ignore no-explicit-any
  rapidTestPicture: any;
}

export interface Address {
  address: string;
  district: string;
  province: string;
  zipCode: number;
}

export interface MedicalInfo {
  weightKg: number;
  heightCm: number;
  allegicMedicines: string[];
}
