import { assertEquals } from "../../../deps.ts";
import { getHostname, process } from "../../../src/utils/os.util.ts";
import { stub } from "../../../deps.ts";

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
