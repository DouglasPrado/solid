import type { MetodoCheckin } from './metodo-checkin-type';

/** Os dados que chegam no check-in. Tem campos de todos os métodos; cada método usa só alguns. */
export type DadosCheckin = {
  metodo: MetodoCheckin;
  qrCodeLido?: string;
  latitude?: number;
  longitude?: number;
  atendenteId?: string;
};
