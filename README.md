# Simulador de Copa do Mundo

## Descrição

Este projeto foi desenvolvido como parte de um desafio técnico para o programa de estágio da Katalyst Data Management e tem como objetivo simular uma Copa do Mundo completa, desde a fase de grupos até a final, utilizando dados fornecidos por uma API externa.

A aplicação realiza automaticamente:

* Sorteio dos grupos
* Simulação de partidas
* Classificação por pontos e saldo de gols
* Fase eliminatória (mata-mata)
* Envio do campeão para a API

---

## Tecnologias utilizadas

* React (Vite)
* JavaScript (ES6+)
* Fetch API
* CSS

---

## Funcionalidades

* Distribuição aleatória das 32 seleções em 8 grupos
* Simulação de jogos com placares aleatórios
* Cálculo de classificação (pontos e saldo de gols)
* Fase de mata-mata com pênaltis em caso de empate
* Envio do resultado final para API externa

---

## API utilizada

Base URL:
[https://development-internship-api.geopostenergy.com](https://development-internship-api.geopostenergy.com)

### Endpoints

* GET `/WorldCup/GetAllTeams`
* POST `/WorldCup/FinalResult`

---

## Como executar o projeto

```bash
npm install
npm run dev
```

---

## Decisões técnicas

* A simulação do torneio é executada apenas uma vez e armazenada em estado para evitar inconsistências durante re-renderizações.
* O payload enviado no resultado final segue exatamente o contrato exigido pelo backend.

---

## Autor

**Tiago de Noronha Leopoldo**
Email: [tnleopoldo.dev@gmail.com](mailto:tnleopoldo.dev@gmail.com)
Portfólio: [www.tiagonldev.com.br](http://www.tiagonldev.com.br)

