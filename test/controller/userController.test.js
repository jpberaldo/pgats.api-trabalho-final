const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app.js');


describe('User Controller', () => {

    describe('/POST Register', () => {

        it('Quando adicionar usuário com dados válidos o status de retorno será 201', async () => {
            const resposta = await request(app)
                .post('/users/register')
                .send({
                    username: "usuario-teste",
                    password: "senha-teste"
                })

        });

        it.only('Quando registrar usuário com o campo username inválido o status de retorno será 400', async () => {
            const resposta = await request(app)
                .post('/users/register')
                .send({
                    user: "usuario-teste-2",
                    password: "senha-teste"
                })

            console.log('qual foi o status code retornado:', resposta.status);
            console.log('veja o body da response da req:', resposta.body);
            expect(resposta.status).to.equal(400);

        });

    });

});