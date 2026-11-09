/** ✅ (D) Tomada para "avisar o usuário". WhatsApp, e-mail, SMS... qualquer um encaixa. */
export interface Notificador {
  enviar(destino: string, mensagem: string): Promise<void>;
}
