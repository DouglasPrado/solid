import type { Agendamento } from './agendamento-type';
import type { CheckinRepository } from './checkin-repository';

/**
 * ✅ O FISCAL: só confere as regras.
 *   - não pode fazer check-in cedo demais (mais de 30 min antes)
 *   - não pode chegar atrasado demais (mais de 15 min depois)
 *   - não pode fazer check-in duas vezes
 * Mudou alguma regra? Só mexe aqui.
 */
export class RegrasDeCheckin {
  private static readonly ANTECEDENCIA_MAX_MIN = 30;
  private static readonly TOLERANCIA_ATRASO_MIN = 15;

  constructor(private readonly repo: CheckinRepository) {}

  validar(agendamento: Agendamento, agora: Date): void {
    const diffMinutos = (agendamento.dataHora.getTime() - agora.getTime()) / 60_000;

    if (diffMinutos > RegrasDeCheckin.ANTECEDENCIA_MAX_MIN) {
      throw new Error('Check-in só pode ser feito até 30 minutos antes.');
    }
    if (diffMinutos < -RegrasDeCheckin.TOLERANCIA_ATRASO_MIN) {
      throw new Error('Tolerância de atraso excedida.');
    }
    if (this.repo.existeParaAgendamento(agendamento.id)) {
      throw new Error('Check-in já realizado.');
    }
  }
}
