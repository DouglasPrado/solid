/** ✅ Habilidade: mandar notificação no celular. */
export interface NotificadorPush {
  enviarPush(mensagem: string): void;
}
