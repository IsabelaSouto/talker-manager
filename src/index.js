const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const token = require('./utils/token');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, 'talker.json'));
    const talkers = JSON.parse(data);

    return res.status(200).json(talkers);
  } catch (err) {
    return res.status(200).json([]);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const data = await fs.readFile(path.resolve(__dirname, 'talker.json'));
  const talkers = JSON.parse(data);
  const talker = talkers.find((t) => t.id === Number(id));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(401).json({ message: 'Precisa informar o email e o password' });
  }

  const tokenGenerated = token();
  return res.status(200).json({ token: tokenGenerated });
});

app.listen(PORT, () => {
  console.log('Online');
});
