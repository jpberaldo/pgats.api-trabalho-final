const { products } = require('../models/productModel');

function addProduct(name, price) {
  if (products.find(p => p.name === name)) {
    return { error: 'Produto já existe.' };
  }
  const product = { id: products.length + 1, name, price };
  products.push(product);
  return product;
}

function getProducts() {
  return products;
}

function updateProduct(id, name, price) {
  const product = products.find(p => p.id === id);
  if (!product) return { error: 'Produto não encontrado.' };
  if (name && name !== product.name && products.find(p => p.name === name)) {
    return { error: 'Produto já existe.' };
  }
  if (name) product.name = name;
  if (price) product.price = price;
  return product;
}

function deleteProduct(id) {
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return { error: 'Produto não encontrado.' };
  products.splice(idx, 1);
  return { success: true };
}

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };