import {oakCors} from "cors/mod.ts";
import {Application, Router} from "oak/mod.ts";

import {errorHandler} from "src/middlewares/errorHandler.middleware.ts";
import {logMiddleware} from "src/middlewares/logger.middlewares.ts";
import configs from "src/config/config.ts";
import router from "src/routers/index.ts";
import dbUtils from "src/utils/db.util.ts";
import log from "/src/utils/logger.util.ts";

const app: Application = new Application();
const { url, port, logAppName } = configs;

const setupMiddleware = (app: Application) => {
  app.use(oakCors());
  app.use(logMiddleware);
  app.use(errorHandler);
};

const setupRouter = (app: Application, router: Router) => {
  app.use(router.routes());
  app.use(router.allowedMethods());
};

const setupListener = async (app: Application, url: string, port: number) => {
  app.addEventListener("listen", () => {
    // FIXME: Change back to log.info
    console.log(
      `Server listening at ${url}`,
      `${logAppName}::server_listening`,
    );
  });

  if (import.meta.main) {
    log.info(`start server`, `${logAppName}::start_server`);
    await app.listen({ port });
  }
};

const setUpDatabaseConnection = (env: string) => {
  if (env != "test") {
    dbUtils.initialize();
  }
};

setupMiddleware(app);
setupRouter(app, router);
await setupListener(app, url, port);
setUpDatabaseConnection(configs.env);

export default app;
