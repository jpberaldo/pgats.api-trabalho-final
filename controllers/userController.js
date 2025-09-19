const userService = require('../services/userService');

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha.' });
  const result = userService.addUser(username, password);
  if (result.error) return res.status(409).json(result);
  res.status(201).json(result);
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha.' });
  const result = userService.login(username, password);
  if (result.error) return res.status(401).json(result);
  res.json(result);
};

exports.getUsers = (req, res) => {
  res.json(userService.getUsers());
};

exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const result = userService.deleteUser(id);
  if (result.error) return res.status(404).json(result);
  res.json(result);
};