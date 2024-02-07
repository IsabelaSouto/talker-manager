const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/talker', async (_req, res) => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, 'talker.json'));
    const talkers = JSON.parse(data);

    return res.status(200).json(talkers);
  } catch (err) {
    return res.status(200).json([]);
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
