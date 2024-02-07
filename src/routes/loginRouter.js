const express = require('express');
const token = require('../utils/token');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const router = express.Router();

router.post('/', validateEmail, validatePassword, (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(401).json({ message: 'Precisa informar o email e o password' });
  }
    
  const tokenGenerated = token();
  return res.status(200).json({ token: tokenGenerated });
});

module.exports = router;
