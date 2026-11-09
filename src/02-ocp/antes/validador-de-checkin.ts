import type { DadosCheckin } from './dados-checkin-type';
import { UNIDADE } from './unidade';

/**
 * ❌ PROBLEMA: para ensinar um jeito novo de fazer check-in,
 * é preciso ABRIR e EDITAR esta classe.
 *
 * É como se, para instalar um app novo no celular, você tivesse que abrir
 * o aparelho com chave de fenda e soldar uma peça. Até funciona, mas toda vez
 * você corre o risco de estragar o que já estava funcionando.
 *
 * Hoje são 3 jeitos (QR Code, localização, recepção).
 * Amanhã pedem NFC -> mais um "case". Depois, reconhecimento facial -> mais um...
 */
export class ValidadorDeCheckin {
  validar(dados: DadosCheckin): boolean {
    switch (dados.metodo) {
      case 'QRCODE':
        return dados.qrCodeLido === UNIDADE.qrCode;

      case 'GEOLOCALIZACAO': {
        if (dados.latitude === undefined || dados.longitude === undefined) return false;
        const distancia = Math.hypot(
          dados.latitude - UNIDADE.latitude,
          dados.longitude - UNIDADE.longitude,
        );
        return distancia < 0.001; // ~100 m (simplificado)
      }

      case 'RECEPCAO':
        return Boolean(dados.atendenteId);

      // 👉 Pediram NFC? Tem que abrir este arquivo e escrever mais um "case" aqui.
      default:
        throw new Error('Método de check-in não suportado');
    }
  }
}
