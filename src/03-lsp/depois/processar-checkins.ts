import type { Checkin } from './checkin-interface';

/**
 * ✅ Funciona com qualquer tipo de check-in.
 * Não precisa perguntar "você é online?" nem se proteger de erro.
 */
export function processarCheckins(checkins: Checkin[]): void {
  for (const c of checkins) {
    console.log(c.concluir());
  }
}
