import type { Coordenada } from './coordenada-type';

/** ✅ Habilidade: saber onde está (GPS). */
export interface ProvedorDeLocalizacao {
  obterGeolocalizacao(): Coordenada;
}
