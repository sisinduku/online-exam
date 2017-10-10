const express = require('express');
const router = express.Router();
const ExamCtrl = require('../controllers/examCtrl');
const checkPrivilege = require('../helpers/checkPrivilege');
const checkAuth = require('../helpers/checkAuth');

router.use((req, res, next) => {
  checkAuth(req, res, next);
});
router.use((req, res, next) => {
  checkPrivilege(req, res, next);
});

router.get('/', function(req, res){
  ExamCtrl.getIndex(req, res, {});
})

router.get('/add/', function(req, res){
  ExamCtrl.getAdd(req, res, {});
})

router.post('/add/', function(req, res){
  ExamCtrl.postExam(req, res, {});
})

router.get('/edit/:id', function(req, res){
  ExamCtrl.getEdit(req, res, {});
})

router.post('/edit/:id', function(req, res){
  ExamCtrl.updateExam(req, res, {});
})

router.get('/delete/:id', function(req, res){
  ExamCtrl.deleteExam(req, res, {});
})

router.get('/assign/:id', function(req, res){
  ExamCtrl.getAssignExam(req, res, {});
})

router.post('/assign/:id/delete', function(req, res){
  ExamCtrl.removeQuestionExam(req, res, {});
})

router.post('/assign/:id/add', function(req, res){
  ExamCtrl.addQuestionExam(req, res, {});
})

module.exports = router;
