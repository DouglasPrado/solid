import type { Coordenada } from './coordenada-type';
import type { PontoDeCheckin } from './ponto-de-checkin-interface';

/**
 * Totem da recepção. Sabe ler QR Code e imprimir...
 * mas é obrigado a ter os "botões" de GPS e de notificação também.
 */
export class Totem implements PontoDeCheckin {
  lerQRCode(): string {
    return 'UNIDADE-123';
  }

  obterGeolocalizacao(): Coordenada {
    throw new Error('Totem não tem GPS'); // ⚠️ É obrigado a ter este botão, mesmo sem GPS
  }

  imprimirComprovante(agendamentoId: string): void {
    console.log(`🖨️  Comprovante impresso: ${agendamentoId}`);
  }

  enviarPush(): void {
    // ⚠️ Botão que não faz nada. Ninguém percebe que o aviso não foi enviado.
  }
}
