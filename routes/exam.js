const express = require('express');
const router = express.Router();
const ExamCtrl = require('../controllers/examCtrl');

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

module.exports = router;
