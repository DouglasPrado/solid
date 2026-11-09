import type { DadosCheckin } from './dados-checkin-type';
import type { MetodoDeCheckin } from './metodo-de-checkin-interface';
import type { Unidade } from './unidade-type';

/**
 * ✅ Check-in pelo GPS do celular.
 * É válido se a pessoa estiver perto da unidade.
 */
export class CheckinPorGeolocalizacao implements MetodoDeCheckin {
  readonly nome = 'GEOLOCALIZACAO';

  constructor(private readonly raioMaximo = 0.001) {}

  validar(dados: DadosCheckin, unidade: Unidade): boolean {
    if (dados.latitude === undefined || dados.longitude === undefined) return false;
    const distancia = Math.hypot(
      dados.latitude - unidade.latitude,
      dados.longitude - unidade.longitude,
    );
    return distancia < this.raioMaximo;
  }
}
