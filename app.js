const express = require('express');  // Corrigido o require
const app = express();
const port = 3000;

// Middleware para lidar com JSON
app.use(express.json());

// Rota básica de teste
app.get('/', (requisicao, resposta) => {
  resposta.send('API está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


// Simulando um "banco de dados" de pessoas
let pessoas = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

// Obter todas as pessoas
app.get('/pessoas', (requisicao, resposta) => {
  resposta.json(pessoas);  // Envia a lista de pessoas como resposta em JSON
});

// Obter uma pessoa pelo ID
app.get('/pessoas/:id', (requisicao, resposta) => {
  const pessoa = pessoas.find(u => u.id == requisicao.params.id);  // Procura a pessoa pelo ID
  if (!pessoa) return resposta.status(404).send('Pessoa não encontrada');  // Se não encontrar, retorna 404
  resposta.json(pessoa);  // Se encontrar, envia a pessoa como resposta
});

// Criar uma nova pessoa
app.post('/pessoas', (requisicao, resposta) => {
  const newPessoa = {
    id: pessoas.length + 1,  // O novo ID é o tamanho atual do array + 1
    name: requisicao.body.name,  // O nome é retirado do corpo da requisição
  };
  pessoas.push(newPessoa);  // Adiciona a nova pessoa ao array
  resposta.status(201).json(newPessoa);  // Retorna a nova pessoa criada com status 201 (Created)
});

// Atualizar uma pessoa existente
app.put('/pessoas/:id', (requisicao, resposta) => {
  const pessoa = pessoas.find(u => u.id == requisicao.params.id);  // Procura a pessoa pelo ID
  if (!pessoa) return resposta.status(404).send('Pessoa não encontrada');  // Se não encontrar, retorna 404

  pessoa.name = requisicao.body.name;  // Atualiza o nome da pessoa
  resposta.json(pessoa);  // Retorna a pessoa atualizada
});

// Deletar uma pessoa
app.delete('/pessoas/:id', (requisicao, resposta) => {
  pessoas = pessoas.filter(u => u.id != requisicao.params.id);  // Remove a pessoa cujo ID não coincide
  resposta.status(204).send();  // Retorna o status 204 (No Content) indicando sucesso na exclusão
});
