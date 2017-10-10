const express = require('express');
const router = express.Router();
const AuthCtrl = require('../controllers/authCtrl');

router.get('/login', (req, res) => {
  AuthCtrl.getLoginPage(req, res, {});
})
