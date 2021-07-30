import { assertThrowsAsync } from "../../../deps.ts";
import { assertSpyCall, assertSpyCalls } from "../../../deps.ts";
import { spy, stub } from "../../../deps.ts";
import { traceWrapper } from "../../../src/utils/trace.util.ts";
import log from "../../../src/utils/logger.util.ts";

Deno.test(
  "should call callback function 1 time when call trace wrapper",
  async () => {
    const stubLogTrace = stub(log, "trace");
    const fx = spy();
    try {
      await traceWrapper(fx, "log");
      assertSpyCalls(fx, 1);
    } finally {
      stubLogTrace.restore();
    }
  },
);

Deno.test("should call trace 2 times when call trace wrapper", async () => {
  const stubLogTrace = stub(log, "trace");
  try {
    await traceWrapper(async () => {}, "log");
    assertSpyCalls(stubLogTrace, 2);
  } finally {
    stubLogTrace.restore();
  }
});

Deno.test(
  "should call trace with function name when call trace wrapper and pass function",
  async () => {
    const stubLogTrace = stub(log, "trace");
    const testing = async () => {};
    try {
      await traceWrapper(testing, "test");
      assertSpyCall(stubLogTrace, 0, {
        args: [
          "[TESTING - START]",
          "med4all_be_test::test::testing",
          undefined,
        ],
      });
    } finally {
      stubLogTrace.restore();
    }
  },
);

Deno.test(
  "should call trace with name when call trace wrapper and pass name as argument",
  async () => {
    const stubLogTrace = stub(log, "trace");
    const testing = async () => {};
    try {
      await traceWrapper(testing, "test", "put-name");
      assertSpyCall(stubLogTrace, 0, {
        args: [
          "[PUT-NAME - START]",
          "med4all_be_test::test::put-name",
          undefined,
        ],
      });
    } finally {
      stubLogTrace.restore();
    }
  },
);

Deno.test("should get http object when call with request", async () => {
  const stubLogTrace = stub(log, "trace");
  const mockRequest = {
    url: new URL("http://testing:101"),
    ip: "testing-ip",
    headers: undefined,
  } as const;
  try {
    await traceWrapper(async () => {}, "test", "http-object", mockRequest);
    assertSpyCall(stubLogTrace, 0, {
      args: [
        "[HTTP-OBJECT - START]",
        "med4all_be_test::test::http-object",
        {
          clientIp: "testing-ip",
          host: "testing:101",
          route: "/",
          scheme: "http:",
          target: "/",
          userAgent: undefined,
        },
      ],
    });
  } finally {
    stubLogTrace.restore();
  }
});

Deno.test("should get error when call with request no url", async () => {
  const stubLogTrace = stub(log, "trace");
  const mockRequest = {
    ip: "testing-ip",
    headers: undefined,
  } as const;
  try {
    await assertThrowsAsync(
      async () =>
        await traceWrapper(async () => {}, "test", "http-object", mockRequest),
      TypeError,
      "Invalid URL",
    );
  } finally {
    stubLogTrace.restore();
  }
});
