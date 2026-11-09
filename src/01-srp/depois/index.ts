/**
 * Roda o exemplo DEPOIS: cada classe faz uma coisa só.
 * Aqui a gente "contrata a equipe" e entrega para o gerente.
 */

import type { Agendamento } from './agendamento-type';
import { CheckinRepository } from './checkin-repository';
import { CheckinService } from './checkin-service';
import { Logger } from './logger';
import { NotificadorCheckin } from './notificador-checkin';
import { RegrasDeCheckin } from './regras-de-checkin';

const repo = new CheckinRepository();
const service = new CheckinService(
  new RegrasDeCheckin(repo),
  repo,
  new NotificadorCheckin(),
  new Logger(),
);

const agora = new Date();
const agendamento: Agendamento = {
  id: 'ag-1',
  usuarioNome: 'Maria',
  usuarioTelefone: '+55 11 90000-0000',
  dataHora: new Date(agora.getTime() + 10 * 60_000),
};

service.realizarCheckin(agendamento, agora);

try {
  service.realizarCheckin(agendamento, agora); // segunda vez -> deve falhar
} catch (e) {
  console.log('Erro esperado:', (e as Error).message);
}
