import type { Notificador } from '../dominio/notificador-interface';

/** Peça real: envia por e-mail. Encaixa na mesma tomada que o WhatsApp. */
export class EmailNotificador implements Notificador {
  enviar(destino: string, mensagem: string): void {
    console.log(`[E-mail -> ${destino}] ${mensagem}`);
  }
}
