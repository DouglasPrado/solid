# L — Substituição de Liskov

## Em uma frase

> **Se uma classe diz que é "filha" de outra, ela tem que cumprir TUDO o que a "mãe" promete.**

O nome vem de Barbara Liskov, a cientista que descreveu a ideia.

## 🚗 Exemplo do dia a dia

Você vai numa locadora e aluga **"um carro"**. Não importa o modelo: você espera que ele **ligue, acelere e freie**.

Agora imagine que te entregam um carro que, ao frear, mostra:
_"Erro: este modelo não tem freio."_ 💥

O problema **não é seu**. Esse veículo **não deveria estar na locadora como "carro"**, porque não cumpre o que todo carro promete.

## 📍 No nosso check-in

Todo check-in era presencial: tinha **lugar no mapa** e **catraca**.
Então surgiu o check-in **online** (atendimento por vídeo).

### ❌ Antes — `antes/`

Alguém fez o online ser "filho" do check-in normal:

```ts
class Checkin {
  obterLocalizacao() { ... }  // a mãe promete: "todo check-in tem lugar"
  liberarCatraca()  { ... }   // a mãe promete: "todo check-in tem catraca"
}

class CheckinOnline extends Checkin {
  obterLocalizacao() { throw new Error('Online não tem localização!'); } // 💥
  liberarCatraca()  { throw new Error('Online não tem catraca!'); }      // 💥
}
```

Uma função que processa "qualquer check-in" funciona com o presencial… e **quebra** com o online.

E o "conserto" mais comum piora tudo:

```ts
if (c instanceof CheckinOnline) { pula } else { faz }
```

Agora **todo lugar** do sistema precisa lembrar dessa exceção.

### ✅ Depois — `depois/`

Fizemos um **combinado** com só o que **todos** conseguem cumprir:

```ts
interface Checkin {
  agendamentoId: string;
  concluir(): string;   // todo check-in sabe se concluir
}
```

- O **presencial** conclui do jeito dele: registra o lugar e libera a catraca.
- O **online** conclui do jeito dele: libera a sala virtual.
- Ninguém dá erro, e a função que processa os check-ins **não precisa perguntar o tipo**:

```ts
for (const c of checkins) {
  console.log(c.concluir()); // funciona com qualquer um
}
```

## 🤔 Como saber se estou fazendo errado?

- Uma classe filha tem método que só faz `throw new Error('não suportado')`.
- Uma classe filha tem método **vazio**, que "finge" que fez algo.
- Aparece `instanceof` ou `if (tipo === ...)` para tratar uma filha diferente.

> 💡 **Dica:** "online **é um** check-in" é verdade no mundo real, mas isso não garante que a herança está certa no código.
> A pergunta certa é: **"ele funciona em TODO lugar onde a mãe funciona?"**

## 📁 Arquivos

```
03-lsp/
├── antes/
│   ├── checkin.ts            ← a "mãe" que promete demais
│   ├── checkin-presencial.ts
│   ├── checkin-online.ts     ← 💥 a "filha" que não cumpre
│   ├── processar-checkins.ts
│   ├── coordenada-type.ts
│   └── index.ts
└── depois/
    ├── checkin-interface.ts  ← o combinado que todos cumprem
    ├── checkin-presencial.ts
    ├── checkin-online.ts
    ├── processar-checkins.ts
    ├── coordenada-type.ts
    └── index.ts
```

## ▶️ Rodando

```bash
npm run lsp:antes    # vai mostrar o erro
npm run lsp:depois   # funciona com os dois
```
