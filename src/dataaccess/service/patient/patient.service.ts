// import { Volunteer } from "../../models/volunteer/volunteer.model.ts";
// import config from "../../../config/config.ts";
// import { ky } from "../../../../deps.ts";
// import { RequestOtpResponse } from "../../../models/nexmo/response/request.response.model.ts";
// import { VerifyOtpResponse } from "../../../models/nexmo/response/verify.response.model.ts";
// import { throwError } from "../../../middlewares/errorHandler.middleware.ts";

import { CreatePatientRequest } from "../../../models/patient/request/patient.request.ts";

const PatientService = {
  // TODO: ESSENTIAL: #22 Implement this method to call `med4all-patient-api`
  // TODO: ESSENTIAL: #23 Log & Trace this method with traceWrapperAsync
  createPatient: (
    patient: CreatePatientRequest,
  ): Promise<boolean> => {
    // const url = ``;
    // const jsonBody = {};
    // const res = ky.post(url, {
    //   json: patient
    // });

    // return res.then((response) => {
    //   if (response.ok) {
    //     return;
    //   } else {
    //     throwError({
    //       status: 500,
    //       name: "images not found",
    //       path: "uploads",
    //       param: "",
    //       message: "images not found",
    //       type: "internal error",
    //     })
    //   }
    // })

    return Promise.resolve(true);
  },
};

export default PatientService;
