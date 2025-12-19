import http from 'k6/http';
import { BASE_URL } from './baseURL.js';

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
