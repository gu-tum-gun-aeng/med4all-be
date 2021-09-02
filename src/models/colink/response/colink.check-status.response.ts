export type ColinkCheckStatusResponse = {
  found: boolean;
  record_details?: RecordDetailColinkCheckStatusResponse;
};

export type RecordDetailColinkCheckStatusResponse = {
  passport: string;
  cid: string;
  firstname: string;
  lastname: string;
  status: string;
  hospital_admitted: string;
  hospital_admitted_datetime: string;
};
