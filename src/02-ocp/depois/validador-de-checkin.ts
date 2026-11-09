import type { DadosCheckin } from './dados-checkin-type';
import type { MetodoDeCheckin } from './metodo-de-checkin-interface';
import type { Unidade } from './unidade-type';

/**
 * ✅ O VALIDADOR não conhece nenhum método específico.
 *
 * Ele recebe uma lista de métodos e, na hora de validar,
 * procura o método pelo nome e pergunta: "isso é válido?".
 *
 * Por isso ele NUNCA precisa ser editado quando surge um método novo.
 */
export class ValidadorDeCheckin {
  private readonly metodos = new Map<string, MetodoDeCheckin>();

  constructor(metodos: MetodoDeCheckin[]) {
    metodos.forEach((m) => this.metodos.set(m.nome, m));
  }

  validar(dados: DadosCheckin, unidade: Unidade): boolean {
    const metodo = this.metodos.get(dados.metodo);
    if (!metodo) throw new Error(`Método de check-in não suportado: ${dados.metodo}`);
    return metodo.validar(dados, unidade);
  }
}
