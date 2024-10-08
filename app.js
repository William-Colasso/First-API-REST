const express = require('express');
const app = express();
const port = 3000;

// Middleware para lidar com JSON
app.use(express.json());

// Rota básica de teste
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});




let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];
  
  // Obter todos os usuários
  app.get('/users', (req, res) => {
    res.json(users);
  });
  
  // Obter um usuário pelo ID
  app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).send('Usuário não encontrado');
    res.json(user);
  });
  
  // Criar um novo usuário
  app.post('/users', (req, res) => {
    const newUser = {
      id: users.length + 1,
      name: req.body.name,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  });
  
  // Atualizar um usuário existente
  app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).send('Usuário não encontrado');
  
    user.name = req.body.name;
    res.json(user);
  });
  
  // Deletar um usuário
  app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.status(204).send();
  });