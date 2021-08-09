import Context from "../types/context.type.ts"
import * as tokenUtil from "../utils/token/token.util.ts"
import config from "../config/config.ts"

export const authenticated = async (
  ctx: Context,
  next: () => Promise<unknown>,
): Promise<void> => {
  const request =  ctx.request
  const authHeader = request.headers.get("Authorization")
  const token = authHeader

  if (token) {
    try {
      const payload = await tokenUtil.verify(token, config.jwt.key, tokenUtil.HashAlgorithm.HS512)
      ctx.userId = payload.jti || ""
      await next()
    } catch {
      throw new Error("Invalid token")
    }
  } else {
    throw new Error("Unauthorized")
  }
}