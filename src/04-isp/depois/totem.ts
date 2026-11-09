import type { Impressora } from './impressora-interface';
import type { LeitorQRCode } from './leitor-qrcode-interface';

/**
 * ✅ Totem: diz só o que realmente sabe fazer (ler QR Code e imprimir).
 * Como um controle remoto só com os botões que funcionam.
 */
export class Totem implements LeitorQRCode, Impressora {
  lerQRCode(): string {
    return 'UNIDADE-123';
  }

  imprimirComprovante(agendamentoId: string): void {
    console.log(`🖨️  Comprovante impresso: ${agendamentoId}`);
  }
}
