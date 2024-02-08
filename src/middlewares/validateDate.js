const validateDate = (watchedAt) => {
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const validDate = dateRegex;
  if (!watchedAt || watchedAt === undefined) {
    return { message: 'O campo "watchedAt" é obrigatório' };
  }
  if (!validDate.test(watchedAt)) {
    return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  return null;
};

module.exports = validateDate;
