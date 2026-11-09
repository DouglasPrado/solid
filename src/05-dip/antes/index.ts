/** Roda o exemplo ANTES: o serviço cria o banco e o WhatsApp sozinho. */

import { CheckinService } from './checkin-service';

new CheckinService().realizarCheckin('ag-1', '+55 11 90000-0000');

// Pergunta: como testar isso sem banco de verdade e sem mandar WhatsApp de verdade?
// Resposta: não dá. As peças estão "soldadas" dentro da classe.
