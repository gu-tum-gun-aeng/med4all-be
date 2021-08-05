import { assertEquals } from "../../../deps.ts";
import * as dateUtils from "../../../src/utils/date.util.ts";

Deno.test("given timestamp second, when call toDate, then return Date", () => {
  const now = new Date();
  const nowSecond = now.getTime() / 1000;

  const token = dateUtils.toDate(nowSecond);

  assertEquals(token, now);
});
