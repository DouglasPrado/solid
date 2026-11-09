# Tudo junto — os 5 princípios no mesmo check-in

Aqui juntamos tudo num fluxo só, um pouco mais parecido com um sistema real (mas ainda bem simples).

## Relembrando com os exemplos do dia a dia

| Letra | Princípio                | Exemplo            | Em uma frase                                     |
| :---: | ------------------------ | ------------------ | ------------------------------------------------ |
| **S** | Responsabilidade única   | Restaurante        | Cada um cuida de um assunto só                   |
| **O** | Aberto/Fechado           | Celular e apps     | Para coisa nova, crie — não edite o que funciona |
| **L** | Liskov                   | Locadora de carros | A filha tem que cumprir o que a mãe promete      |
| **I** | Segregação de interfaces | Controle remoto    | Não obrigue ninguém a ter botões que não usa     |
| **D** | Inversão de dependência  | Tomada             | Receba as peças prontas, não solde na parede     |

## Antes — `antes/`

Uma classe **faz-tudo** que quebra os 5 de uma vez:

| Letra | O que está errado                                                                                                           |
| :---: | --------------------------------------------------------------------------------------------------------------------------- |
| **S** | Confere horário, confere o método, salva, manda WhatsApp e escreve log — tudo na mesma classe                               |
| **O** | Um `switch` com os métodos. Método novo = editar a classe                                                                   |
| **L** | O online é uma "exceção" que pula as conferências                                                                           |
| **I** | Recebe um formulário com campos de **todos** os métodos. Dá para mandar GPS num check-in por QR Code e o editor não reclama |
| **D** | Cria o banco e o WhatsApp lá dentro (fio soldado na parede)                                                                 |

## Depois — `depois/`

Cada pasta tem um papel:

| Pasta           | Papel                                        | Exemplo do dia a dia  |
| --------------- | -------------------------------------------- | --------------------- |
| `dominio/`      | As regras e os dados do negócio              | O "manual" da empresa |
| `metodos/`      | Um arquivo para cada jeito de fazer check-in | Os apps instalados    |
| `portas/`       | Os "encaixes padrão" (interfaces)            | As tomadas            |
| `infra/`        | As peças reais (banco, WhatsApp, log)        | Os aparelhos          |
| `casos-de-uso/` | Quem coordena o fluxo                        | O gerente             |
| `index.ts`      | Onde tudo é montado e ligado                 | O dia da inauguração  |

### Onde cada princípio aparece

- **S** — Cada um faz uma coisa: `JanelaDeCheckin` confere o horário, o repositório guarda, o notificador avisa, o logger anota, e `RealizarCheckin` só coordena.
- **O** — Quer check-in por NFC? Crie `metodos/checkin-por-nfc.ts`. Ninguém mais é editado.
- **L** — Todo método só responde **"sim ou não"**. Nenhum dá erro de "não sei fazer isso". O online não finge ter GPS.
- **I** — Cada método diz exatamente qual **prova** precisa: QR Code pede o código, GPS pede a posição, online pede o token da sala. Mandar a prova errada → o editor avisa na hora.
- **D** — `RealizarCheckin` recebe "algo que guarda", "algo que avisa" e "algo que anota". Trocar o banco ou o WhatsApp é só mudar o `index.ts`.

### Regra de ouro das pastas

```
index.ts ──▶ infra/ ──▶ portas/ ◀── casos-de-uso/ ──▶ dominio/
                                         │
                                         └──▶ metodos/
```

`dominio/` e `casos-de-uso/` **nunca** importam nada de `infra/`.
É como o manual da empresa: ele diz "use a máquina de café", mas não diz a marca.

## Arquivos

```
06-tudo-junto/
├── antes/
│   ├── checkin-service.ts                  ← a classe faz-tudo
│   ├── dados-checkin-type.ts               ← formulário com campos de todos os métodos
│   ├── postgres-client.ts
│   ├── whatsapp-api.ts
│   └── index.ts
└── depois/
    ├── dominio/
    │   ├── agendamento-type.ts
    │   ├── checkin-type.ts
    │   ├── coordenada-type.ts
    │   └── janela-de-checkin.ts            ← S: só cuida do horário
    ├── metodos/
    │   ├── metodo-de-checkin-interface.ts  ← O/L/I: o encaixe padrão
    │   ├── checkin-por-qrcode.ts
    │   ├── checkin-por-geolocalizacao.ts
    │   ├── checkin-online.ts               ← L: não finge ter GPS
    │   ├── prova-qrcode-type.ts
    │   └── prova-online-type.ts
    ├── portas/                             ← D: as tomadas
    │   ├── checkin-repository-interface.ts
    │   ├── notificador-interface.ts
    │   └── logger-interface.ts
    ├── infra/                              ← D: as peças reais
    │   ├── in-memory-checkin-repository.ts
    │   ├── whatsapp-notificador.ts
    │   └── console-logger.ts
    ├── casos-de-uso/
    │   └── realizar-checkin.ts             ← o gerente
    └── index.ts                            ← onde tudo é montado
```

## Rodando

```bash
npm run tudo-junto:antes
npm run tudo-junto:depois
```
