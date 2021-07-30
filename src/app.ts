import { Application, oakCors, Router } from "../deps.ts";
import { errorHandler } from "./middlewares/errorHandler.middleware.ts";
import { logMiddleware } from "./middlewares/logger.middlewares.ts";
import log from "./utils/logger.util.ts";
import configs from "./config/config.ts";
import router from "./routers/index.ts";

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

setupMiddleware(app);
setupRouter(app, router);
await setupListener(app, url, port);

export default app;
