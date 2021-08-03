import { QueryObjectResult } from "https://deno.land/x/postgres@v0.11.3/query/query.ts";
import { Pool, PoolClient } from "../../deps.ts";
import configs from "../config/config.ts";

const pool = new Pool(configs.dbConnectionString, configs.dbConnectionPool);

const DbUtil = {
  
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
     
    }
}

export default DbUtil;