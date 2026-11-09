import type { DadosCheckin } from './dados-checkin-type';
import type { MetodoDeCheckin } from './metodo-de-checkin-interface';

/**
 * 🆕 MÉTODO NOVO: NFC (aproximar a pulseira do leitor).
 *
 * Para criar este método, só criamos ESTE arquivo.
 * Não mexemos em nenhum outro método nem no validador.
 * É como instalar um app: o celular continua igualzinho.
 */
export class CheckinPorNfc implements MetodoDeCheckin {
  readonly nome = 'NFC';

  validar(dados: DadosCheckin): boolean {
    return dados.pulseiraNfc?.startsWith('NFC-') ?? false;
  }
}
