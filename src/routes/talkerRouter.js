const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const authorization = require('../middlewares/authorization');
const validateTalk = require('../middlewares/validateTalk');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const talkers = JSON.parse(data);
    
    return res.status(200).json(talkers);
  } catch (err) {
    return res.status(200).json([]);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
    
  const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
  const talkers = JSON.parse(data);
  const talker = talkers.find((t) => t.id === Number(id));
    
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    
  return res.status(200).json(talker);
});

router.post('/', authorization, validateName, validateAge, validateTalk, async (req, res) => {
  const content = await fs.readFile(path.resolve(__dirname, '../talker.json'));
  const talkers = JSON.parse(content);
  const newTalker = req.body;
  const id = talkers.length + 1;
  const newTalkerWithId = { id, ...newTalker };
  talkers.push(newTalkerWithId);
  await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(talkers));
  return res.status(201).json(newTalkerWithId);
});

module.exports = router;
