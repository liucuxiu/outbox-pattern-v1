import { Pool, QueryResult } from 'pg';

export class PostgreDatabase {

  private static instance: PostgreDatabase;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'outbox_test',
      password: 'password',
      port: 5432,
    });
  }

  public static getInstance(): PostgreDatabase {
    if (!PostgreDatabase.instance) {
      PostgreDatabase.instance = new PostgreDatabase();
    }

    return PostgreDatabase.instance;
  }

  public async query(query: string, params: any[]): Promise<QueryResult> {
    return await this.pool.query(query, params);
  }
}
