# D — Inversão de Dependência

## Em uma frase

> **A regra de negócio não escolhe as peças: ela recebe as peças prontas, por um "encaixe padrão".**

## 🔌 Exemplo do dia a dia

Pense num **abajur**.

- ❌ **Jeito errado:** o fio do abajur é **soldado** direto na fiação da parede.
  Quer mudar ele de lugar? Chama o eletricista. Quer testar a lâmpada? Precisa da parede inteira.
- ✅ **Jeito certo:** o abajur tem **plugue** e a parede tem **tomada**.
  Liga em qualquer tomada, muda de lugar quando quiser, testa em qualquer lugar.

A **tomada** é o "encaixe padrão". O abajur não sabe (nem quer saber) de onde vem a energia.

## 📍 No nosso check-in

Quando alguém faz check-in, o sistema **guarda no banco** e **avisa pelo WhatsApp**.

### ❌ Antes — `antes/`

A classe cria sozinha as peças que usa — fio soldado na parede:

```ts
class CheckinService {
  private db = new PostgresClient();   // ⚠️ soldado
  private whatsapp = new WhatsAppApi(); // ⚠️ soldado
}
```

**Por que isso é ruim?**

- Quer trocar WhatsApp por e-mail? **Edita a classe.**
- Quer testar? Precisa de **banco de verdade** e vai **mandar WhatsApp de verdade**.

### ✅ Depois — `depois/`

**1. Criamos as "tomadas"** (o que a regra de negócio precisa, sem dizer como):

```ts
interface CheckinRepository { salvar(...) }   // "preciso de algo que guarde"
interface Notificador       { enviar(...) }   // "preciso de algo que avise"
```

**2. A classe recebe as peças prontas** (no construtor), em vez de criar:

```ts
class CheckinService {
  constructor(repo: CheckinRepository, notificador: Notificador) {}
}
```

**3. Qualquer peça com o "plugue certo" encaixa:**

```ts
new CheckinService(new PostgresCheckinRepository(), new WhatsAppNotificador()); // produção
new CheckinService(new PostgresCheckinRepository(), new EmailNotificador());    // trocou para e-mail
new CheckinService(new InMemoryCheckinRepository(), new NotificadorSpy());      // teste
```

O `CheckinService` é **o mesmo** nos três casos. Nenhuma linha dele mudou.

### Por que o nome é "inversão"?

```
ANTES:  CheckinService ──usa──▶ PostgresClient
        (a regra de negócio depende da peça)

DEPOIS: CheckinService ──usa──▶ «tomada» ◀──encaixa── PostgresCheckinRepository
        (a peça é que se adapta à regra de negócio)
```

A seta que antes ia **da regra para a peça** agora vai **da peça para a regra**. Ela foi **invertida**.

## 🧪 Bônus: teste fica fácil

Na pasta `fakes/` há duas peças de mentira:

- `InMemoryCheckinRepository` — finge ser um banco, guardando numa lista.
- `NotificadorSpy` — em vez de enviar, só anota o que teria enviado.

Assim dá para testar o check-in **sem banco e sem WhatsApp de verdade**.

## 🤔 Como saber se estou fazendo errado?

- Sua regra de negócio tem `new` de banco, de cliente HTTP ou de SDK lá dentro.
- Para testar uma regra simples, você precisa subir banco ou chamar API externa.
- Trocar de fornecedor (ex.: Twilio → Zenvia) obriga a mexer na regra de negócio.

> 💡 **Palavras que você vai ouvir por aí:**
> - **Injeção de dependência** = entregar as peças prontas pelo construtor (o que fizemos aqui).
> - **Container de DI** (NestJS, tsyringe…) = ferramenta que faz essa entrega automaticamente.

## 📁 Arquivos

```
05-dip/
├── antes/
│   ├── checkin-service.ts                   ← cria as peças sozinho ("soldado")
│   ├── postgres-client.ts
│   ├── whatsapp-api.ts
│   └── index.ts
└── depois/
    ├── dominio/                             ← a regra de negócio e as "tomadas"
    │   ├── checkin-service.ts
    │   ├── checkin-repository-interface.ts  ← tomada "guardar"
    │   └── notificador-interface.ts         ← tomada "avisar"
    ├── infra/                               ← as peças reais
    │   ├── postgres-checkin-repository.ts
    │   ├── whatsapp-notificador.ts
    │   └── email-notificador.ts
    ├── fakes/                               ← as peças de teste
    │   ├── in-memory-checkin-repository.ts
    │   └── notificador-spy.ts
    └── index.ts                             ← onde a gente "liga na tomada"
```

## ▶️ Rodando

```bash
npm run dip:antes
npm run dip:depois
```
