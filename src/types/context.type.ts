import { RouteParams } from "https://deno.land/x/oak@v7.6.3/router.ts";
import { Context as RouterContext, State } from "../../deps.ts";

export default interface Context extends RouterContext<RouteParams, State> {
  userId?: string;
}
