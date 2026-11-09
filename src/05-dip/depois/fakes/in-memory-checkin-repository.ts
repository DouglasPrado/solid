import type { CheckinRepository } from '../dominio/checkin-repository-interface';

/**
 * Peça de TESTE: finge ser um banco, guardando tudo numa lista.
 * Rápido, e não precisa de banco de verdade.
 */
export class InMemoryCheckinRepository implements CheckinRepository {
  readonly salvos: string[] = [];

  salvar(agendamentoId: string): void {
    this.salvos.push(agendamentoId);
  }
}
