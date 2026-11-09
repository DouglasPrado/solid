/**
 * ✅ A TOMADA para "avisar alguém".
 * WhatsApp, e-mail, SMS... qualquer um que tenha enviar() encaixa.
 */
export interface Notificador {
  enviar(destino: string, mensagem: string): void;
}
