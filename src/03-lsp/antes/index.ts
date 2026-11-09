/** Roda o exemplo ANTES: vai dar erro quando chegar no check-in online. */

import { CheckinOnline } from './checkin-online';
import { CheckinPresencial } from './checkin-presencial';
import { processarCheckins } from './processar-checkins';

try {
  processarCheckins([new CheckinPresencial('ag-1'), new CheckinOnline('ag-2')]);
} catch (e) {
  console.log('💥 Quebrou ao substituir a base pela subclasse:', (e as Error).message);
}

// E o "conserto" mais comum deixa tudo pior:
//   if (c instanceof CheckinOnline) { pula } else { faz }
// Agora TODO lugar que usa Checkin precisa lembrar dessa exceção.
