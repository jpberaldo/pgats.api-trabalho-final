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

## Autenticação JWT

Após o login (`POST /users/login`), será retornado um token JWT. Esse token deve ser enviado no header `Authorization` como Bearer Token para acessar as rotas protegidas:

```
Authorization: Bearer <seu_token_jwt>
```

### Rotas protegidas
- Todas as rotas de usuários e produtos exigem autenticação, exceto:
  - `POST /users/register` (registro de usuário)
  - `POST /users/login` (login)

### Exemplo de uso com curl

```bash
# Login e obtenção do token
curl -X POST http://localhost:3000/users/login -H "Content-Type: application/json" -d '{"username":"usuario","password":"senha"}'

# Usando o token para acessar rota protegida
curl -X GET http://localhost:3000/users -H "Authorization: Bearer <seu_token_jwt>"
```

## Endpoints



### Usuários
- `POST /users/register` — Cadastra novo usuário (não requer autenticação)
  - **Respostas:**
    - `201`: Usuário criado
    - `400`: Dados inválidos ou erro de serviço
    - `409`: Usuário já existe
-- `POST /users/login` — Realiza login (não requer autenticação)
  - **Respostas:**
    - `200`: Login bem-sucedido (retorna token JWT, usuário e mensagem)
      - Exemplo de resposta:
        ```json
        {
          "message": "Login realizado com sucesso.",
          "token": "<jwt_token>",
          "user": {
            "id": 1,
            "username": "usuario"
          }
        }
        ```
    - `400`: Dados inválidos ou erro de serviço
    - `401`: Login ou senha inválidos
- `GET /users` — Lista usuários (**requer autenticação JWT**)
  - **Respostas:**
    - `200`: Lista de usuários
    - `400`: Erro de serviço
- `DELETE /users/:id` — Exclui usuário (**requer autenticação JWT**)
  - **Respostas:**
    - `200`: Usuário excluído
    - `400`: Erro de serviço
    - `404`: Usuário não encontrado



### Produtos
- `POST /products` — Adiciona produto (**requer autenticação JWT**)
  - **Respostas:**
    - `201`: Produto criado
    - `400`: Dados inválidos ou erro de serviço
    - `409`: Produto já existe
- `GET /products` — Lista produtos (**requer autenticação JWT**)
  - **Respostas:**
    - `200`: Lista de produtos
    - `400`: Erro de serviço
- `PUT /products/:id` — Altera produto (**requer autenticação JWT**)
  - **Respostas:**
    - `200`: Produto alterado
    - `400`: Erro de serviço
    - `404`: Produto não encontrado
- `DELETE /products/:id` — Exclui produto (**requer autenticação JWT**)
  - **Respostas:**
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
