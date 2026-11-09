import type { Agendamento } from './agendamento-type';

/** ✅ (S) Só cuida do horário: nem cedo demais, nem atrasado demais. */
export class JanelaDeCheckin {
  constructor(
    private readonly antecedenciaMaxMin = 30,
    private readonly toleranciaAtrasoMin = 15,
  ) {}

  validar(agendamento: Agendamento, agora: Date): void {
    const diff = (agendamento.dataHora.getTime() - agora.getTime()) / 60_000;
    if (diff > this.antecedenciaMaxMin) throw new Error('Ainda é cedo para o check-in');
    if (diff < -this.toleranciaAtrasoMin) throw new Error('Tolerância de atraso excedida');
  }
}
