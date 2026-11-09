import type { Checkin } from './checkin';

/**
 * Esta função confia que todo Checkin tem lugar no mapa e catraca,
 * porque a classe mãe prometeu isso.
 */
export function processarCheckins(checkins: Checkin[]): void {
  for (const c of checkins) {
    const loc = c.obterLocalizacao();
    console.log(`Check-in ${c.agendamentoId} em (${loc.latitude}, ${loc.longitude})`);
    console.log(c.liberarCatraca());
  }
}
