const express = require('express');
const model = require('../models');
const sequelize = require('sequelize');
const router = express.Router();
const ExamCtrl = require('../controllers/examCtrl');
const DoExamCtrl = require('../controllers/doExamCtrl');
const checkPrivilege = require('../helpers/checkPrivilege');
const checkAuth = require('../helpers/checkAuth');

router.use((req, res, next) => {
  checkAuth(req, res, next);
});
router.use((req, res, next) => {
  checkPrivilege(req, res, next);
});

router.post('/', function(req, res) {
  DoExamCtrl.getTest(req, res);
})

router.get('/', function(req, res) {
  res.redirect('/users/take_exam');
})

router.post('/periksa', function(req, res) {
  DoExamCtrl.checkTest(req, res);
})

router.get('/complete/:id/:name/:examName/:score/:date', (req, res) => {
  DoExamCtrl.genPdf(req, res, {});
  // genPdf(datab).then(()=>{
  //   res.download('pdf/'+req.params.id+'.pdf');
  // }).catch((err)=>{
  //   console.log(err);
  // })

});

module.exports = router;
