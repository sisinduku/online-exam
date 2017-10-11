const express = require('express');
const model = require('../models');
const sequelize = require('sequelize');
const router = express.Router();
const ExamCtrl = require('../controllers/examCtrl');
const DoExamCtrl = require('../controllers/doExamCtrl');
var pdfMaker = require('pdf-maker');

router.post('/', function(req, res) {
  DoExamCtrl.getTest(req, res);
})

router.post('/periksa', function(req, res) {
  DoExamCtrl.checkTest(req, res);
})

router.get('/complete/:name/:score/:date/', (req, res) => {
  var template = path.join(__dirname, '../views/boom.ejs');
  var datab = {
    fullname:req.params.name,
    score:req.params.score,
    awardDate:req.params.date,
    examName:req.params.examName,
    resultId:req.params.id
  }
  var pdfPath = 'pdf/'+req.params.id+'.pdf';
  var option = {
      paperSize: {
        format: 'A4',
        orientation: 'portrait',
        border: '1.8cm'
      }
  };

  pdfMaker(template, datab, pdfPath);
  datab.isWebpage = true;
  res.render('certificate', {datab})
});

module.exports = router;
