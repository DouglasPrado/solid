import type { Coordenada } from './coordenada-type';

/**
 * ❌ PROBLEMA: uma lista de obrigações grande demais.
 *
 * Pense num controle remoto com 50 botões em que metade não faz nada
 * na sua TV. Você aperta, nada acontece, e fica sem saber se quebrou.
 *
 * Aqui, todo aparelho de check-in é OBRIGADO a saber:
 * ler QR Code, pegar GPS, imprimir e mandar notificação.
 * Mas o totem não tem GPS, e o celular não tem impressora.
 */
export interface PontoDeCheckin {
  lerQRCode(): string;
  obterGeolocalizacao(): Coordenada;
  imprimirComprovante(agendamentoId: string): void;
  enviarPush(mensagem: string): void;
}
