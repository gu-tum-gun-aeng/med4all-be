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
  queryObject: async <T>(
    sql: string//query: Query,
  ) => {
    const client: PoolClient = await pool.connect();
    let result: QueryObjectResult<T>;
    try {
      result = await client.queryObject<T>(sql);
      return result.rows;
    } finally {
      await client.release();
    }
  },
  queryOneObject: async <T>(
    sql: string//query: Query,
  ) => {
    const client: PoolClient = await pool.connect();
    let result: QueryObjectResult<T>;
    try {
      result = await client.queryObject<T>(sql);
      return result.rows[0];
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
    statements: string[],
  ) => {
    const client: PoolClient = await pool.connect();
    //const transaction = client.createTransaction("transaction");
    try {
      //await transaction.begin();
      for (let index = 0; index < statements.length; index++) {
        const statement = statements[index];
        console.log("#########################start:", statement);
        await client.queryArray<T>(statement);
        console.log("#########################end:", statement);
      }
     // await transaction.commit();
    } catch (e) {
     // await transaction.rollback();
      throwError(e);
    } finally {
      await client.release();
    }
  },
  terminate: async () => {
    await pool.end();
  },
  toQuery: (strings: TemplateStringsArray, ...args: QueryArguments): Query => {
    console.log("toQuery###########", JSON.stringify(strings), args)
    return {
      text: strings,
      args: args,
    };
  },
};

export default DbUtil;
