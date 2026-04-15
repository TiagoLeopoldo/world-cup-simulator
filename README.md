# World Cup Simulator

> Uma aplicação interativa para simulação e acompanhamento da Copa do Mundo, desenvolvida com React e Vite.

## Visão Geral

O **World Cup Simulator** é uma aplicação web moderna construída para simular e visualizar dados relacionados ao torneio da Copa do Mundo. Integrado a uma API externa, o sistema consome dados atualizados das seleções participantes, proporcionando uma fundação sólida para interfaces ricas, acompanhamento de partidas e simulações de resultados.

Este projeto adota boas práticas de arquitetura em ecossistemas React contemporâneos, priorizando a componentização, escalabilidade e a clara separação de responsabilidades.

## Tecnologias e Ferramentas

O projeto foi estruturado utilizando o padrão moderno de construção de interfaces web, focando severamente em performance, otimização de bundle e Developer Experience (DX):

- **[React 19](https://react.dev/)**: Biblioteca principal para construção reativa da interface de usuário.
- **[Vite 6](https://vitejs.dev/)**: Bundler de nova geração e servidor de desenvolvimento ultra-rápido.
- **JavaScript (ES6+)**: Linguagem base utilizando módulos ESM e funcionalidades avançadas.
- **[ESLint 9](https://eslint.org/)**: Ferramenta de linting rigorosamente configurada (junto a plugins do React) para garantir inspeção estática, qualidade e padronização contínua do código.
- **CSS3 Avançado**: Estilização enxuta utilizando propriedades customizadas (variáveis CSS), permitindo fácil manutenção de temas.

## Arquitetura do Projeto

A estrutura de diretórios foi planejada para mitigar o acoplamento técnico, separando a lógica de negócios da camada de visualização:

```text
world-cup-simulator/
├── public/          # Assets estáticos servidos diretamente
├── src/
│   ├── assets/      # Recursos de mídia importados via module bundler
│   ├── components/  # Componentes React de interface isolados e reutilizáveis
│   ├── services/    # Camada de comunicação com APIs externas e persistência (Ex: api.js)
│   ├── utils/       # Funções utilitárias puras e formatações de uso geral
│   ├── App.jsx      # Root component agregador da árvore de visualização
│   ├── main.jsx     # Ponto de inicialização do ciclo de vida React
│   └── index.css    # Definição do Design System base (paleta de cores, tipografia e reset)
├── eslint.config.js # Regras estritas do linter
└── vite.config.js   # Configuração do ambiente de build
```

## Integração de Dados (API)

A comunicação com serviços externos está abstraída rigorosamente dentro do diretório `services/`. Atualmente, a aplicação se conecta à **Geopost Energy Development API** para consultar os metadados dos times da Copa do Mundo:

- **Módulo Responsável**: `src/services/api.js`
- **Operação Principal**: `getTeams()` (Extração nativa via Fetch API com operações assíncronas `async/await` promissificadas)
- **Segurança**: Autenticação leve baseada em injeção de headers customizados (`git-user`).

## Guia de Implementação e Uso Local

Instruções para provisionamento do ambiente local de desenvolvimento.

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/en/) (Versão LTS, ex: v18+ ou v20+)
- `npm` para resolução e instalação da árvore de dependências.

### 2. Setup do Projeto

Abra seu terminal de preferência, navegue até a raiz do projeto e execute:

```bash
# Baixa e instala todas as bibliotecas descritas no package.json
npm install
```

### 3. Ambiente de Desenvolvimento

Para provisionar o servidor local equipado com Hot Module Replacement (HMR) e iniciar os trabalhos na interface:

```bash
npm run dev
```
A aplicação processará os arquivos em tempo real e ficará audível no navegador no endereço que o terminal indicar (habitualmente `http://localhost:5173`).

### 4. Scripts Corporativos

Para cenários de integração contínua (CI) ou testes de estabilidade, utilize os seguintes scripts nativos:

- `npm run lint`: Inspeciona a integridade sintática e léxica do projeto inteiro apontando não conformidades.
- `npm run build`: Otimiza e minifica todo o código-fonte, gerando artefatos de produção em uma pasta estática chamada `dist/`.
- `npm run preview`: Submete a pasta `dist/` gerada para ser executada em um servidor leve, permitindo emular uma auditoria sobre o comportamento final em produção.

---
