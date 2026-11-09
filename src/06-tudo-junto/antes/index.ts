/** Roda o exemplo ANTES: a classe faz-tudo. */

import { CheckinService } from './checkin-service';

const emMinutos = (min: number) => new Date(Date.now() + min * 60_000);
const service = new CheckinService();

service.realizar({
  agendamentoId: 'ag-1',
  usuarioNome: 'Maria',
  usuarioTelefone: '+55 11 90000-0000',
  dataHoraAgendamento: emMinutos(10),
  metodo: 'QRCODE',
  qrCodeLido: 'UNIDADE-123',
});

// ⚠️ O editor aceita mandar latitude para um check-in por QR Code.
// O erro só aparece quando o programa roda.
try {
  service.realizar({
    agendamentoId: 'ag-2',
    usuarioNome: 'Maria',
    usuarioTelefone: '+55 11 90000-0000',
    dataHoraAgendamento: emMinutos(10),
    metodo: 'QRCODE',
    latitude: -23.5505,
  });
} catch (e) {
  console.log('  💥 Só descobrimos o erro com o programa rodando:', (e as Error).message);
}
