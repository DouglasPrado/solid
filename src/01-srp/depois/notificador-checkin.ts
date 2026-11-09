import type { Agendamento } from './agendamento-type';

/**
 * ✅ O CARTEIRO: só avisa o usuário.
 * Mudou o texto da mensagem ou trocou WhatsApp por SMS? Só mexe aqui.
 */
export class NotificadorCheckin {
  confirmar(agendamento: Agendamento): void {
    const mensagem = `Olá ${agendamento.usuarioNome}, seu check-in foi confirmado!`;
    console.log(`[WhatsApp -> ${agendamento.usuarioTelefone}] ${mensagem}`);
  }
}
