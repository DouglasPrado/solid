import type { Checkin } from './checkin-interface';

/**
 * ✅ Check-in online: cumpre o combinado do jeito dele (libera a sala virtual).
 * Não precisa fingir que tem catraca.
 */
export class CheckinOnline implements Checkin {
  constructor(
    public readonly agendamentoId: string,
    private readonly linkSala: string,
  ) {}

  concluir(): string {
    return `Online ${this.agendamentoId} — sala liberada em ${this.linkSala}`;
  }
}
