/** Roda o exemplo DEPOIS: presencial e online passam pela mesma função, sem erro. */

import { CheckinOnline } from './checkin-online';
import { CheckinPresencial } from './checkin-presencial';
import { processarCheckins } from './processar-checkins';

processarCheckins([
  new CheckinPresencial('ag-1', { latitude: -23.5505, longitude: -46.6333 }),
  new CheckinOnline('ag-2', 'https://exemplo.com/sala/ag-2'),
]);
