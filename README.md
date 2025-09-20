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
  - **Possíveis respostas:**
    - `201`: Usuário criado
    - `400`: Dados inválidos ou erro de serviço
    - `409`: Usuário já existe
- `POST /users/login` — Realiza login
  - **Possíveis respostas:**
    - `200`: Login bem-sucedido
    - `400`: Dados inválidos ou erro de serviço
    - `401`: Login ou senha inválidos
- `GET /users` — Lista usuários
  - **Possíveis respostas:**
    - `200`: Lista de usuários
    - `400`: Erro de serviço
- `DELETE /users/:id` — Exclui usuário
  - **Possíveis respostas:**
    - `200`: Usuário excluído
    - `400`: Erro de serviço
    - `404`: Usuário não encontrado


### Produtos
- `POST /products` — Adiciona produto
  - **Possíveis respostas:**
    - `201`: Produto criado
    - `400`: Dados inválidos ou erro de serviço
    - `409`: Produto já existe
- `GET /products` — Lista produtos
  - **Possíveis respostas:**
    - `200`: Lista de produtos
    - `400`: Erro de serviço
- `PUT /products/:id` — Altera produto
  - **Possíveis respostas:**
    - `200`: Produto alterado
    - `400`: Erro de serviço
    - `404`: Produto não encontrado
- `DELETE /products/:id` — Exclui produto
  - **Possíveis respostas:**
    - `200`: Produto excluído
    - `400`: Erro de serviço
    - `404`: Produto não encontrado

## Regras de Negócio
- Não é permitido cadastrar usuários ou produtos duplicados.
- Login exige usuário e senha válidos.

## Testes
- Para testar com Supertest, importe o `app.js` em seu teste sem executar o método `listen()`.

## Documentação
- Consulte o Swagger em `/api-docs` para detalhes dos endpoints e exemplos de requisições.
