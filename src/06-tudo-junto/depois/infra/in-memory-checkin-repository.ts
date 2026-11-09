import type { Checkin } from '../dominio/checkin-type';
import type { CheckinRepository } from '../portas/checkin-repository-interface';

/**
 * Peça real de exemplo: guarda numa lista na memória.
 * No sistema de verdade seria um banco (Postgres, por exemplo).
 */
export class InMemoryCheckinRepository implements CheckinRepository {
  private readonly dados: Checkin[] = [];

  async salvar(checkin: Checkin): Promise<void> {
    this.dados.push(checkin);
  }

  async existeParaAgendamento(agendamentoId: string): Promise<boolean> {
    return this.dados.some((c) => c.agendamentoId === agendamentoId);
  }
}
