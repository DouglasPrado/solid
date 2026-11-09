/** Peça de infraestrutura: conversa com o banco de dados Postgres. */
export class PostgresClient {
  private readonly tabela: { agendamentoId: string }[] = [];

  insert(agendamentoId: string): void {
    this.tabela.push({ agendamentoId });
    console.log(`  [Postgres] INSERT checkin ${agendamentoId}`);
  }

  exists(agendamentoId: string): boolean {
    return this.tabela.some((r) => r.agendamentoId === agendamentoId);
  }
}
