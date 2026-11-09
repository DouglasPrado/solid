/**
 * Aqui a gente "monta a equipe" e liga as peças nas tomadas.
 * É o ÚNICO arquivo que escolhe quais peças reais usar.
 */

import { RealizarCheckin } from './casos-de-uso/realizar-checkin';
import type { Agendamento } from './dominio/agendamento-type';
import { JanelaDeCheckin } from './dominio/janela-de-checkin';
import { ConsoleLogger } from './infra/console-logger';
import { InMemoryCheckinRepository } from './infra/in-memory-checkin-repository';
import { WhatsAppNotificador } from './infra/whatsapp-notificador';
import { CheckinOnline } from './metodos/checkin-online';
import { CheckinPorGeolocalizacao } from './metodos/checkin-por-geolocalizacao';
import { CheckinPorQRCode } from './metodos/checkin-por-qrcode';

const emMinutos = (min: number) => new Date(Date.now() + min * 60_000);

const agendamento = (id: string): Agendamento => ({
  id,
  usuarioNome: 'Maria',
  usuarioContato: '+55 11 90000-0000',
  dataHora: emMinutos(10),
});

async function main() {
  const realizarCheckin = new RealizarCheckin(
    new JanelaDeCheckin(),
    new InMemoryCheckinRepository(),
    new WhatsAppNotificador(),
    new ConsoleLogger(),
  );

  const qrCode = new CheckinPorQRCode('UNIDADE-123');
  const geo = new CheckinPorGeolocalizacao({ latitude: -23.5505, longitude: -46.6333 });
  const online = new CheckinOnline();

  await realizarCheckin.executar(agendamento('ag-1'), qrCode, { qrCode: 'UNIDADE-123' });
  await realizarCheckin.executar(agendamento('ag-2'), geo, { latitude: -23.5505, longitude: -46.6334 });
  await realizarCheckin.executar(agendamento('ag-3'), online, { tokenSala: 'abc' });

  // Tente tirar o comentário da linha abaixo:
  // o editor não deixa mandar posição de GPS para o check-in por QR Code.
  // await realizarCheckin.executar(agendamento('ag-4'), qrCode, { latitude: 0, longitude: 0 }); // ❌ não compila

  try {
    await realizarCheckin.executar(agendamento('ag-1'), qrCode, { qrCode: 'UNIDADE-123' });
  } catch (e) {
    console.log('  Erro esperado:', (e as Error).message);
  }
}

main();
