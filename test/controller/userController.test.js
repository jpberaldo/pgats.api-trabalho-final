const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app.js');

//mock
const userService = require('../../services/userService.js');


describe('User Controller', () => {

    describe('/POST Register', () => {

        it('Quando registrar usuário com dados válidos o status de retorno será 201', async () => {
            const resposta = await request(app)
                .post('/users/register')
                .send({
                    username: "usuario-teste",
                    password: "senha-teste"
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('id', 1);

        });

        it('Quando registrar usuário com o campo username inválido o status de retorno será 400', async () => {
            const resposta = await request(app)
                .post('/users/register')
                .send({
                    user: "usuario-teste-2",
                    password: "senha-teste"
                })

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Informe usuário e senha.');

        });

        it('Teste mockado: Quando registrar usuário com dados válidos o status de retorno será 201', async () => {
            //Mockando função addUser da classe userController.js
            const userServiceMock = sinon.stub(userService, 'addUser');
            // userServiceMock.

            const resposta = await request(app)
                .post('/users/register')
                .send({
                    username: "usuario-teste",
                    password: "senha-teste"
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('id', 1);

            //reset mock
            sinon.restore();

        });

        it.only('Teste mockado: Quando registrar usuário com username inválido', async () => {
            const userServiceMock = sinon.stub(userService, 'addUser');
            userServiceMock.throws(new Error('Informe usuário e senha.'));

            const resposta = await request(app)
                .post('/users/register')
                .send({
                    username: "",
                    password: "senha-teste"
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Informe usuário e senha.');
            
            sinon.restore();
        });

    });

});