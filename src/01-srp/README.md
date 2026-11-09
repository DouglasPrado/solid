# S — Responsabilidade Única

## Em uma frase

> **Cada classe cuida de UM assunto só.**

## 🍽️ Exemplo do dia a dia

Imagine um restaurante com **um único funcionário** que cozinha, atende, cobra e lava a louça.

- Mudou o cardápio? É ele que precisa reaprender.
- Trocou a maquininha de cartão? Ele de novo.
- Ele ficou doente? **Para tudo.**

Agora imagine o restaurante organizado:

| Pessoa     | Faz o quê         |
| ---------- | ----------------- |
| Cozinheiro | Cozinha           |
| Garçom     | Atende            |
| Caixa      | Cobra             |
| Gerente    | Organiza a equipe |

Mudou o cardápio? Só o cozinheiro precisa saber. **Cada mudança afeta uma pessoa só.**

## 📍 No nosso check-in

Quando alguém faz check-in, o sistema precisa:

1. conferir o horário (não pode cedo demais nem atrasado demais)
2. guardar o check-in
3. avisar a pessoa pelo WhatsApp
4. anotar no log

### ❌ Antes — `antes/`

Uma classe só (`CheckinService`) faz as 4 coisas:

```ts
realizarCheckin() {
  // confere horário...
  // guarda no banco...
  // manda WhatsApp...
  // escreve log...
}
```

**Por que isso é ruim?**

| Se alguém pedir…                | Onde precisa mexer? |
| ------------------------------- | ------------------- |
| "Deixa fazer check-in 1h antes" | `CheckinService`    |
| "Troca o banco de dados"        | `CheckinService`    |
| "Muda o texto do WhatsApp"      | `CheckinService`    |
| "Manda o log pra outro lugar"   | `CheckinService`    |

Sempre o mesmo arquivo. Quem mexe no texto do WhatsApp pode, sem querer, quebrar a regra de horário.

### ✅ Depois — `depois/`

Dividimos o trabalho, igual ao restaurante:

| Classe               | Apelido         | Faz o quê           |
| -------------------- | --------------- | ------------------- |
| `RegrasDeCheckin`    | 👮 o fiscal     | Confere as regras   |
| `CheckinRepository`  | 🗄️ o arquivista | Guarda os check-ins |
| `NotificadorCheckin` | 📬 o carteiro   | Avisa a pessoa      |
| `Logger`             | 📝 o anotador   | Escreve o log       |
| `CheckinService`     | 👔 o gerente    | Diz quem faz o quê  |

O gerente fica assim — dá para entender o processo inteiro em 4 linhas:

```ts
realizarCheckin(agendamento, agora) {
  this.regras.validar(agendamento, agora);   // fiscal confere
  this.repo.salvar(...);                     // arquivista guarda
  this.notificador.confirmar(agendamento);   // carteiro avisa
  this.logger.info(...);                     // anotador registra
}
```

## 🤔 Como saber se estou fazendo errado?

- Para explicar o que a classe faz, você usa a palavra **"e"** várias vezes ("ela valida **e** salva **e** envia **e**…").
- O arquivo é alterado por motivos que não têm nada a ver um com o outro.
- Para testar uma coisinha, você precisa preparar todo o resto.

> ⚠️ **Cuidado:** não é "uma classe com um método só". É "uma classe com **um assunto** só". Separar demais também atrapalha.

## 📁 Arquivos

```
01-srp/
├── antes/
│   ├── agendamento-type.ts
│   ├── checkin-service.ts      ← faz tudo
│   └── index.ts
└── depois/
    ├── agendamento-type.ts
    ├── checkin-type.ts
    ├── regras-de-checkin.ts    ← 👮 fiscal
    ├── checkin-repository.ts   ← 🗄️ arquivista
    ├── notificador-checkin.ts  ← 📬 carteiro
    ├── logger.ts               ← 📝 anotador
    ├── checkin-service.ts      ← 👔 gerente
    └── index.ts
```

## ▶️ Rodando

```bash
npm run srp:antes
npm run srp:depois
```
