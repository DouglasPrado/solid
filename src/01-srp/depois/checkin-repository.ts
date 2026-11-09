import type { Checkin } from './checkin-type';

/**
 * ✅ O ARQUIVISTA: só guarda e procura check-ins.
 * Trocou o banco de dados? Só mexe aqui.
 */
export class CheckinRepository {
  private readonly dados: Checkin[] = [];

  salvar(checkin: Checkin): void {
    this.dados.push(checkin);
  }

  existeParaAgendamento(agendamentoId: string): boolean {
    return this.dados.some((c) => c.agendamentoId === agendamentoId);
  }
}
