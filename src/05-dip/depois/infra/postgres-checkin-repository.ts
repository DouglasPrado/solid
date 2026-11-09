import type { CheckinRepository } from '../dominio/checkin-repository-interface';

/** Peça real: salva no Postgres. Encaixa na tomada CheckinRepository. */
export class PostgresCheckinRepository implements CheckinRepository {
  salvar(agendamentoId: string, realizadoEm: Date): void {
    console.log('[Postgres] INSERT INTO checkins ...', [agendamentoId, realizadoEm.toISOString()]);
  }
}
