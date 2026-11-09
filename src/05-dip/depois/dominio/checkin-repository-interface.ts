/**
 * ✅ A TOMADA para "guardar check-in".
 * Diz só O QUE precisa existir (um salvar), não COMO.
 * Qualquer banco que tenha esse "plugue" serve.
 */
export interface CheckinRepository {
  salvar(agendamentoId: string, realizadoEm: Date): void;
}
