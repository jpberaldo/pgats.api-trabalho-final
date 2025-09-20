const productService = require('../services/productService');


exports.addProduct = (req, res) => {
  const { name, price } = req.body;
  if (!name || price == null) return res.status(400).json({ error: 'Informe nome e preço.' });
  try {
    const result = productService.addProduct(name, price);
    if (result.error) return res.status(409).json(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProducts = (req, res) => {
  try {
    res.json(productService.getProducts());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    const result = productService.updateProduct(id, name, price);
    if (result.error) return res.status(404).json(result);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = productService.deleteProduct(id);
    if (result.error) return res.status(404).json(result);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};