## Trabalho final - disciplina Automação de testes de Performance

Dashboard gerado em HTML [K6_WEB_DASHBOARD](html-report.html).

## Thresholds

- O conceito de thresholds é utilizado para definir critérios de aprovação para as métricas de performance, como tempo de resposta ou taxa de erro. Caso os limites definidos não sejam atendidos, o teste é considerado falho. No arquivo test/k6/product.test.js, thresholds são configurados dentro do objeto `options`:

```js
//arquivo: test/k6/product.test.js
export const options = {
    thresholds: {
        http_req_duration: ['p(90) <= 2000', 'p(95) <= 3000'],
        http_req_failed: ['rate < 0.01'],
        'post_addProduct_duration': ['p(95) <= 2000']
    }
};
```

## Checks

- Checks são utilizados para realizar checagens sobre as respostas das requisições, como status code ou conteúdo do body, mas não fazem o teste falhar. Exemplo de uso em test/k6/product.test.js:

```js
//arquivo: test/k6/product.test.js
check(responseAddProduct, {
    'Validar status code de adicionar produto com sucesso': (res) => res.status === 201,
});
```

## Helpers

- Helpers são funções auxiliares criadas para modularizar e reaproveitar código, facilitando a manutenção e organização dos testes. No projeto, estão localizados na pasta test/k6/helpers e são importados nos scripts de teste. Exemplo:

```js
//arquivo: test/k6/helpers/product.js
export function addProduct(productName, productPrice, token) {
    // ...implementação...
}

//arquivo: test/k6/product.test.js
import { addProduct } from './helpers/product.js';
  
  group('Cadastrar produto', () => {
    let responseAddProduct = addProduct(randomProduct(), randomPrice, token);
    // restante da implementação...
```

## Trends

- Trends permitem criar métricas customizadas para monitorar tempos de resposta ou outros indicadores específicos de uma requisição. São úteis para análises detalhadas de performance. Exemplo de uso em test/k6/product.test.js:

```js
//arquivo: test/k6/product.test.js
import { Trend } from 'k6/metrics';

const postAddProductDurationTrend = new Trend('post_addProduct_duration');

// Após a requisição:
postAddProductDurationTrend.add(responseAddProduct.timings.duration);
```

## Faker

- O Faker é utilizado para gerar dados fakes durante os testes. No projeto, a biblioteca/extensão é utilizada no helper test/k6/helpers/randomData.js para criar nomes e preços de produtos:

```js
//arquivo: test/k6/helpers/randomData.js
import faker from 'k6/x/faker';

export const randomPrice = faker.numbers.intRange(1, 1000);
```
## Variável de Ambiente

- O conceito de variável de ambiente foi aplicado para que o ambiente/endereço da API seja dinâmico e só precisa ser alterado em um arquivo para refletir nos demais. No arquivo test/k6/helpers/baseURL.js, a variável `BASE_URL` é definida usando `__ENV.BASE_URL `, e seu uso são nos arquivos test/k6/helpers/login.js e product.js:

```js
//arquivo: test/k6/helpers/baseURL.js
export const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

//arquivo test/k6/login.js
import { BASE_URL } from './baseURL.js';

const res = http.post(`${BASE_URL}/users/login`, JSON.  stringify(payload), {
  headers: { 'Content-Type': 'application/json' },
});
```

## Stages

- O conceito de stages foi aplicado no arquivo test/k6/product.test.js, dentro do objeto `options`. Os stages permitem simular diferentes cargas de usuários ao longo do tempo, controlando ramp up, picos e ramp down. Exemplo:

```js
//Arquivo: test/k6/product.test.js
export const options = {
	stages: [
		{ duration: '2s', target: 5 },
		{ duration: '10s', target: 10 },
		{ duration: '2s', target: 20 },
		{ duration: '1s', target: 15 },
		{ duration: '10s', target: 10 },
		{ duration: '3s', target: 0 }
	]
};
```

## Reaproveitamento de Resposta

- O reaproveitamento de resposta ocorre quando o resultado de uma requisição é utilizado em etapas seguintes do teste. No arquivo test/k6/product.test.js, a resposta do login (`responseUserLogin`) é utilizada para extrair o token de autenticação, que é então usado para cadastrar um produto:

```js
//arquivo test/k6/product.test.js
let responseUserLogin = login(user.username, user.password);
let token = responseUserLogin.json('token');
let responseAddProduct = addProduct(randomProduct(), randomPrice, token);
```

## Uso de Token de Autenticação

- O uso de token de autenticação é demonstrado no arquivo test/k6/product.test.js e test/k6/product.test.js. Após realizar o login, o token retornado é extraído da resposta e enviado no header Authorization das requisições subsequentes:

```js
//arquivo: test/k6/helpers/product.js
export function addProduct(productName, productPrice, token) {
    let payload = {
        name: productName,
        price: productPrice
    }

    const res = http.post(`${BASE_URL}/products`, JSON.stringify(payload),
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

    return res;

};

//arquivo test/k6/product.test.js
import { addProduct } from './helpers/product.js';

//group...
let responseUserLogin = login(user.username, user.password);
let token = responseUserLogin.json('token');
let responseAddProduct = addProduct(randomProduct(), randomPrice, token);
```

## Data-Driven Testing

- O conceito de data-driven testing é aplicado no arquivo test/k6/login.test.js, utilizando o `SharedArray` para carregar múltiplos usuários a partir do arquivo JSON (test/k6/data/login.test.data.json).


```js
//arquivo: test/k6/data/login.test.data.json
[
    {
        "username": "usuario-teste-product",
        "password": "senha-teste-product"
    },
    {
        "username": "usuario-teste-1",
        "password": "senha1"
    },
    {
        "username": "usuario-teste-2",
        "password": "senha2"
    }
]

//arquivo: test/k6/login.test.js
import { SharedArray } from 'k6/data';

const users = new SharedArray('users', function () {
	return JSON.parse(open('./data/login.test.data.json'));
});

const user = users[__VU - 1];
```

## Groups

- O conceito de groups é utilizado para organizar e agrupar testes, similares aos describes ou seja, é o agrupamento das ações. Exemplo de uso em test/k6/login.test.js e test/k6/product.test.js:

```js
//arquivo: test/k6/login.test.js
group('Realizar login', () => {
	// ...ações de login...
});


//arquivo: test/k6/product.test.js
group('Cadastrar produto', () => {
	// ...ações de cadastro...
});
```

