const express = require('express');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { authenticateToken } = require('./middlewares/auth');

const app = express();
app.use(express.json());

// User routes
app.post('/users/register', userController.register);
app.post('/users/login', userController.login);
app.get('/users', authenticateToken, userController.getUsers);
app.delete('/users/:id', authenticateToken, userController.deleteUser);

// Product routes
app.post('/products', authenticateToken, productController.addProduct);
app.get('/products', authenticateToken, productController.getProducts);
app.put('/products/:id', authenticateToken, productController.updateProduct);
app.delete('/products/:id', authenticateToken, productController.deleteProduct);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;