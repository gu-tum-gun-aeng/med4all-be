import PatientRouter from "./patient.router.ts";
import { Router, Status } from "../../deps.ts";

import type { RouterContext } from "../../deps.ts";

const router = new Router();

function useSubRouter(router: Router, subRouter: Router): Router {
  router.use(subRouter.routes());
  router.use(subRouter.allowedMethods());

  return router;
}

useSubRouter(router, PatientRouter);

const v1Router = new Router();

v1Router.get(
  "/healthz",
  ({ response }: RouterContext) => {
    response.status = Status.OK;
    response.body = "Ok";
  },
);
v1Router.use("/v1", router.routes());

export default v1Router;
