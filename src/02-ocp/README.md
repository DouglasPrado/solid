# O — Aberto/Fechado

## Em uma frase

> **Para adicionar algo novo, crie código novo em vez de editar o que já funciona.**

("Aberto" para coisas novas, "fechado" para mexer no que já existe.)

## Exemplo do dia a dia

Quando você instala um app novo no celular, você **não abre o celular com chave de fenda**.
O celular tem um "encaixe padrão" para apps: qualquer app que siga o padrão funciona.

- Instalar app novo = **criar** algo novo
- Abrir o celular e soldar peça = **editar** o que já funciona

## No nosso check-in

Dá para fazer check-in de 3 jeitos: **QR Code**, **GPS** ou **pela recepção**.
Aí chega o pedido: _"agora queremos check-in por **pulseira NFC**"_.

### Antes — `antes/`

Todos os jeitos ficam num `switch` dentro de uma classe só:

```ts
switch (dados.metodo) {
  case 'QRCODE':         ...
  case 'GEOLOCALIZACAO': ...
  case 'RECEPCAO':       ...
  // NFC? Abre o arquivo e escreve mais um case aqui...
}
```

**Por que isso é ruim?**

- Para colocar NFC, você **abre e edita** uma classe que já estava funcionando.
- Se errar uma vírgula no case novo, pode quebrar o QR Code, que não tinha nada a ver.
- Com o tempo, o `switch` vira um monstro de 500 linhas.

### Depois — `depois/`

1. Criamos um **encaixe padrão** (`MetodoDeCheckin`): todo método precisa ter um `nome` e um `validar()`.
2. Cada jeito de fazer check-in virou **uma classe, num arquivo próprio**.
3. O `ValidadorDeCheckin` recebe uma lista e só pergunta: _"esse método diz que é válido?"_

Para adicionar NFC:

```ts
// 1. Cria o arquivo checkin-por-nfc.ts
export class CheckinPorNfc implements MetodoDeCheckin { ... }

// 2. Coloca na lista (no index.ts)
new ValidadorDeCheckin([
  new CheckinPorQRCode(),
  new CheckinPorGeolocalizacao(),
  new CheckinPelaRecepcao(),
  new CheckinPorNfc(), // ← pronto!
]);
```

**Nenhuma linha dos métodos antigos nem do validador foi alterada.** É só "instalar o app".

## Como saber se estou fazendo errado?

- Existe um `switch` ou um monte de `if` perguntando o **tipo** de alguma coisa.
- Toda funcionalidade nova obriga a mexer **no mesmo arquivo central**.
- Você tem medo de mexer naquele arquivo porque "tudo depende dele".

## Arquivos

```
02-ocp/
├── antes/
│   ├── metodo-checkin-type.ts          ← lista de métodos que vive sendo editada
│   ├── dados-checkin-type.ts
│   ├── unidade.ts
│   ├── validador-de-checkin.ts         ← o switch gigante
│   └── index.ts
└── depois/
    ├── metodo-de-checkin-interface.ts  ← o "encaixe padrão"
    ├── checkin-por-qrcode.ts
    ├── checkin-por-geolocalizacao.ts
    ├── checkin-pela-recepcao.ts
    ├── checkin-por-nfc.ts              ← o método novo (só criamos este arquivo)
    ├── validador-de-checkin.ts         ← nunca mais precisa ser editado
    ├── dados-checkin-type.ts
    ├── unidade-type.ts
    └── index.ts
```
