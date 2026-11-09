import type { Coordenada } from './coordenada-type';
import type { LeitorQRCode } from './leitor-qrcode-interface';
import type { NotificadorPush } from './notificador-push-interface';
import type { ProvedorDeLocalizacao } from './provedor-de-localizacao-interface';

/**
 * ✅ App: diz só o que realmente sabe fazer
 * (ler QR Code, usar GPS e mandar notificação).
 */
export class AppMobile implements LeitorQRCode, ProvedorDeLocalizacao, NotificadorPush {
  lerQRCode(): string {
    return 'UNIDADE-123';
  }

  obterGeolocalizacao(): Coordenada {
    return { latitude: -23.5505, longitude: -46.6333 };
  }

  enviarPush(mensagem: string): void {
    console.log(`📱 Push: ${mensagem}`);
  }
}
