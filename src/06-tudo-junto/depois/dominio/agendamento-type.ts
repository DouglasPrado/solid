/** Os dados de um agendamento: quem é, como falar com a pessoa e o horário. */
export type Agendamento = {
  id: string;
  usuarioNome: string;
  usuarioContato: string;
  dataHora: Date;
};
