import type { Notificador } from '../portas/notificador-interface';

/** Peça real: envia por WhatsApp. */
export class WhatsAppNotificador implements Notificador {
  async enviar(destino: string, mensagem: string): Promise<void> {
    console.log(`  [WhatsApp -> ${destino}] ${mensagem}`);
  }
}
