/**
 * ❌ (I) Um formulário com campos de TODOS os métodos, quase todos opcionais.
 * O editor não sabe quais campos cada método realmente precisa.
 */
export type DadosCheckin = {
  agendamentoId: string;
  usuarioNome: string;
  usuarioTelefone: string;
  dataHoraAgendamento: Date;
  metodo: 'QRCODE' | 'GEOLOCALIZACAO' | 'ONLINE';
  qrCodeLido?: string;
  latitude?: number;
  longitude?: number;
};
