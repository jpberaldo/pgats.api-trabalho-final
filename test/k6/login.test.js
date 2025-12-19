import { sleep, check, group } from 'k6';
import { login } from './helpers/login.js';
import { Trend } from 'k6/metrics';
import { SharedArray } from 'k6/data';

export const options = {
    vus: 3,
    iterations: 3,
    //duration: '10s',
    thresholds: {
        http_req_duration: ['p(90) <= 2000', 'p(95) <= 3000'],
        http_req_failed: ['rate < 0.01'],
        'post_login_duration': ['p(95) <= 2000']
    },
    
};

const users = new SharedArray('users', function () {
    return JSON.parse(open('./data/login.test.data.json'));
});

const postLoginTrend = new Trend('post_login_duration');

export default function () {

    let responseUserLogin = '';

    group('Realizar login', () => {

        const user = users[__VU - 1];

        responseUserLogin = login(user.username, user.password);

        check(responseUserLogin, {
            'Validar status code do login com sucesso': (res) => res.status === 200,
            'Validar mensagem de sucesso ao logar no body da resposta': (res) => res.body.includes('Login realizado com sucesso.')
        });

        postLoginTrend.add(responseUserLogin.timings.duration);

    });


    group('User think time', () => {
        sleep(1);
    });

};
