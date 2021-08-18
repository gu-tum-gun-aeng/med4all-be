import { Context } from "../../deps.ts";

const SwaggerController = {
  getSwaggerUi: ({ response }: Context) => {
    const swaggerFileUrl = encodeURIComponent("/v1/swagger.yaml");
    response.redirect(`https://generator.swagger.io/?url=${swaggerFileUrl}`);
  },
  getYamlSchema: async ({ response }: Context) => {
    const swaggerFile = await Deno.readTextFile("./api-swagger.yaml");
    response.headers.set("Content-Type", "application/x-yaml");
    response.body = swaggerFile;
  },
};

export default SwaggerController;
