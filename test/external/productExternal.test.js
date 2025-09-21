const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();


describe('Products External Tests', () => {

    let token;

    beforeEach(async () => {

        const respostaLogin = await request(process.env.BASE_URL)
            .post('/users/login')
            .send({
                username: "usuario-teste-product",
                password: "senha-teste-product"
            });

        const body = typeof respostaLogin.body === 'string' ? JSON.parse(respostaLogin.body) : respostaLogin.body;
        token = body.token;


    });

    describe('/POST products', () => {

        it('Quando adicionar um produto com dados válidos o status de retorno será 201', async () => {

            const resposta = await request(process.env.BASE_URL)
                .post('/products')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    id: 1,
                    name: "iphone",
                    price: 5000
                });

            const respostaEsperada = require('../fixtures/respostas/DadosValidosDeProdutoAdicionado.json');
            expect(resposta.body).to.deep.equal(respostaEsperada);
            expect(resposta.status).to.equal(201);

        });

    });

});
