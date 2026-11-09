import type { DadosCheckin } from './dados-checkin-type';
import { PostgresClient } from './postgres-client';
import { WhatsAppApi } from './whatsapp-api';

/**
 * ❌ A classe "faz-tudo": quebra os 5 princípios de uma vez.
 *
 *   S → faz tudo sozinha (horário, banco, WhatsApp, log)
 *   O → para cada método novo, tem que editar o switch
 *   L → o online é uma "exceção" que pula as regras
 *   I → recebe um formulário com campos de todos os métodos
 *   D → cria o banco e o WhatsApp aqui dentro ("soldados")
 */
export class CheckinService {
  private readonly db = new PostgresClient(); // D ❌ soldado aqui dentro
  private readonly whatsapp = new WhatsAppApi(); // D ❌ soldado aqui dentro

  realizar(dados: DadosCheckin, agora = new Date()): void {
    // S ❌ regra de horário misturada com todo o resto
    const diff = (dados.dataHoraAgendamento.getTime() - agora.getTime()) / 60_000;
    if (diff > 30 || diff < -15) throw new Error('Fora da janela de check-in');
    if (this.db.exists(dados.agendamentoId)) throw new Error('Check-in já realizado');

    // O ❌ método novo = mais um case aqui
    switch (dados.metodo) {
      case 'QRCODE':
        if (dados.qrCodeLido !== 'UNIDADE-123') throw new Error('QR Code inválido');
        break;
      case 'GEOLOCALIZACAO':
        if (Math.hypot((dados.latitude ?? 0) + 23.5505, (dados.longitude ?? 0) + 46.6333) > 0.001)
          throw new Error('Fora da unidade');
        break;
      case 'ONLINE':
        // L ❌ online é exceção: não confere nada
        break;
    }

    // S ❌ e ainda salva, avisa e anota o log
    this.db.insert(dados.agendamentoId);
    this.whatsapp.send(dados.usuarioTelefone, `Olá ${dados.usuarioNome}, check-in confirmado!`);
    console.log(`  [LOG] checkin ${dados.agendamentoId} via ${dados.metodo}`);
  }
}
