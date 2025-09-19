# Loja Simples API

API REST em Node.js e Express para gerenciar produtos e usuários, com banco de dados em memória. Ideal para estudos de testes e automação de API.

## Instalação

1. Clone o repositório ou copie os arquivos.
2. Instale as dependências:
   ```powershell
   npm install express swagger-ui-express
   ```

## Executando a API

- Para iniciar o servidor:
  ```powershell
  node server.js
  ```
- A API estará disponível em `http://localhost:3000`.
- A documentação Swagger estará disponível em `http://localhost:3000/api-docs`.

## Endpoints

### Usuários
- `POST /users/register` — Cadastra novo usuário
- `POST /users/login` — Realiza login
- `GET /users` — Lista usuários
- `DELETE /users/:id` — Exclui usuário

### Produtos
- `POST /products` — Adiciona produto
- `GET /products` — Lista produtos
- `PUT /products/:id` — Altera produto
- `DELETE /products/:id` — Exclui produto

## Regras de Negócio
- Não é permitido cadastrar usuários ou produtos duplicados.
- Login exige usuário e senha válidos.

## Testes
- Para testar com Supertest, importe o `app.js` em seu teste sem executar o método `listen()`.

## Documentação
- Consulte o Swagger em `/api-docs` para detalhes dos endpoints e exemplos de requisições.
