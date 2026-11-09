/** Roda o exemplo ANTES: uma classe só faz tudo. */

import type { Agendamento } from './agendamento-type';
import { CheckinService } from './checkin-service';

const agora = new Date();
const agendamento: Agendamento = {
  id: 'ag-1',
  usuarioNome: 'Maria',
  usuarioTelefone: '+55 11 90000-0000',
  dataHora: new Date(agora.getTime() + 10 * 60_000), // daqui a 10 min
};

new CheckinService().realizarCheckin(agendamento, agora);
