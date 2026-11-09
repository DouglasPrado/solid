/** Roda o exemplo ANTES: um switch com todos os métodos dentro da mesma classe. */

import { ValidadorDeCheckin } from './validador-de-checkin';

const validador = new ValidadorDeCheckin();
console.log('QR Code:', validador.validar({ metodo: 'QRCODE', qrCodeLido: 'UNIDADE-123' }));
console.log('Geo:', validador.validar({ metodo: 'GEOLOCALIZACAO', latitude: -23.5505, longitude: -46.6334 }));
console.log('Recepção:', validador.validar({ metodo: 'RECEPCAO', atendenteId: 'at-9' }));
