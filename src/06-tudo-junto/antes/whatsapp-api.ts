/** Peça de infraestrutura: envia mensagens pelo WhatsApp. */
export class WhatsAppApi {
  send(phone: string, text: string): void {
    console.log(`  [WhatsApp -> ${phone}] ${text}`);
  }
}
