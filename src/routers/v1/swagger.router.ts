import { Router } from "../../../deps.ts";
import SwaggerController from "../../controllers/swagger.controller.ts";

const router = new Router();

router.get("/swagger.yaml", SwaggerController.getYamlSchema);

export default router;
