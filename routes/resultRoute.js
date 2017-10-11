const express = require('express');
const model = require('../models');
const router = express.Router();
const ResultCtrl = require('../controllers/resultCtrl');
const checkPrivilege = require('../helpers/checkPrivilege');
const checkAuth = require('../helpers/checkAuth');

router.use((req, res, next) => {
  checkAuth(req, res, next);
});
router.use((req, res, next) => {
  checkPrivilege(req, res, next);
});

router.get('/', function(req, res) {
  ResultCtrl.showResult(req, res);
})

module.exports = router;
