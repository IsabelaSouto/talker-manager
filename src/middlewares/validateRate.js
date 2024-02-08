const isInvalid = (rate) => rate === undefined || rate === null;
const isInvalidRate = (rate) => !Number.isInteger(rate) || rate < 1 || rate > 5;

const validateRate = (rate) => {
  if (isInvalid(rate)) {
    return { message: 'O campo "rate" é obrigatório' };
  }
  if (isInvalidRate(rate)) {
    return { message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' };
  }
  return null;
};

module.exports = validateRate;
