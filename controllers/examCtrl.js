const model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class ExamCtrl {
  static getIndex(req, res, param) {
    model.Exam.findAll({

    }).then((exams) => {
      res.render('show_list_exam', {
        title: 'Show All Exam',
        err: (param.hasOwnProperty('err')) ? param.err : null,
        message: (req.query.hasOwnProperty('message')) ? req.query.message : "",
        exams: exams,
        page: 'exams-nav',
        session: req.session,
      })
    }).catch((reason) => {
      console.log(reason);
    })
  }
  static getAdd(req, res, param) {
    res.render('form_exam', {
      title: 'Add New Question',
      err: (param.hasOwnProperty('err')) ? param.err : null,
      page: 'exams-nav',
      session: req.session,
    })
  }
  static postExam(req, res, param) {
    model.Exam.create(req.body).then((inserted) => {
      res.redirect('/exams?message=success');
    }).catch((reason) => {
      console.log(reason);
      this.getAdd(req, res, {
        err: reason.errors[0],
      })
    })
  }
  static getEdit(req, res, param) {
    model.Exam.findById(req.params.id).then((exam) => {
      res.render('form_exam', {
        exams: exam,
        title: 'Edit Exam id ' + req.params.id,
        err: (param.hasOwnProperty('err')) ? param.err : null,
        page: 'exams-nav',
        session: req.session,
      })
    }).catch((reason) => {
      console.log(reason);
    })
  }
  static updateExam(req, res, param) {
    model.Exam.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then((updated) => {
      res.redirect('/exams?message=success');
    }).catch((reason) => {
      this.getEdit(req, res, {
        err: reason.errors[0]
      })
    })
  }
  static deleteExam(req, res, param) {
    model.Exam.destroy({
      where: {
        id: req.params.id
      }
    }).then((deleted) => {
      this.getIndex(req, res, {});
    }).catch((reason) => {
      this.getIndex(req, res, {
        err: reason.errors[0]
      })
    })
  }
  static getAssignExam(req, res, param) {
    model.ExamQuestion.findAll({
      where: {
        examId: req.params.id,
      }
    }).then((rows) => {
      let unavailableQId = rows.map((row) => {
        return row.questionId
      });
      Promise.all([
        model.Question.findAll({
          where: {
            id: {
              [Op.notIn]: unavailableQId
            }
          }
        }),
        model.Question.findAll({
          where: {
            id: {
              [Op.in]: unavailableQId
            }
          }
        })
      ]).then((results) => {
        res.render('assign_question', {
          examId: req.params.id,
          exams: results[0],
          questions: results[1],
          title: 'Assign Exam id ' + req.params.id,
          err: (param.hasOwnProperty('err')) ? param.err : null,
          page: 'exams-nav',
          session: req.session,
        })
      })
    }).catch((reason) => {
      console.log(reason);
    })
  }
  static removeQuestionExam(req, res, param) {
    if(!Array.isArray(req.body.deletedId)){
      req.body.deletedId = [req.body.deletedId];
    }
    model.ExamQuestion.destroy({
      where: {
        questionId: {
          [Op.in]: req.body.deletedId,
        },
        examId: req.params.id,
      }
    }).then((deleted) => {
      res.redirect('/exams/assign/'+req.params.id+'?message=success');
    }).catch((reason) => {
      this.getAssignExam(req, res, {
        err: reason.errors[0]
      })
    })
  }
  static addQuestionExam(req, res, param) {
    let arr_object = [];
    if(!Array.isArray(req.body.addedId)){
      req.body.addedId = [req.body.addedId];
    }
    arr_object = req.body.addedId.map((obj) => {
      return {
        questionId: obj,
        examId: req.params.id
      }
    })
    model.ExamQuestion.bulkCreate(arr_object).then((data)=>{
      res.redirect('/exams/assign/'+req.params.id+'?message=success');
    }).catch((reason)=>{
      err:reason.errors[0]
    })
  }
}
module.exports = ExamCtrl;
