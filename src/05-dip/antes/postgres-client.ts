/** Peça de infraestrutura: conversa com o banco de dados Postgres. */
export class PostgresClient {
  query(sql: string, params: unknown[]): void {
    console.log(`[Postgres] ${sql}`, params);
  }
}
