import { assertEquals } from "../../../deps.ts";
import * as dateUtils from "../../../src/utils/date.util.ts";

Deno.test("given timestamp second, when call toDate, then return Date", () => {
  const now = new Date()
  const nowSecond = now.getTime() / 1000

  const token = dateUtils.toDate(nowSecond);

  assertEquals(token, now);
});

Deno.test("given Date, when call parseFormat, then return string date with format yyyy-MM-dd HH:mm:ss.SSS", () => {
    const now = new Date(2021, 5, 1, 11, 11, 11)

    const dateFormat = dateUtils.parseFormat(now);
  
    assertEquals(dateFormat, "2021-06-01 11:11:11.000");
  });
