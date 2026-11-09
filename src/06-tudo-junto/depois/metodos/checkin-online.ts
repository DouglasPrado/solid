import type { MetodoDeCheckin } from './metodo-de-checkin-interface';
import type { ProvaOnline } from './prova-online-type';

/** ✅ (L) Check-in online. Não finge ter GPS: a prova dele é o código da sala virtual. */
export class CheckinOnline implements MetodoDeCheckin<ProvaOnline> {
  readonly nome = 'ONLINE';

  validar(prova: ProvaOnline): boolean {
    return prova.tokenSala.length > 0;
  }
}
