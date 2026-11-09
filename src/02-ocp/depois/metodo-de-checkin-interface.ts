import type { DadosCheckin } from './dados-checkin-type';
import type { Unidade } from './unidade-type';

/**
 * ✅ O "ENCAIXE PADRÃO" de todo método de check-in.
 *
 * Pense na loja de apps: todo app segue o mesmo padrão, e por isso
 * o celular roda qualquer app novo sem precisar ser modificado.
 *
 * Aqui a regra é simples. Todo método de check-in precisa ter:
 *   - um nome (ex.: 'QRCODE')
 *   - uma função validar() que responde sim (true) ou não (false)
 */
export interface MetodoDeCheckin {
  readonly nome: string;
  validar(dados: DadosCheckin, unidade: Unidade): boolean;
}
