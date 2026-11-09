/**
 * ✅ O encaixe padrão de todo método de check-in.
 *
 *   O → método novo = arquivo novo. Ninguém mais é editado.
 *   L → todos respondem só "sim ou não". Nenhum dá erro de "não sei fazer isso".
 *   I → cada método diz exatamente qual "prova" precisa (TProva):
 *       QR Code pede o código, GPS pede a posição, online pede o token da sala.
 */
export interface MetodoDeCheckin<TProva = unknown> {
  readonly nome: string;
  validar(prova: TProva): boolean;
}
