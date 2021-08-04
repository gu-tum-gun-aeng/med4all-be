import { stub } from "mock/stub.ts";
import { assertEquals } from "testing/asserts.ts";

import { getHostname, process } from "src/utils/os.util.ts";

Deno.test("Get host hame", async () => {
  const stubProcessRun = stub(
    process,
    "runHostName",
    [{ output: () => new TextEncoder().encode("mock-host") }],
  );
  try {
    const hostname = await getHostname();
    assertEquals(hostname, "mock-host");
  } finally {
    stubProcessRun.restore();
  }
});
