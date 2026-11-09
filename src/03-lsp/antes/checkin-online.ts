import { Checkin } from './checkin';

/**
 * ❌ PROBLEMA: o check-in online é "filho" da classe Checkin,
 * mas não consegue cumprir o que a mãe promete (não tem lugar no mapa nem catraca).
 * Então ele "resolve" dando erro.
 *
 * Pense numa locadora: você aluga "um carro" e espera que qualquer carro
 * entregue tenha freio. Se te entregam um que quebra ao frear porque
 * "esse modelo não tem freio", o problema não é seu: esse carro nem deveria
 * estar na locadora como "carro".
 */
export class CheckinOnline extends Checkin {
  override obterLocalizacao(): never {
    throw new Error('Check-in online não possui localização!');
  }

  override liberarCatraca(): never {
    throw new Error('Check-in online não tem catraca!');
  }
}
