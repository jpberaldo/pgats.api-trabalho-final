const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();


describe('User External Tests', () => {

    describe('/POST Register', () => {

        it('Quando registrar usuário com dados válidos o status de retorno será 201', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/users/register')
                .send({
                    username: "usuario-teste",
                    password: "senha-teste"
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('id', 4);

        });

    });

    describe('/POST Login', () => {

        it('Quando fazer login na rota /users/login com dados validos retornar sucesso e status code', async () => {

            const resposta = await request(process.env.BASE_URL)
                .post('/users/login')
                .send({
                    username: "usuario-teste",
                    password: "senha-teste"
                });

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('message', 'Login realizado com sucesso.');
        });

    });

});
