const request = require('supertest');
const { expect } = require('chai');


describe('User Controller External', () => {

    describe('/POST Register', () => {

        it('Quando registrar usuário com dados válidos o status de retorno será 201', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/users/register')
                .send({
                    username: "usuario-teste",
                    password: "senha-teste"
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('id', 1);

        });

    });

});
