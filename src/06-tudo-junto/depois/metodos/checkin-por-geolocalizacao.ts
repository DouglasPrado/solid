import type { Coordenada } from '../dominio/coordenada-type';
import type { MetodoDeCheckin } from './metodo-de-checkin-interface';

/** ✅ Check-in por GPS. A prova é a posição da pessoa. */
export class CheckinPorGeolocalizacao implements MetodoDeCheckin<Coordenada> {
  readonly nome = 'GEOLOCALIZACAO';

  constructor(
    private readonly unidade: Coordenada,
    private readonly raio = 0.001,
  ) {}

  validar(prova: Coordenada): boolean {
    const distancia = Math.hypot(
      prova.latitude - this.unidade.latitude,
      prova.longitude - this.unidade.longitude,
    );
    return distancia < this.raio;
  }
}
