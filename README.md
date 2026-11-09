# SOLID na prática com TypeScript — exemplo: Check-in

SOLID são **5 dicas** para escrever código fácil de mudar sem quebrar o que já funciona.
Cada letra é uma dica. Aqui cada uma tem um exemplo **antes ❌ / depois ✅** usando um **check-in**
(inspirado no check-in do Albert, bem simplificado e sem código real do produto).

## 🧠 As 5 dicas em 30 segundos

| Letra | Nome                     | Exemplo do dia a dia  | Em uma frase                                         |
|:-----:|--------------------------|-----------------------|------------------------------------------------------|
| **S** | Responsabilidade única   | 🍽️ Restaurante         | Cada classe cuida de **um assunto só**               |
| **O** | Aberto/Fechado           | 📱 Celular e apps      | Para coisa nova, **crie** — não **edite** o que funciona |
| **L** | Substituição de Liskov   | 🚗 Locadora de carros  | A classe filha tem que **cumprir o que a mãe promete** |
| **I** | Segregação de interfaces | 📺 Controle remoto     | Não obrigue ninguém a ter **botões que não usa**     |
| **D** | Inversão de dependência  | 🔌 Tomada              | **Receba as peças prontas**, não solde na parede      |

## 📍 O check-in usado nos exemplos

Uma pessoa tem um **horário marcado** e faz **check-in** quando chega:

- pode fazer até **30 min antes** e com até **15 min de atraso**;
- **não pode** fazer check-in duas vezes;
- dá para fazer por **QR Code**, **GPS**, **recepção** ou **online**;
- depois de confirmado: o sistema **guarda**, **avisa a pessoa** (WhatsApp) e **anota no log**.

## 📁 Como está organizado

| Pasta | Letra | O que mostra |
|-------|:-----:|--------------|
| [`src/01-srp`](src/01-srp) | **S** | Uma classe que faz tudo → uma equipe, cada um com sua função |
| [`src/02-ocp`](src/02-ocp) | **O** | Um `switch` que vive sendo editado → adicionar NFC sem mexer em nada |
| [`src/03-lsp`](src/03-lsp) | **L** | Check-in online que dá erro ao ser usado como check-in → um combinado que todos cumprem |
| [`src/04-isp`](src/04-isp) | **I** | Totem e celular obrigados a ter tudo → cada um só com o que sabe fazer |
| [`src/05-dip`](src/05-dip) | **D** | Banco e WhatsApp "soldados" na classe → peças que encaixam numa tomada |
| [`src/06-tudo-junto`](src/06-tudo-junto) | Todas | O check-in completo, com as 5 dicas ao mesmo tempo |

Toda pasta segue o mesmo padrão:

```
0X-principio/
├── README.md     ← a explicação (comece por aqui)
├── antes/        ← ❌ o código com o problema
│   └── index.ts  ←    o arquivo que roda o exemplo
└── depois/       ← ✅ o código arrumado
    └── index.ts  ←    o arquivo que roda o exemplo
```

- **Um arquivo para cada classe, interface ou tipo.**
- O `index.ts` é quem monta tudo e roda o exemplo.

### 🏷️ Como os arquivos são nomeados

Só de olhar o nome do arquivo você já sabe o que tem dentro:

| O arquivo tem…  | Padrão do nome        | Exemplo                                                   |
|-----------------|-----------------------|-----------------------------------------------------------|
| uma **classe**     | `nome-da-classe.ts`   | `CheckinService` → `checkin-service.ts`                   |
| uma **interface**  | `nome-interface.ts`   | `Checkin` → `checkin-interface.ts`                        |
| um **tipo**        | `nome-type.ts`        | `Agendamento` → `agendamento-type.ts`                     |

Exemplo lado a lado: `checkin-repository-interface.ts` é a **tomada** (a lista de obrigações),
e `postgres-checkin-repository.ts` é a **classe** que encaixa nela.

**Ordem de leitura sugerida:** README da pasta → `antes/` → `depois/` → rode os dois e compare.

## ▶️ Como rodar

```bash
npm install

npm run srp:antes   && npm run srp:depois
npm run ocp:antes   && npm run ocp:depois
npm run lsp:antes   && npm run lsp:depois
npm run isp:antes   && npm run isp:depois
npm run dip:antes   && npm run dip:depois
npm run tudo-junto:antes && npm run tudo-junto:depois

npm run typecheck   # confere se não tem erro de tipo em nenhum exemplo
```

## 📖 Glossário (palavras que aparecem no código)

| Palavra | Significa |
|---------|-----------|
| **Classe** | Um "molde" que junta dados e ações. Ex.: `CheckinService`. |
| **Interface** | Uma **lista de obrigações**: diz _o que_ precisa existir, mas não _como_. Pense numa tomada: ela diz o formato do plugue, não qual aparelho vai ligar. |
| **Implementar** (`implements`) | Prometer que a classe cumpre a lista de obrigações de uma interface. |
| **Herdar** (`extends`) | Uma classe "filha" recebe tudo o que a classe "mãe" tem. |
| **Construtor** | A função que roda quando você cria um objeto com `new`. É por ela que entregamos as "peças" prontas. |
| **Repository** | A classe que guarda e busca dados (o "arquivista"). |
| **Infra** | As peças técnicas: banco de dados, WhatsApp, log. |
| **Domínio** | As regras do negócio: horário do check-in, não repetir check-in etc. |
| **Fake / Spy** | Peças de mentira usadas em teste, para não precisar de banco ou WhatsApp de verdade. |

## ✅ Pergunta rápida para o code review

| Letra | Pergunte |
|:-----:|----------|
| **S** | "Para explicar o que esta classe faz, eu preciso usar muitos **'e'**?" |
| **O** | "Para adicionar uma novidade, eu preciso **editar** algo que já funciona?" |
| **L** | "Tem classe filha que dá erro de **'não suportado'** ou que precisa de `instanceof`?" |
| **I** | "Tem método **vazio** ou que só dá erro porque a interface obrigou?" |
| **D** | "A regra de negócio dá `new` em **banco, API ou SDK** lá dentro?" |

## 📚 Referências

- Robert C. Martin — *Clean Architecture* (2017), Parte III: "Design Principles". Livro, sem link público oficial.
- Robert C. Martin — *Design Principles and Design Patterns* (2000): https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf
- Barbara Liskov & Jeannette Wing — *A Behavioral Notion of Subtyping* (1994): https://dl.acm.org/doi/10.1145/197320.197383
- Bertrand Meyer — *Object-Oriented Software Construction* (1988), origem do Aberto/Fechado. Livro, sem link público oficial.
- Wikipedia — SOLID: https://en.wikipedia.org/wiki/SOLID
