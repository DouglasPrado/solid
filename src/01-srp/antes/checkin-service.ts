import type { Agendamento } from './agendamento-type';

/**
 * ❌ PROBLEMA: esta classe faz TUDO sozinha.
 *
 * Pense num restaurante onde UMA pessoa cozinha, atende, cobra e lava a louça.
 * Funciona... até precisar mudar alguma coisa: trocar o cardápio, a maquininha
 * de cartão ou o detergente. É sempre a mesma pessoa que precisa "reaprender".
 *
 * Aqui é igual. Esta classe:
 *   1. confere o horário        (regra)
 *   2. guarda o check-in        (banco)
 *   3. manda o WhatsApp         (aviso)
 *   4. escreve o log            (anotação)
 *
 * Qualquer mudança em QUALQUER um desses assuntos mexe neste mesmo arquivo.
 */
export class CheckinService {
  private readonly checkins: { agendamentoId: string; realizadoEm: Date }[] = [];

  realizarCheckin(agendamento: Agendamento, agora: Date): void {
    // 1) Confere o horário e se já fez check-in
    const diffMinutos = (agendamento.dataHora.getTime() - agora.getTime()) / 60_000;
    if (diffMinutos > 30) {
      throw new Error('Check-in só pode ser feito até 30 minutos antes.');
    }
    if (diffMinutos < -15) {
      throw new Error('Tolerância de atraso excedida.');
    }
    if (this.checkins.some((c) => c.agendamentoId === agendamento.id)) {
      throw new Error('Check-in já realizado.');
    }

    // 2) Guarda o check-in
    this.checkins.push({ agendamentoId: agendamento.id, realizadoEm: agora });

    // 3) Avisa o usuário
    const mensagem = `Olá ${agendamento.usuarioNome}, seu check-in foi confirmado!`;
    console.log(`[WhatsApp -> ${agendamento.usuarioTelefone}] ${mensagem}`);

    // 4) Anota no log
    console.log(`[LOG ${agora.toISOString()}] checkin agendamento=${agendamento.id}`);
  }
}
