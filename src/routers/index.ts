import PatientRouter from "./v1/patient.router.ts";
import VolunteerRouter from "./v1/volunteer.router.ts";
import SwaggerRouter from "./v1/swagger.router.ts";
import { Router, Status } from "../../deps.ts";

import type { RouterContext } from "../../deps.ts";

const useSubRouter = (router: Router, subRouter: Router): Router => {
  return router
    .use(subRouter.routes())
    .use(subRouter.allowedMethods());
};

const setRootRouting = (router: Router) => {
  router.get(
    "/healthz",
    ({ response }: RouterContext) => {
      response.status = Status.OK;
      response.body = "Ok";
    },
  );
};

const setV1Routing = (router: Router) => {
  const subRouters = [
    PatientRouter,
    VolunteerRouter,
    SwaggerRouter,
  ];

  const allRouter = subRouters.reduce(useSubRouter, new Router());

  router.use("/v1", allRouter.routes());
};

const router = new Router();

setRootRouting(router);
setV1Routing(router);

export default router;
