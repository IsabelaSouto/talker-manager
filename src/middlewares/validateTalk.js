const validateDate = require('./validateDate');
const validateRate = require('./validateRate');

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  
  const dateFail = validateDate(talk.watchedAt);
  if (dateFail) return res.status(400).json(dateFail);
  const rateFail = validateRate(talk.rate);
  if (rateFail) return res.status(400).json(rateFail);
  next();
};

module.exports = validateTalk;
