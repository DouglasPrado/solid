/**
 * ✅ O "COMBINADO" que vale para TODO check-in, sem exceção:
 *   - tem um agendamento
 *   - sabe se concluir: concluir()
 *
 * Só entra aqui o que TODOS conseguem cumprir.
 * Lugar no mapa e catraca ficaram de fora, porque o online não tem.
 */
export interface Checkin {
  readonly agendamentoId: string;
  concluir(): string;
}
