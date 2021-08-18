import {
  Pool,
  PoolClient,
  QueryArguments,
  QueryArrayResult,
  QueryObjectResult,
} from "../../deps.ts";
import configs from "../config/config.ts";

let pool: Pool;

export type Query = {
  text: TemplateStringsArray;
  args: QueryArguments;
};

const DbUtil = {
  initialize: () => {
    pool = new Pool(
      configs.dbConnectionString,
      configs.dbConnectionPool,
      true,
    );
  },
  getPool: () => {
    return pool;
  },
  queryOneObject: async <T>(
    sql: TemplateStringsArray,
    ...args: QueryArguments
  ): Promise<T | undefined> => {
    const client: PoolClient = await DbUtil.getPool().connect();
    let result: QueryObjectResult<T>;
    try {
      result = await client.queryObject<T>(sql, ...args);
      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      await client.release();
    }
  },
  queryObject: async <T>(
    sql: TemplateStringsArray,
    ...args: QueryArguments
  ) => {
    const client: PoolClient = await DbUtil.getPool().connect();
    let result: QueryObjectResult<T>;
    try {
      result = await client.queryObject<T>(sql, ...args);
      return result.rows;
    } finally {
      await client.release();
    }
  },
  queryArray: async <T extends Array<unknown>>(
    sql: TemplateStringsArray,
    ...args: QueryArguments
  ) => {
    const client: PoolClient = await DbUtil.getPool().connect();
    let result: QueryArrayResult<T>;
    try {
      result = await client.queryArray<T>(sql, ...args);

      return result.rows;
    } finally {
      await client.release();
    }
  },
  excuteTransactional: async <T extends Array<unknown>>(
    statements: Query[],
  ) => {
    const client: PoolClient = await DbUtil.getPool().connect();
    const transaction = client.createTransaction("transaction");
    try {
      await transaction.begin();
      const results = await Promise.all(statements.map(async (statement) => {
        const result = await transaction.queryArray<T>(
          statement.text,
          ...statement.args,
        );

        return result.rows;
      }));

      await transaction.commit();
      return results;
    } finally {
      await client.release();
    }
  },
  terminate: async () => {
    await DbUtil.getPool().end();
  },
  toQuery: (strings: TemplateStringsArray, ...args: QueryArguments): Query => {
    return {
      text: strings,
      args: args,
    };
  },
};

export default DbUtil;
