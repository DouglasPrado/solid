import type { Checkin } from './checkin-interface';
import type { Coordenada } from './coordenada-type';

/**
 * ✅ Check-in presencial: cumpre o combinado do jeito dele
 * (registra o lugar e libera a catraca).
 */
export class CheckinPresencial implements Checkin {
  constructor(
    public readonly agendamentoId: string,
    private readonly localizacao: Coordenada,
  ) {}

  concluir(): string {
    const { latitude, longitude } = this.localizacao;
    return `Presencial ${this.agendamentoId} em (${latitude}, ${longitude}) — ${this.liberarCatraca()}`;
  }

  // A catraca só existe aqui, que é onde ela faz sentido.
  private liberarCatraca(): string {
    return 'catraca liberada';
  }
}
