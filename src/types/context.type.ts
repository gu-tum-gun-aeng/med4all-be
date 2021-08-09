import { Context as OakContext } from "../../deps.ts";

export default interface Context extends OakContext {
  userId?: string;
}
