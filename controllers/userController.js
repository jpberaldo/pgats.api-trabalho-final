const userService = require('../services/userService');


exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha.' });
  try {
    const result = userService.addUser(username, password);
    if (result.error) return res.status(409).json(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const jwt = require('jsonwebtoken');
const { SECRET } = require('../middlewares/auth');

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha.' });
  try {
    const result = userService.login(username, password);
    if (result.error) return res.status(401).json(result);
    // Gerar token JWT
    const token = jwt.sign({ username: result.user.username, id: result.user.id }, SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login realizado com sucesso.',
      token,
      user: result.user
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUsers = (req, res) => {
  try {
    res.json(userService.getUsers());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = userService.deleteUser(id);
    if (result.error) return res.status(404).json(result);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};