const exprespostas = requisicaouire('exprespostas');
const app = exprespostas();
const port = 3000;

// Middleware para lidar com JSON
app.use(exprespostas.json());

// Rota básica de teste
app.get('/', (requisicao, resposta) => {
  resposta.send('API está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});




let pessoas = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];
  
  // Obter todos os usuários
  app.get('/pessoas', (requisicao, resposta) => {
    resposta.json(pessoas);
  });
  
  // Obter um usuário pelo ID
  app.get('/pessoas/:id', (requisicao, resposta) => {
    const user = pessoas.find(u => u.id == requisicao.params.id);
    if (!user) return resposta.status(404).send('Usuário não encontrado');
    resposta.json(user);
  });
  
  // Criar um novo usuário
  app.post('/pessoas', (requisicao, resposta) => {
    const newUser = {
      id: pessoas.length + 1,
      name: requisicao.body.name,
    };
    pessoas.push(newUser);
    resposta.status(201).json(newUser);
  });
  
  // Atualizar um usuário existente
  app.put('/pessoas/:id', (requisicao, resposta) => {
    const user = pessoas.find(u => u.id == requisicao.params.id);
    if (!user) return resposta.status(404).send('Usuário não encontrado');
  
    user.name = requisicao.body.name;
    resposta.json(user);
  });
  
  // Deletar um usuário
  app.delete('/pessoas/:id', (requisicao, resposta) => {
    pessoas = pessoas.filter(u => u.id != requisicao.params.id);
    resposta.status(204).send();
  });