const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const authorization = require('../middlewares/authorization');
const validateTalk = require('../middlewares/validateTalk');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');

const pathTalker = path.resolve(__dirname, '../talker.json');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const data = await fs.readFile(pathTalker);
    const talkers = JSON.parse(data);
    
    return res.status(200).json(talkers);
  } catch (err) {
    return res.status(200).json([]);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
    
  const data = await fs.readFile(pathTalker);
  const talkers = JSON.parse(data);
  const talker = talkers.find((t) => t.id === Number(id));
    
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    
  return res.status(200).json(talker);
});

router.post('/', authorization, validateName, validateAge, validateTalk, async (req, res) => {
  const data = await fs.readFile(pathTalker);
  const talkers = JSON.parse(data);
  const newTalker = req.body;
  const id = talkers.length + 1;
  const newTalkerWithId = { id, ...newTalker };
  talkers.push(newTalkerWithId);
  await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(talkers));
  return res.status(201).json(newTalkerWithId);
});

router.put('/:id', authorization, validateName, validateAge, validateTalk, async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(pathTalker);
  const talkers = JSON.parse(data);
  const talkContent = req.body;
  const talkerToModify = talkers.find((talker) => talker.id === Number(id));
  if (!talkerToModify) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  
  const talkModified = talkers.map((talker) => {
    if (talker.id === Number(id)) {
      return { id: Number(id), ...talkContent };
    }
    return talker;
  });
  await fs.writeFile(pathTalker, JSON.stringify(talkModified));
  return res.status(200).json({ id: Number(id), ...talkContent });
});

router.delete('/:id', authorization, async (req, res) => {
  const { id } = req.params;

  const data = await fs.readFile(pathTalker);
  const talkers = JSON.parse(data);
  const newTalkers = talkers.find((talker) => talker.id !== Number(id));

  await fs.writeFile(pathTalker, JSON.stringify(newTalkers));

  res.status(204).end();
});

module.exports = router;
