/** Os dados de um agendamento: quem é, telefone e horário marcado. */
export type Agendamento = {
  id: string;
  usuarioNome: string;
  usuarioTelefone: string;
  dataHora: Date;
};
