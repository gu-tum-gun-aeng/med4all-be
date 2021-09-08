import { assertEquals } from "../../deps.ts";

export function assertShouldNotReachThisLine() {
  assertEquals(true, false); // Should not reach this line
}
