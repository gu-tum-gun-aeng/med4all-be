import { Pool } from "../../deps.ts";

export class PatientRepo {
  async getAll(): Promise<unknown[]> {
    const pool = new Pool({
      database: "med4all",
      hostname: "localhost",
      port: 5432,
      user: "catfly",
    }, 10); // Creates a pool with 10 available connections
    // Run once per server

    const client = await pool.connect(); // Run once per query

    const patients = await client.queryArray("SELECT * FROM patient;");

    await client.release(); // Run once per query

    await pool.end(); // Run once per server

    return patients.rows;
  }
}
