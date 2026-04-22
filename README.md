# Simulador de Copa do Mundo

## Descrição

Projeto desenvolvido como parte de um desafio técnico para o programa de estágio da Katalyst Data Management. A aplicação simula uma Copa do Mundo completa, desde a fase de grupos até a grande final, utilizando dados fornecidos por uma API externa.

A aplicação realiza automaticamente:

* Sorteio aleatório dos 8 grupos
* Simulação de todas as partidas da fase de grupos
* Classificação por pontos e saldo de gols
* Fase eliminatória completa (Oitavas, Quartas, Semifinais e Final)
* Resolução por penaltis em caso de empate no mata-mata
* Envio do resultado da final para a API

---

## Deploy

[https://world-cup-simulator-sage.vercel.app](https://world-cup-simulator-sage.vercel.app)

---

## Tecnologias utilizadas

* React 19 (Vite 8)
* JavaScript (ES6+)
* Fetch API
* CSS puro (Mobile-First)

---

## Estrutura do projeto

```
src/
  App.jsx                          # Componente raiz (orquestrador de UI)
  App.css                          # Layout geral da aplicacao
  index.css                        # Reset, variaveis CSS e estilos globais
  main.jsx                         # Ponto de entrada React
  hooks/
    useWorldCupSimulation.js       # Hook customizado com toda a logica do torneio
  services/
    api.js                         # GET - busca das selecoes
    sendFinalResult.js             # POST - envio do resultado da final
  utils/
    shuffle.js                     # Embaralhamento aleatorio (Fisher-Yates)
    groupDraw.js                   # Sorteio e montagem dos grupos
    matches.js                     # Geracao de partidas (todos contra todos)
    simulateMatch.js               # Simulacao de placar aleatorio
    standings.js                   # Calculo de classificacao (pontos, SG)
    qualification.js               # Extracao dos 2 classificados por grupo
    roundOf16.js                   # Montagem das chaves das oitavas
    knockout.js                    # Simulacao de partida eliminatoria
    knockoutRounds.js              # Execucao de uma rodada eliminatoria
  components/
    GroupCard/                     # Card de grupo (times, jogos, tabela)
    MatchItem/                     # Linha individual de partida
    QualifiedList/                 # Lista dos 16 classificados
    KnockoutPhase/                 # Fase eliminatoria (reutilizado 4x)
    ChampionBanner/                # Exibicao do campeao
```

---

## Arquitetura

O projeto separa responsabilidades em quatro camadas:

| Camada | Diretorio | Responsabilidade |
|---|---|---|
| View | `components/` | Renderizacao visual, sem logica de negocio |
| Controller | `hooks/` | Orquestracao de estado e ciclo de vida |
| Dominio | `utils/` | Regras de negocio puras, sem dependencia do React |
| Infraestrutura | `services/` | Comunicacao com API externa |

O `App.jsx` atua exclusivamente como orquestrador visual. Toda a logica de simulacao esta encapsulada no hook `useWorldCupSimulation`, que retorna apenas `{ groups, tournament, error }` para consumo da interface.

---

## Funcionalidades

* Distribuicao aleatoria das 32 selecoes em 8 grupos
* Simulacao de jogos com placares aleatorios
* Calculo de classificacao (pontos e saldo de gols)
* Cruzamento oficial das oitavas (1A vs 2B, 1C vs 2D, etc.)
* Fase de mata-mata com penaltis em caso de empate
* Envio do resultado final para API externa
* Tratamento de erro na requisicao da API (fallback visual)

---

## API utilizada

Base URL configurada via variavel de ambiente `VITE_API_URL`.

### Endpoints

| Metodo | Endpoint | Descricao |
|---|---|---|
| GET | `/WorldCup/GetAllTeams` | Retorna as 32 selecoes |
| POST | `/WorldCup/FinalResult` | Envia o resultado da final |

Header de autenticacao: `git-user: TiagoLeopoldo`

---

## Como executar o projeto

```bash
npm install
npm run dev
```

Criar arquivo `.env` na raiz com:

```
VITE_API_URL=https://development-internship-api.geopostenergy.com
```

---

## Decisoes tecnicas

* A simulacao do torneio executa uma unica vez na montagem do componente e armazena o resultado completo em estado, evitando inconsistencias durante re-renderizacoes.
* O envio do resultado da final utiliza `useRef` para garantir disparo unico, independentemente de re-renders do React.
* O payload enviado no POST segue exatamente o contrato exigido pelo backend (tokens, gols e penaltis).
* A chamada a API esta protegida com `try/catch` e validacao de retorno. Em caso de falha, a aplicacao exibe uma mensagem de erro sem quebrar.
* Cada componente possui seu proprio arquivo CSS, garantindo isolamento de estilos.
* O CSS segue a abordagem Mobile-First, com media queries apenas para expansao em telas maiores (768px e 1024px).
* HTML semantico aplicado: `<main>`, `<header>`, `<section>` e `<article>` onde aplicavel.

---

## Autor

**Tiago de Noronha Leopoldo**
Email: [tnleopoldo.dev@gmail.com](mailto:tnleopoldo.dev@gmail.com)
Portfolio: [www.tiagonldev.com.br](http://www.tiagonldev.com.br)

