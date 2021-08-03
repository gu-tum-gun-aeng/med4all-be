import {
  Pool,
  PoolClient,
  QueryArrayResult,
  QueryObjectResult,
} from "../../deps.ts";
import configs from "../config/config.ts";

let pool: Pool;

const DbUtil = {
  initialize: () => {
    pool = new Pool(
      configs.dbConnectionString,
      configs.dbConnectionPool,
      true,
    );
  },
  queryObject: async <T>(statement: string) => {
    const client: PoolClient = await pool.connect();
    let result: QueryObjectResult<T>;
    try {
      result = await client.queryObject<T>(
        statement,
      );
      return result.rows;
    } finally {
      await client.release();
    }
  },
  queryArray: async <T extends Array<unknown>>(statement: string) => {
    const client: PoolClient = await pool.connect();
    let result: QueryArrayResult<T>;
    try {
      result = await client.queryArray<T>(
        statement,
      );
      return result.rows;
    } finally {
      await client.release();
    }
  },
  terminate: async () => {
    await pool.end();
  }
};

export default DbUtil;
