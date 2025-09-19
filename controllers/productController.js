const productService = require('../services/productService');

exports.addProduct = (req, res) => {
  const { name, price } = req.body;
  if (!name || price == null) return res.status(400).json({ error: 'Informe nome e preço.' });
  const result = productService.addProduct(name, price);
  if (result.error) return res.status(409).json(result);
  res.status(201).json(result);
};

exports.getProducts = (req, res) => {
  res.json(productService.getProducts());
};

exports.updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  const result = productService.updateProduct(id, name, price);
  if (result.error) return res.status(404).json(result);
  res.json(result);
};

exports.deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const result = productService.deleteProduct(id);
  if (result.error) return res.status(404).json(result);
  res.json(result);
};