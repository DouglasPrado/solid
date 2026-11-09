import type { Agendamento } from '../dominio/agendamento-type';
import type { JanelaDeCheckin } from '../dominio/janela-de-checkin';
import type { MetodoDeCheckin } from '../metodos/metodo-de-checkin-interface';
import type { CheckinRepository } from '../portas/checkin-repository-interface';
import type { Logger } from '../portas/logger-interface';
import type { Notificador } from '../portas/notificador-interface';

/**
 * ✅ O GERENTE do check-in: só coordena, não faz o trabalho pesado.
 *
 *   S → não confere horário, não sabe SQL, não sabe enviar WhatsApp
 *   O → não tem switch: recebe o método pronto
 *   L → trata todo método do mesmo jeito
 *   I → usa "tomadas" pequenas e específicas
 *   D → recebe as peças prontas no construtor
 */
export class RealizarCheckin {
  constructor(
    private readonly janela: JanelaDeCheckin,
    private readonly repo: CheckinRepository,
    private readonly notificador: Notificador,
    private readonly logger: Logger,
  ) {}

  async executar<TProva>(
    agendamento: Agendamento,
    metodo: MetodoDeCheckin<TProva>,
    prova: TProva,
    agora = new Date(),
  ): Promise<void> {
    this.janela.validar(agendamento, agora);

    if (await this.repo.existeParaAgendamento(agendamento.id)) {
      throw new Error('Check-in já realizado');
    }
    if (!metodo.validar(prova)) {
      throw new Error(`Prova de check-in inválida (${metodo.nome})`);
    }

    await this.repo.salvar({ agendamentoId: agendamento.id, metodo: metodo.nome, realizadoEm: agora });
    await this.notificador.enviar(
      agendamento.usuarioContato,
      `Olá ${agendamento.usuarioNome}, check-in confirmado!`,
    );
    this.logger.info(`checkin ${agendamento.id} via ${metodo.nome}`);
  }
}
