import type { Notificador } from '../dominio/notificador-interface';

/**
 * Peça de TESTE: em vez de enviar, só anota o que teria enviado.
 * Assim o teste consegue conferir se a mensagem "saiu".
 */
export class NotificadorSpy implements Notificador {
  readonly enviados: { destino: string; mensagem: string }[] = [];

  enviar(destino: string, mensagem: string): void {
    this.enviados.push({ destino, mensagem });
  }
}
