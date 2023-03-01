# testeAPI

## Introdução

Esse projeto é um middleware baseado em [EXPRESS](https://expressjs.com/) e [AXIOS](https://axios-http.com/docs/intro) que faz a ligação entre um mockend, que serve dados em JSON, e um cliente que os receberá também em JSON.

A documentação do API é desenvolvida usando a biblioteca [APIDOC](https://apidocjs.com/) gerada por meio de um script: `npm run apidoc`, e disponibilizada pelo próprio express de forma estática no endpoint `localhost:PORT/apidoc`.

Os testes utilizam [JEST](https://jestjs.io/) e [SUPERTEST](https://github.com/ladjs/supertest) para fazer a cobertura com testes unitários nos 3 endpoints presentes no projeto, trazendo mais confiança e tranquilidade para o desenvolvimento de novas regras de negócio e/ou alterções das já existentes.


## Começando
1. Baixe o projeto ou clone o repositório.
```
git clone https://github.com/Marco-D-Sousa/testeAPI.git
```
2. Instale as dependências necessárias.
```
cd testeAPI
npm install
```

## Scripts
| Script | Descrição |
| ----------- | ----------- |
| `npm run apidoc` | Atualiza a documentação com base nos arquivos da pasta `src/controllers` e salva na pasta `public/apidoc` |
| `npm run dev` | Utiliza o nodemon para monitorar alterações e manter o servidor rodando | 
| `npm test` | Roda os testes presentes nos arquivos `name.test.js` ou `name.spec.js` utilizando o JEST| 
| `npm start` | Coloca o servidor online | 

## Usando a API

Voçê terá acesso aos serviços através dos seguintes endpoints:

### `GET`

- `/users`: Busca todos os usuários e devolve uma lista.
- `/products`: Busca todos os produtos e devolve uma lista.
- `/apidoc`: Página da documentação da API.
  

### `POST`

- `/users/calculate`: Busca o valor a ser pago de acordo com o a taxa presente no usuário("tax") e a soma dos preços dos produtos informados("price").
  - Body:
    - `userId: Number` (required): O id do usuário.
    - `productList: Array` (required): Um array contendo os id´s (números) dos produtos escolhidos.
   
