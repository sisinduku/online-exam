const express = require('express');
const model = require('../models');
const sequelize = require('sequelize');
const router = express.Router();
const ExamCtrl = require('../controllers/examCtrl');
const DoExamCtrl = require('../controllers/doExamCtrl');

router.post('/', function(req, res) {
  DoExamCtrl.getTest(req, res);
})

router.post('/periksa', function(req, res) {
  DoExamCtrl.checkTest(req, res);
})

router.get('/complete/:name/:score/:date', (req, res) => {
  res.send(req.params.name + req.params.score + req.params.date);
});

module.exports = router;
