const express = require('express');
const router = express.Router();
const AuthCtrl = require('../controllers/authCtrl');

router.get('/login', (req, res) => {
  AuthCtrl.getLoginPage(req, res, {});
});

router.post('/login', (req, res) => {
  AuthCtrl.checkUser(req, res, {});
});

router.get('/logout', (req, res) => {
  AuthCtrl.logout(req, res);
});


module.exports = router;
