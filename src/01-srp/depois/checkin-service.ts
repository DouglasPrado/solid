import type { Agendamento } from './agendamento-type';
import type { CheckinRepository } from './checkin-repository';
import type { Logger } from './logger';
import type { NotificadorCheckin } from './notificador-checkin';
import type { RegrasDeCheckin } from './regras-de-checkin';

/**
 * ✅ O GERENTE: não faz o trabalho, só diz quem faz o quê e em que ordem.
 *   1. o fiscal confere
 *   2. o arquivista guarda
 *   3. o carteiro avisa
 *   4. o anotador registra
 * Lendo o método abaixo você entende o processo inteiro em 4 linhas.
 */
export class CheckinService {
  constructor(
    private readonly regras: RegrasDeCheckin,
    private readonly repo: CheckinRepository,
    private readonly notificador: NotificadorCheckin,
    private readonly logger: Logger,
  ) {}

  realizarCheckin(agendamento: Agendamento, agora: Date): void {
    this.regras.validar(agendamento, agora);
    this.repo.salvar({ agendamentoId: agendamento.id, realizadoEm: agora });
    this.notificador.confirmar(agendamento);
    this.logger.info(`checkin agendamento=${agendamento.id}`);
  }
}
