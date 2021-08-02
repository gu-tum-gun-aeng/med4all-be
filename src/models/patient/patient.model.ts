export interface Patient {
  name: string;
  age: number;
  addressToSendMedicine: Address;
  personalId: string;
  medicalInfo: MedicalInfo;
  personalIdPicture: any;
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
