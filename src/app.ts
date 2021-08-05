import { Application, oakCors, Router } from "../deps.ts";
import { errorHandler } from "./middlewares/errorHandler.middleware.ts";
import { logMiddleware } from "./middlewares/logger.middlewares.ts";
import log from "./utils/logger.util.ts";
import configs from "./config/config.ts";
import router from "./routers/index.ts";
import dbUtils from "./utils/db.util.ts";

const app: Application = new Application();
await start(app);

async function start(app: Application) {
  const { url, port, logAppName } = configs;

  setupMiddleware(app);
  setupRouter(app, router);
  setUpDatabaseConnection(configs.env);
  await setupListener(app, url, port, logAppName);
}

function setupMiddleware(app: Application) {
  app.use(oakCors());
  app.use(logMiddleware);
  app.use(errorHandler);
}

function setupRouter(app: Application, router: Router) {
  app.use(router.routes());
  app.use(router.allowedMethods());
}

function setUpDatabaseConnection(env: string) {
  if (env != "test") {
    dbUtils.initialize();
  }
}

async function setupListener(
  app: Application,
  url: string,
  port: number,
  logAppName: string,
) {
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
}

export default app;
