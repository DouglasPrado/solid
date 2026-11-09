import { PostgresClient } from './postgres-client';
import { WhatsAppApi } from './whatsapp-api';

/**
 * ❌ PROBLEMA: a classe escolhe e cria sozinha as peças que usa
 * (o banco e o WhatsApp).
 *
 * É como um abajur com o fio SOLDADO direto na fiação da parede.
 * Funciona, mas:
 *   - quer mudar de lugar? Chama o eletricista.
 *   - quer testar se a lâmpada acende? Precisa da parede inteira.
 *
 * Aqui: para trocar WhatsApp por e-mail, tem que editar esta classe.
 * Para testar, precisa de um banco e de um WhatsApp de verdade.
 */
export class CheckinService {
  private readonly db = new PostgresClient(); // ⚠️ "soldado" aqui dentro
  private readonly whatsapp = new WhatsAppApi(); // ⚠️ "soldado" aqui dentro

  realizarCheckin(agendamentoId: string, telefone: string): void {
    this.db.query('INSERT INTO checkins (agendamento_id, realizado_em) VALUES ($1, now())', [
      agendamentoId,
    ]);
    this.whatsapp.sendMessage(telefone, 'Seu check-in foi confirmado!');
  }
}
