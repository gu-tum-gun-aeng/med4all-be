import { assertEquals, Pool, stub } from "../../../deps.ts";
import DbUtil from "../../../src/utils/db.util.ts";
Deno.test(
  "dbutil queryOneObject() should create connection then call client.queryObject and then release connection",
  async () => {
    let isRelease = false;
    const expected = { name: "test" };
    const mockPool = new Pool("postgresql://user:pass@localhost/db", 1, true);
    const mockClient = {
      queryObject: async (_: string) => {
        return await { rows: [expected, { name: "unexpected" }] };
      },
      connect: async () => {},
      release: () => {
        isRelease = true;
      },
    };

    const stubPool = stub(mockPool, "connect", () => mockClient);
    const stubDbUtil = stub(DbUtil, "getPool", () => mockPool);

    const result = await DbUtil.queryOneObject
      `select * from tableA where id=${1}`;
    assertEquals(result, expected);
    assertEquals(isRelease, true);
    stubPool.restore();
    stubDbUtil.restore();
  },
);

Deno.test(
  "dbutil queryObject() should create connection then call client.queryObject and then release connection",
  async () => {
    let isRelease = false;
    const expected = [{ name: "test" }];
    const mockPool = new Pool("postgresql://user:pass@localhost/db", 1, true);
    const mockClient = {
      queryObject: async (_: string) => {
        return await { rows: expected };
      },
      connect: async () => {},
      release: () => {
        isRelease = true;
      },
    };

    const stubPool = stub(mockPool, "connect", () => mockClient);
    const stubDbUtil = stub(DbUtil, "getPool", () => mockPool);

    const result = await DbUtil.queryObject`select * from tableA where id=${1}`;
    assertEquals(result, expected);
    assertEquals(isRelease, true);
    stubPool.restore();
    stubDbUtil.restore();
  },
);

Deno.test(
  "dbutil queryArray() should create connection then call client.queryObject and then release connection",
  async () => {
    let isRelease = false;
    const expected = [["test"]];
    const mockPool = new Pool("postgresql://user:pass@localhost/db", 1, true);
    const mockClient = {
      queryArray: async (_: string) => {
        return await { rows: expected };
      },
      connect: async () => {},
      release: () => {
        isRelease = true;
      },
    };

    const stubPool = stub(mockPool, "connect", () => mockClient);
    const stubDbUtil = stub(DbUtil, "getPool", () => mockPool);

    const result = await DbUtil.queryArray`select * from tableA where id=${1}`;
    assertEquals(result, expected);
    assertEquals(isRelease, true);
    stubPool.restore();
    stubDbUtil.restore();
  },
);

Deno.test(
  "dbutil executeTransactional() with 2 Query should open new transaction then call client.queryArray 2 times and then release connection",
  async () => {
    let isRelease = false;
    let isCommited = false;
    const expected = [["test"]];
    const mockPool = new Pool("postgresql://user:pass@localhost/db", 1, true);
    const mockClient = {
      connect: async () => {},
      release: () => {
        isRelease = true;
      },
      createTransaction: (_: string) => {
        return {
          begin: async () => {},
          commit: () => {
            isCommited = true;
          },
          queryArray: async (_: string) => {
            return await { rows: expected };
          },
        };
      },
    };

    const stubPool = stub(mockPool, "connect", () => mockClient);
    const stubDbUtil = stub(DbUtil, "getPool", () => mockPool);

    const result = await DbUtil.executeTransactional([
      DbUtil.toQuery`select statement 1`,
      DbUtil.toQuery`select statement 2`,
    ]);

    assertEquals(result, [expected, expected]);
    assertEquals(isRelease, true);
    assertEquals(isCommited, true);
    stubPool.restore();
    stubDbUtil.restore();
  },
);

Deno.test(
  "dbutil executeTransactional() when exception was thrown, then should not commit transaction and forward exception to caller",
  async () => {
    let isRelease = false;
    let isCommited = false;
    const mockPool = new Pool("postgresql://user:pass@localhost/db", 1, true);
    const mockClient = {
      connect: async () => {},
      release: () => {
        isRelease = true;
      },
      createTransaction: (_: string) => {
        return {
          begin: async () => {},
          commit: () => {
            isCommited = true;
          },
          queryArray: (_: string) => {
            throw new Error("Oops! Error..");
          },
        };
      },
    };

    const stubPool = stub(mockPool, "connect", () => mockClient);
    const stubDbUtil = stub(DbUtil, "getPool", () => mockPool);

    try {
      await DbUtil.executeTransactional([
        DbUtil.toQuery`select statement 1`,
        DbUtil.toQuery`select statement 2`,
      ]);
      shouldNotReachThisLine();
    } catch (error) {
      assertEquals(error.message, "Oops! Error..");
    }

    assertEquals(isRelease, true);
    assertEquals(isCommited, false);
    stubPool.restore();
    stubDbUtil.restore();
  },
);

function shouldNotReachThisLine() {
  assertEquals(true, false); // Should not reach this line
}
