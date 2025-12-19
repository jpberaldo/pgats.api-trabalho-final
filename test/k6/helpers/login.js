import http from 'k6/http';
import { BASE_URL } from './baseURL.js';

export function login(userName, userPassword) {

    let payload = {
        username: userName,
        password: userPassword
    };

    const res = http.post(`${BASE_URL}/users/login`, JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
    });

    return res;

};

export const user = {
    username: 'usuario-teste-product',
    password: 'senha-teste-product'
};