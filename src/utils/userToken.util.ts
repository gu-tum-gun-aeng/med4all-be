import { create, decode, verify } from "https://deno.land/x/djwt@v2.2/mod.ts";

type BaseRecord = Record<string, number | string>;

export interface UserPayload extends BaseRecord {
  id: number;
}

export const createUserToken = async (
  userPayload: UserPayload,
  key: string,
): Promise<string> =>
  await create({ alg: "HS512", typ: "JWT" }, userPayload, key);

export const createToken = async (key: string): Promise<string> =>
  await create({ alg: "HS512", typ: "JWT" }, { foo: "bar" }, key);
