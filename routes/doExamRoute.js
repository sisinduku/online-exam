const express = require('express');
const model = require('../models');
const sequelize = require('sequelize');
const router = express.Router();
const ExamCtrl = require('../controllers/examCtrl');

router.get('/', function(req, res) {
  if(!req.session.hasOwnProperty('dataSoal')) {
    model.Question.findAll({
      order: [
        [sequelize.fn('RANDOM')]
      ],
      limit: 3
    }).then((data) => {
      req.session.dataSoal = data;
      var randomedJawaban = [];
      for(let i = 0;i<3;i++) {
        let temp = []
        for(let j = 0;j<4;j++) {
          while(true){
            let random = Math.floor(Math.random() * 1000) % 4;
            if(temp.indexOf(random) == -1){
              temp.push(random);
              break;
            }
          }
        }
        randomedJawaban.push(temp);
      }
      req.session.randomJawaban = randomedJawaban;
      res.render('doExam', {soals:req.session.dataSoal, randomJawaban:req.session.randomJawaban})
      // res.render('doExam', {
      //   data
      // });
    })
  }
  else {
    console.log(req.session.randomJawaban);
    res.render('doExam', {soals:req.session.dataSoal, randomJawaban:req.session.randomJawaban});
  }
})

router.post('/periksa', function(req, res){
  var score = 0;
  var kumpulanJawaban = [];

  req.session.dataSoal.forEach((apa, index)=>{
    if(apa.answer1 == req.body["jawaban"+index]){
      score++;
    }
  })
  console.log(score);
  res.send(req.body)
})

module.exports = router;
