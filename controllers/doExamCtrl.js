const model = require('../models');
const ExamCtrl = require('./examCtrl');
const sequelize = require('sequelize');
const path = require('path');
var pdfMaker = require('../helpers/genPdf.js');

class DoExamCtrl {
  static getTest(req, res) {
    let idDanJumlah = req.body.exam.split('&');
    console.log(idDanJumlah);
    req.session.examId = idDanJumlah[0];
    req.session.jumlahSoal = idDanJumlah[1];
    if (!req.session.hasOwnProperty('dataSoal')) {
      model.ExamQuestion.findAll({
        include: [{
          model: model.Question,
        }],
        order: [
          [sequelize.fn('RANDOM')]
        ],
        where: {
          examId: idDanJumlah[0]
        },
        limit: idDanJumlah[1]
      }).then((data) => {
        let listQuestion = data.map((question) => {
          return question.Question
        });
        req.session.dataSoal = listQuestion;
        var randomedJawaban = [];
        for (let i = 0; i < idDanJumlah[1]; i++) {
          let temp = []
          for (let j = 0; j < 4; j++) {
            while (true) {
              let random = Math.floor(Math.random() * 1000) % 4;
              if (temp.indexOf(random) == -1) {
                temp.push(random);
                break;
              }
            }
          }
          randomedJawaban.push(temp);
        }
        req.session.randomJawaban = randomedJawaban;
        res.render('doExam', {
          soals: req.session.dataSoal,
          randomJawaban: req.session.randomJawaban,
          title: 'Do Exam',
          page: 'exam-nav',
          session: req.session
        })
        // res.render('doExam', {
        //   data
        // });
      })
    } else {
      console.log(req.session.randomJawaban);
      res.render('doExam', {
        soals: req.session.dataSoal,
        randomJawaban: req.session.randomJawaban,
        title: 'Do Exam',
        page: 'exam-nav',
        session: req.session
      });
    }
  }

  static checkTest(req, res) {
    var benar = 0;
    var kumpulanJawaban = [];
    req.session.dataSoal.forEach((apa, index) => {
      if (apa.answer1 == req.body["jawaban" + index]) {
        benar++;
      }
    })
    var score = (benar * 100) / req.session.jumlahSoal;
    model.User.findOne({
      where: {
        id: req.session.userId
      }
    }).then((user) => {
      var obj = {
        userId: user.id,
        examId: req.session.examId,
        score: score
      }
      model.Result.create(obj)
        .then(created => {
          delete req.session.jumlahSoal;
          delete req.session.dataSoal;
          delete req.session.randomJawaban;
          model.Exam.findOne({
              where: {
                id: created.examId
              }
            })
            .then(exam => {
              let date = new Date(created.createdAt);
              let safeDate = encodeURIComponent(date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear());
              let safeFullName = encodeURIComponent(user.fullname);
              this.genPdf(req, res, {
                name: user.fullname,
                score: score,
                date: date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear(),
                examName: exam.examName,
                id: created.id
              })
              // res.redirect(`/ayoujian/complete/${created.id}/${safeFullName}/${exam.examName}/${score}/${safeDate}`);
            })
            .catch(reason => {
              console.log(reason);
            })
        });
    })
  }
  static genPdf(req, res, param) {
    var template = path.join(__dirname, '../views/certificate.ejs');
    var pdfPath = 'pdf/' + param.id + '.pdf';
    var option = {
      paperSize: {
        format: 'A4',
        orientation: 'portrait',
        border: '1.8cm'
      }
    };
    var datab = {
      fullname: param.name,
      score: param.score,
      awardDate: param.date,
      examName: param.examName,
      resultId: param.id,
      path: template,
      pdfPath: pdfPath,
      option: option,
    }

    pdfMaker(template, datab, pdfPath, option, function() {
      res.send('pdf/' + param.id + '.pdf');
    });
  }
}

module.exports = DoExamCtrl;
