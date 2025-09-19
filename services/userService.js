const { users } = require('../models/userModel');

function addUser(username, password) {
  if (users.find(u => u.username === username)) {
    return { error: 'Usuário já existe.' };
  }
  const user = { id: users.length + 1, username, password };
  users.push(user);
  return user;
}

function getUsers() {
  return users;
}

function deleteUser(id) {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return { error: 'Usuário não encontrado.' };
  users.splice(idx, 1);
  return { success: true };
}

function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return { error: 'Login ou senha inválidos.' };
  return { success: true, user };
}

module.exports = { addUser, getUsers, deleteUser, login };