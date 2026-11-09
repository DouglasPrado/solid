/** Roda o exemplo ANTES: o celular é obrigado a "saber imprimir" e dá erro. */

import { AppMobile } from './app-mobile';
import type { PontoDeCheckin } from './ponto-de-checkin-interface';
import { Totem } from './totem';

function emitirComprovante(ponto: PontoDeCheckin, agendamentoId: string) {
  // O editor não reclama de nada... mas na hora de rodar, o celular tenta imprimir e dá erro.
  ponto.imprimirComprovante(agendamentoId);
}

emitirComprovante(new Totem(), 'ag-1');
try {
  emitirComprovante(new AppMobile(), 'ag-2');
} catch (e) {
  console.log('💥', (e as Error).message);
}
