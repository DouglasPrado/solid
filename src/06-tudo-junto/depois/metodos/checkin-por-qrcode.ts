import type { MetodoDeCheckin } from './metodo-de-checkin-interface';
import type { ProvaQRCode } from './prova-qrcode-type';

/** ✅ Check-in por QR Code. A prova é o código lido. */
export class CheckinPorQRCode implements MetodoDeCheckin<ProvaQRCode> {
  readonly nome = 'QRCODE';

  constructor(private readonly qrCodeDaUnidade: string) {}

  validar(prova: ProvaQRCode): boolean {
    return prova.qrCode === this.qrCodeDaUnidade;
  }
}
