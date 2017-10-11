const express = require('express');
const model = require('../models');
const router = express.Router();
const checkPrivilege = require('../helpers/checkPrivilege');
const checkAuth = require('../helpers/checkAuth');

router.use((req, res, next) => {
  checkAuth(req, res, next);
});
router.use((req, res, next) => {
  checkPrivilege(req, res, next);
});

router.get('/', function(req, res) {

  model.Result.findAll({
      where: {
        userId: req.session.userId
      },
      include: ['Exam']
    })
    .then(results => {
      res.render('show_list_result', {
        results: results
      });
    })
})

module.exports = router;
