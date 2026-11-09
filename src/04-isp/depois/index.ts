/** Roda o exemplo DEPOIS: cada aparelho só tem os "botões" que funcionam. */

import { AppMobile } from './app-mobile';
import type { Impressora } from './impressora-interface';
import type { LeitorQRCode } from './leitor-qrcode-interface';
import type { NotificadorPush } from './notificador-push-interface';
import { Totem } from './totem';

// Cada função pede só o que precisa.
// Quem quer imprimir pede "uma impressora", e não "um aparelho que faz tudo".
function emitirComprovante(impressora: Impressora, agendamentoId: string) {
  impressora.imprimirComprovante(agendamentoId);
}

function avisarUsuario(notificador: NotificadorPush, mensagem: string) {
  notificador.enviarPush(mensagem);
}

function lerCodigoDaUnidade(leitor: LeitorQRCode) {
  return leitor.lerQRCode();
}

const totem = new Totem();
const app = new AppMobile();

console.log('Totem leu:', lerCodigoDaUnidade(totem));
console.log('App leu:', lerCodigoDaUnidade(app));
emitirComprovante(totem, 'ag-1');
avisarUsuario(app, 'Check-in confirmado!');

// Tente tirar o comentário da linha abaixo:
// emitirComprovante(app, 'ag-2');
// O editor sublinha em vermelho na hora: "celular não é impressora".
// Antes, esse erro só aparecia com o sistema rodando.
