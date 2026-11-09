import type { Logger } from '../portas/logger-interface';

/** Peça real: escreve o log na tela. */
export class ConsoleLogger implements Logger {
  info(mensagem: string): void {
    console.log(`  [LOG] ${mensagem}`);
  }
}
