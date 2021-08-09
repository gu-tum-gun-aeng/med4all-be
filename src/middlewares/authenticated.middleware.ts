import { Context, State } from "../../deps.ts";
import * as tokenUtil from "../utils/token/token.util.ts"
import config from "../config/config.ts"

export const authenticated = async (
  // deno-lint-ignore no-explicit-any
  ctx: Context<State, Record<string, any>>,
  next: () => Promise<unknown>,
): Promise<void> => {
  const request =  ctx.request
  const authHeader = request.headers.get("Authorization")

  console.log("HEADER", authHeader)

  const token = authHeader

  console.log("TOKEN", token)

  if (token) {
    try {
      const payload = await tokenUtil.verify(token, config.jwt.key, tokenUtil.HashAlgorithm.HS512)
      await next()
    } catch {
      throw new Error("Invalid token")
    }
  } else {
    throw new Error("Unauthorized")
  }
}