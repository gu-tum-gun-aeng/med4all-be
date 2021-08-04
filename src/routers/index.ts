import { Router, RouterContext, Status } from "oak/mod.ts";

import PatientRouter from "src/routers/v1/patient.router.ts";

const useSubRouter = (router: Router, subRouter: Router): Router => {
  router.use(subRouter.routes());
  router.use(subRouter.allowedMethods());

  return router;
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
  const patientRouter = useSubRouter(new Router(), PatientRouter);

  router.use("/v1", patientRouter.routes());
};

const router = new Router();

setRootRouting(router);
setV1Routing(router);

export default router;
