const express = require('express');
const router = express.Router();
const QuestionCtrl = require('../controllers/questionCtrl');

router.get('/', function(req, res){
  QuestionCtrl.getIndex(req, res, {});
})

router.get('/add/', function(req, res){
  QuestionCtrl.getAdd(req, res, {});
})

router.post('/add/', function(req, res){
  QuestionCtrl.postQuestion(req, res, {});
})

router.get('/edit/:id', function(req, res){
  QuestionCtrl.getEdit(req, res, {});
})

router.post('/edit/:id', function(req, res){
  QuestionCtrl.updateQuestion(req, res, {});
})

router.get('/delete/:id', function(req, res){
  QuestionCtrl.deleteQuestion(req, res, {});
})

module.exports = router;
