import type { DadosCheckin } from './dados-checkin-type';
import type { MetodoDeCheckin } from './metodo-de-checkin-interface';

/**
 * ✅ Check-in feito pela recepção.
 * É válido se tiver um atendente identificado.
 */
export class CheckinPelaRecepcao implements MetodoDeCheckin {
  readonly nome = 'RECEPCAO';

  validar(dados: DadosCheckin): boolean {
    return Boolean(dados.atendenteId);
  }
}
