import type { Checkin } from '../dominio/checkin-type';

/** ✅ (D) Tomada para "guardar check-in". Qualquer banco que tenha esse plugue serve. */
export interface CheckinRepository {
  salvar(checkin: Checkin): Promise<void>;
  existeParaAgendamento(agendamentoId: string): Promise<boolean>;
}
