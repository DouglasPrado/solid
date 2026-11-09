import type { Coordenada } from './coordenada-type';
import type { PontoDeCheckin } from './ponto-de-checkin-interface';

/**
 * App no celular. Tem GPS e notificação...
 * mas é obrigado a ter o "botão" de imprimir também.
 */
export class AppMobile implements PontoDeCheckin {
  lerQRCode(): string {
    return 'UNIDADE-123';
  }

  obterGeolocalizacao(): Coordenada {
    return { latitude: -23.5505, longitude: -46.6333 };
  }

  imprimirComprovante(): void {
    throw new Error('Celular não imprime'); // ⚠️ É obrigado a ter este botão, mesmo sem impressora
  }

  enviarPush(mensagem: string): void {
    console.log(`📱 Push: ${mensagem}`);
  }
}
