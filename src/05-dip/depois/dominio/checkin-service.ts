import type { CheckinRepository } from './checkin-repository-interface';
import type { Notificador } from './notificador-interface';

/**
 * ✅ A classe não cria mais as peças: ela RECEBE as peças prontas (no construtor).
 * Ela só sabe que vai receber "algo que salva" e "algo que avisa".
 *
 * Como um abajur com plugue: liga em qualquer tomada
 * e muda de lugar sem chamar eletricista.
 *
 * Repare: este arquivo não importa nada da pasta infra/.
 */
export class CheckinService {
  constructor(
    private readonly repo: CheckinRepository,
    private readonly notificador: Notificador,
  ) {}

  realizarCheckin(agendamentoId: string, destino: string): void {
    this.repo.salvar(agendamentoId, new Date());
    this.notificador.enviar(destino, 'Seu check-in foi confirmado!');
  }
}
