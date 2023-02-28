# testeAPI

Esse projeto é um middleware baseado em [EXPRESS](https://expressjs.com/) e [AXIOS](https://axios-http.com/docs/intro) que serve para fazer a ligação entre um mockend e um cliente frontend usando JSON como formato de dados escolhido.

A documentação do API é desenvolvida usando a biblioteca [APIDOC](https://apidocjs.com/) por meio de um script ```npm run apidoc``` e disponibilizada pelo próprio express de forma estática no endpoint ```localhost:PORT/apidoc```.

Os testes utilizam [JEST](https://jestjs.io/) e [SUPERTEST](https://github.com/ladjs/supertest) para fazer uma cobertura com testes unitários nos 3 endpoints presentes no projeto, trazendo mais confianca e tranquilidade para o desenvolvimento de novas regras de negocios ou alteracoes das já existentes.


## Começando
1. Baixe o projeto ou clone o repositório.
```
git clone https://github.com/Marco-D-Sousa/testeAPI.git
```
2. Instale as dependencias necessárias.
```
cd testeAPI
npm install
```

## Scripts
| Script | Descricao |
| ----------- | ----------- |
| `npm run apidoc` | Atualiza a documentacao com base na pasta `src/controllers` e salva na pasta `public/apidoc` |
| `npm run dev` | Utiliza o nodemon para monitorar alteracoes e manter o servidor rodando | 
| `npm test` | Roda os testes presentes nos arquivos `name.test.js` ou `name.spec.js` utilizando o JEST| 
| `npm start` | Coloca o servidor online | 

## Usando a API

Voce terá acesso ao server através dos seguintes endpoints:

### `GET`

- `/users`: Busca todos os usuários.
- `/products`: Busca todos os produtos.
- `/apidoc`: Página da documentacao da API.
  

### `POST`

- `/users/calculate`: Busca o valor a ser pago de acordo com o a taxa presente no usuário e a somados precos dos produtos.
  - Body:
    - `userId: Number` (required): O id do usuário.
    - `productList: Array` (required): Um array contendo os id´s (números) dos produtos escolhidos.
   
