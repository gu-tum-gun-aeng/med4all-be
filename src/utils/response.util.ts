import { Response, Status } from "../../deps.ts";

// deno-lint-ignore no-explicit-any
export const responseOk = (response: Response, results: any) => {
  response.body = {
    results,
  };
  response.status = 200;
};

export type MyResponseBody = Record<string, unknown>;
export type MyResponseBodyFunction = () =>
  | MyResponseBody
  | Promise<MyResponseBody>;

export const jsonResponse = (
  response: Response,
  status: Status,
  body: MyResponseBody | MyResponseBodyFunction,
) => {
  response.body = {
    body,
  };
  response.status = status;
};
