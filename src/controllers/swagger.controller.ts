import { Context } from "../../deps.ts";

const SwaggerController = {
  getYamlSchema: async ({ response }: Context) => {
    const swaggerFile = await Deno.readTextFile("./api-swagger.yaml");
    response.headers.set("Content-Type", "application/x-yaml");
    response.body = swaggerFile;
  },
};

export default SwaggerController;
