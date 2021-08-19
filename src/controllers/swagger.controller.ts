import { Context } from "../../deps.ts";

const SwaggerController = {
  getSwaggerUi: ({ request, response }: Context) => {
    // Todo: find a better way to change redirect url protocol from http to https
    // This is a quick fix since we need the document for others to use
    const originUrl = request.url.origin;
    const urlToRedirect = originUrl.replace(/^http/i, "https");

    const swaggerFileUrl = encodeURIComponent(
      `${urlToRedirect}/swagger.yaml`,
    );
    response.redirect(`https://generator.swagger.io/?url=${swaggerFileUrl}`);
  },
  getYamlSchema: async ({ response }: Context) => {
    const swaggerFile = await Deno.readTextFile("./api-swagger.yaml");
    response.headers.set("Content-Type", "application/x-yaml");
    response.body = swaggerFile;
  },
};

export default SwaggerController;
