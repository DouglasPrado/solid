import type { DadosCheckin } from './dados-checkin-type';
import type { MetodoDeCheckin } from './metodo-de-checkin-interface';
import type { Unidade } from './unidade-type';

/**
 * ✅ Check-in lendo o QR Code da unidade.
 * É válido se o código lido for igual ao código da unidade.
 */
export class CheckinPorQRCode implements MetodoDeCheckin {
  readonly nome = 'QRCODE';

  validar(dados: DadosCheckin, unidade: Unidade): boolean {
    return dados.qrCodeLido === unidade.qrCode;
  }
}
