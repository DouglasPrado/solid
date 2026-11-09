/**
 * Aqui é onde a gente "liga os aparelhos na tomada".
 * É o ÚNICO arquivo que escolhe quais peças reais usar.
 *
 * Veja: o MESMO CheckinService funciona com WhatsApp, com e-mail e com peças de teste.
 */

import { CheckinService } from './dominio/checkin-service';
import { InMemoryCheckinRepository } from './fakes/in-memory-checkin-repository';
import { NotificadorSpy } from './fakes/notificador-spy';
import { EmailNotificador } from './infra/email-notificador';
import { PostgresCheckinRepository } from './infra/postgres-checkin-repository';
import { WhatsAppNotificador } from './infra/whatsapp-notificador';

console.log('--- Produção (Postgres + WhatsApp) ---');
new CheckinService(new PostgresCheckinRepository(), new WhatsAppNotificador()).realizarCheckin(
  'ag-1',
  '+55 11 90000-0000',
);

console.log('\n--- Trocar canal para e-mail: zero mudança no CheckinService ---');
new CheckinService(new PostgresCheckinRepository(), new EmailNotificador()).realizarCheckin(
  'ag-2',
  'usuario@exemplo.com',
);

console.log('\n--- Teste unitário com fakes ---');
const repoFake = new InMemoryCheckinRepository();
const notificadorSpy = new NotificadorSpy();
new CheckinService(repoFake, notificadorSpy).realizarCheckin('ag-3', 'qualquer');

console.assert(repoFake.salvos.includes('ag-3'), 'deveria ter salvo o check-in');
console.assert(notificadorSpy.enviados.length === 1, 'deveria ter notificado uma vez');
console.log('✅ Teste passou:', { salvos: repoFake.salvos, enviados: notificadorSpy.enviados });
