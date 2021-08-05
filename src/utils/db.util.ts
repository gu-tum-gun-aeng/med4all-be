import {
  Pool,
  PoolClient,
  QueryArguments,
  QueryArrayResult,
  QueryObjectResult,
} from "../../deps.ts";
import configs from "../config/config.ts";
import { throwError } from "../middlewares/errorHandler.middleware.ts";

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
  queryOneObject: async <T>(
    sql: TemplateStringsArray,
    ...args: QueryArguments
  ): Promise<T | undefined> => {
    const client: PoolClient = await pool.connect();
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
    const client: PoolClient = await pool.connect();
    let result: QueryObjectResult<T>;
    try {
      result = await client.queryObject<T>(sql, ...args);
      return result.rows;
    } finally {
      await client.release();
    }
  },
  queryOneObject: async <T>(
    sql: TemplateStringsArray,
    ...args: QueryArguments
  ): Promise<T | undefined> => {
    const client: PoolClient = await pool.connect();
    let result: QueryObjectResult<T>;
    try {
      result = await client.queryObject<T>(sql, ...args);
      return result.rows.length > 0 ? result.rows[0] : undefined;
    } finally {
      await client.release();
    }
  },
  queryArray: async <T extends Array<unknown>>(
    sql: TemplateStringsArray,
    ...args: QueryArguments
  ) => {
    const client: PoolClient = await pool.connect();
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
    const client: PoolClient = await pool.connect();
    const transaction = client.createTransaction("transaction");
    try {
      await transaction.begin();
      const results = Promise.all(statements.map(async (statement) => {
        const result = await transaction.queryArray<T>(
          statement.text,
          ...statement.args,
        );
        return result.rows;
      }));
      await transaction.commit();
      return results;
    } catch (e) {
      await transaction.rollback();
      throwError(e);
    } finally {
      await client.release();
    }
  },
  terminate: async () => {
    await pool.end();
  },
  toQuery: (strings: TemplateStringsArray, ...args: QueryArguments): Query => {
    return {
      text: strings,
      args: args,
    };
  },
};

export default DbUtil;
