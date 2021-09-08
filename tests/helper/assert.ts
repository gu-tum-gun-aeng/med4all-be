import { assertEquals } from "../../deps.ts";

export function assertShouldNotReachThisLine(msg?: string) {
  // Should not reach this line
  assertEquals(
    true,
    false,
    msg ? msg : "The execution should not reach this line.",
  );
}

export function assertShouldNotThrowException(fn: () => void) {
  try {
    fn();
  } catch (_error) {
    assertShouldNotReachThisLine(
      "The execution should not throw an exception.",
    );
  }
}

export async function assertShouldNotThrowExceptionAsync(
  fn: () => Promise<void>,
) {
  try {
    await fn();
  } catch (_error) {
    assertShouldNotReachThisLine(
      "The execution should not throw an exception.",
    );
  }
}
