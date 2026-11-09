/** Um check-in realizado: de qual agendamento, por qual método e quando. */
export type Checkin = {
  agendamentoId: string;
  metodo: string;
  realizadoEm: Date;
};
