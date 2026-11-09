# I — Segregação de Interfaces

## Em uma frase

> **Não obrigue ninguém a ter "botões" que não usa.**

Melhor várias listas pequenas de obrigações do que uma lista gigante.

## Exemplo do dia a dia

Pense num **controle remoto com 50 botões**, em que metade não faz nada na sua TV.
Você aperta "Netflix", nada acontece… quebrou? É assim mesmo? Ninguém sabe.

Um controle bom tem **só os botões que funcionam** naquela TV.

## No nosso check-in

O check-in pode ser feito em dois aparelhos:

| Aparelho          | Lê QR Code | Tem GPS | Imprime | Manda notificação |
| ----------------- | :--------: | :-----: | :-----: | :---------------: |
| Totem da recepção |    Sim     |   Não   |   Sim   |        Não        |
| App no celular    |    Sim     |   Sim   |   Não   |        Sim        |

### Antes — `antes/`

Uma lista única de obrigações para **todo** aparelho:

```ts
interface PontoDeCheckin {
  lerQRCode();
  obterGeolocalizacao();
  imprimirComprovante();
  enviarPush();
}
```

Resultado:

- O **totem** é obrigado a ter "GPS" → dá erro. E "notificação" → não faz nada, em silêncio.
- O **celular** é obrigado a ter "impressora" → dá erro.
- O editor **não avisa nada**. O erro só aparece quando o sistema está rodando.

### Depois — `depois/`

Quebramos em **habilidades pequenas**:

```ts
interface LeitorQRCode {
  lerQRCode();
}
interface ProvedorDeLocalizacao {
  obterGeolocalizacao();
}
interface Impressora {
  imprimirComprovante();
}
interface NotificadorPush {
  enviarPush();
}
```

Cada aparelho diz **só o que sabe fazer**:

```ts
class Totem implements LeitorQRCode, Impressora { ... }
class AppMobile implements LeitorQRCode, ProvedorDeLocalizacao, NotificadorPush { ... }
```

E cada função pede **só o que precisa**:

```ts
function emitirComprovante(impressora: Impressora) { ... }

emitirComprovante(totem); // ok
emitirComprovante(app); // o editor já sublinha em vermelho: "celular não é impressora"
```

O erro que antes aparecia **com o sistema rodando** agora aparece **enquanto você digita**.

## Como saber se estou fazendo errado?

- Uma classe tem método que só faz `throw new Error('não suportado')`.
- Uma classe tem método **vazio**, só porque a interface obrigou.
- Você muda uma interface e precisa mexer em classes que **nem usam** aquele método.

> Este princípio anda junto com o **L**: interfaces grandes demais costumam gerar classes que "não cumprem a promessa".

## Arquivos

```
04-isp/
├── antes/
│   ├── ponto-de-checkin-interface.ts         ← a lista gigante de obrigações
│   ├── totem.ts
│   ├── app-mobile.ts
│   ├── coordenada-type.ts
│   └── index.ts
└── depois/
    ├── leitor-qrcode-interface.ts            ← habilidade pequena
    ├── provedor-de-localizacao-interface.ts  ← habilidade pequena
    ├── impressora-interface.ts               ← habilidade pequena
    ├── notificador-push-interface.ts         ← habilidade pequena
    ├── totem.ts
    ├── app-mobile.ts
    ├── coordenada-type.ts
    └── index.ts
```

## Rodando

```bash
npm run isp:antes # o celular tenta imprimir e dá erro
npm run isp:depois
```
