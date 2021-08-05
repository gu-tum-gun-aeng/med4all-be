export interface Patient {
  "patient_id": number;
  "name": string;
  "age": number;
  "weight_kg": number;
  "height_cm": number;
  "certificate_id": string;
  "certificate_type_id": number;
  "certificate_picture_url": string;
  "covid_test_picture_url": string;
  "medical_info": Json;
  "diagnostic_status_id": number;
}

type Json = Record<string, unknown>;

export enum DiagnosticStatus {
  Waiting = 0,
  Diagnosing = 1,
  Completed = 2,
}
