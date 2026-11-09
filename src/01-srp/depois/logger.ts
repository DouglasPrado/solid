/**
 * ✅ O ANOTADOR: só escreve no log.
 * Quer mandar o log para outro lugar? Só mexe aqui.
 */
export class Logger {
  info(mensagem: string): void {
    console.log(`[LOG ${new Date().toISOString()}] ${mensagem}`);
  }
}
