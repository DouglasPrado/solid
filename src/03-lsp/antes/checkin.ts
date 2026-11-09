import type { Coordenada } from './coordenada-type';

/**
 * A classe "mãe" de todo check-in.
 * Ela PROMETE que todo check-in tem um lugar no mapa e uma catraca para liberar.
 */
export class Checkin {
  constructor(public readonly agendamentoId: string) {}

  obterLocalizacao(): Coordenada {
    return { latitude: -23.5505, longitude: -46.6333 };
  }

  liberarCatraca(): string {
    return `Catraca liberada para o agendamento ${this.agendamentoId}`;
  }
}
