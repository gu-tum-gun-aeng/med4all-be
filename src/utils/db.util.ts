import { Pool, PoolClient } from "postgres/mod.ts";
import {
  QueryArguments,
  QueryArrayResult,
  QueryObjectResult,
} from "postgres/query/query.ts";
import configs from "src/config/config.ts";

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
  queryObject: async <T>(
    query: Query,
  ) => {
    const client: PoolClient = await pool.connect();
    let result: QueryObjectResult<T>;
    try {
      result = await client.queryObject<T>(query.text, query.args);
      return result.rows;
    } finally {
      await client.release();
    }
  },
  queryArray: async <T extends Array<unknown>>(query: Query) => {
    const client: PoolClient = await pool.connect();
    let result: QueryArrayResult<T>;
    try {
      result = await client.queryArray<T>(query.text, query.args);
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
    let results: T[][];
    try {
      await transaction.begin();
      results = await Promise.all(statements.map(async (statement) => {
        const result = await client.queryArray<T>(
          statement.text,
          statement.args,
        );
        return result.rows;
      }));
      transaction.commit();
      return results;
    } catch (e) {
      await transaction.rollback();
      throw e;
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
