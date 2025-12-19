import { sleep, check, group } from 'k6';
import { randomProduct, randomPrice } from './helpers/randomData.js';
import { login, user } from './helpers/login.js';
import { addProduct } from './helpers/product.js';
import { Trend } from 'k6/metrics';


export const options = {

  thresholds: {
    http_req_duration: ['p(90) <= 2000', 'p(95) <= 3000'],
    http_req_failed: ['rate < 0.01'],
    'post_addProduct_duration': ['p(95) <= 2000']
  },
  stages: [
    { duration: '2s', target: 5 }, //ramp up
    { duration: '10s', target: 10 }, //average
    { duration: '2s', target: 20 }, //spike
    { duration: '1s', target: 15 }, //spike
    { duration: '10s', target: 10 }, //average
    { duration: '3s', target: 0 } //ramp down
  ]
};


const postAddProductDurationTrend = new Trend('post_addProduct_duration');

export default function () {

  let responseUserLogin = login(user.username, user.password);
  let token = responseUserLogin.json('token');

  group('Cadastrar produto', () => {

    let responseAddProduct = addProduct(randomProduct(), randomPrice, token);

    check(responseAddProduct, {
      'Validar status code de adicionar produto com sucesso': (res) => res.status === 201,
    });

    postAddProductDurationTrend.add(responseAddProduct.timings.duration);

  });

  group('User think time', () => {
    sleep(1);
  });

};
