import type { Notificador } from '../dominio/notificador-interface';

/** Peça real: envia por WhatsApp. Encaixa na tomada Notificador. */
export class WhatsAppNotificador implements Notificador {
  enviar(destino: string, mensagem: string): void {
    console.log(`[WhatsApp -> ${destino}] ${mensagem}`);
  }
}
