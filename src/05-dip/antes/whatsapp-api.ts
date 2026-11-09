/** Peça de infraestrutura: envia mensagens pelo WhatsApp. */
export class WhatsAppApi {
  sendMessage(phone: string, text: string): void {
    console.log(`[WhatsApp API -> ${phone}] ${text}`);
  }
}
