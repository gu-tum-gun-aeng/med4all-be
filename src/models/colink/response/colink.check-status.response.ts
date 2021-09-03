export type ColinkCheckStatusResponse = {
  found: boolean;
  // deno-lint-ignore camelcase
  record_details?: RecordDetailColinkCheckStatusResponse;
};

export type RecordDetailColinkCheckStatusResponse = {
  passport: string;
  cid: string;
  firstname: string;
  lastname: string;
  status: string;
  // deno-lint-ignore camelcase
  contact_number: string;
  // deno-lint-ignore camelcase
  hospital_admitted: string;
  // deno-lint-ignore camelcase
  hospital_admitted_datetime: string;
};

export type ColinkCheckStatusCamelCaseResponse = {
  found: boolean;
  recordDetails?: RecordDetailColinkCheckStatusCamelCaseResponse;
};

type RecordDetailColinkCheckStatusCamelCaseResponse = {
  passport: string;
  cid: string;
  firstname: string;
  lastname: string;
  status: string;
  contactNumber: string;
  hospitalAdmitted: string;
  hospitalAdmittedDatetime: string;
};

export const fromColinkCheckStatusResponse = (
  res: ColinkCheckStatusResponse,
): ColinkCheckStatusCamelCaseResponse => {
  if (res.record_details === undefined) {
    return {
      found: res.found,
      recordDetails: undefined,
    };
  } else {
    return {
      found: res.found,
      recordDetails: fromColinkCheckStatusDetailResponse(res.record_details!),
    };
  }
};

const fromColinkCheckStatusDetailResponse = (
  res: RecordDetailColinkCheckStatusResponse,
): RecordDetailColinkCheckStatusCamelCaseResponse => {
  return {
    passport: res.passport,
    cid: res.cid,
    firstname: res.firstname,
    lastname: res.lastname,
    status: res.status,
    contactNumber: res.contact_number,
    hospitalAdmitted: res.hospital_admitted,
    hospitalAdmittedDatetime: res.hospital_admitted_datetime,
  };
};
