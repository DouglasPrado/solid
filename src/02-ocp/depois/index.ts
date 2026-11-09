/**
 * Roda o exemplo DEPOIS.
 * Para ativar o método novo (NFC), basta colocar ele na lista abaixo.
 */

import { CheckinPelaRecepcao } from './checkin-pela-recepcao';
import { CheckinPorGeolocalizacao } from './checkin-por-geolocalizacao';
import { CheckinPorNfc } from './checkin-por-nfc';
import { CheckinPorQRCode } from './checkin-por-qrcode';
import type { Unidade } from './unidade-type';
import { ValidadorDeCheckin } from './validador-de-checkin';

const unidade: Unidade = { qrCode: 'UNIDADE-123', latitude: -23.5505, longitude: -46.6333 };

const validador = new ValidadorDeCheckin([
  new CheckinPorQRCode(),
  new CheckinPorGeolocalizacao(),
  new CheckinPelaRecepcao(),
  new CheckinPorNfc(), // <- método novo: só colocar na lista
]);

console.log('QR Code:', validador.validar({ metodo: 'QRCODE', qrCodeLido: 'UNIDADE-123' }, unidade));
console.log('Geo:', validador.validar({ metodo: 'GEOLOCALIZACAO', latitude: -23.5505, longitude: -46.6334 }, unidade));
console.log('Recepção:', validador.validar({ metodo: 'RECEPCAO', atendenteId: 'at-9' }, unidade));
console.log('NFC:', validador.validar({ metodo: 'NFC', pulseiraNfc: 'NFC-777' }, unidade));
