const model = require('../models');

class ExamCtrl {
  static getIndex(req, res, param) {
    model.Exam.findAll({

    }).then((exams) => {
      res.render('show_list_exam', {
        title: 'Show All Exam',
        err: (param.hasOwnProperty('err')) ? param.err : null,
        message: (req.query.hasOwnProperty('message')) ? req.query.message : "",
        exams: exams,
        page: 'exam-nav',
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
      page: 'exam-nav',
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
        page: 'exam-nav',
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
    Promise.all([
      model.ExamQuestion.findAll({
        where: {
          examId:req.params.id
        }
      }),
      model.Question.findAll({

      })
    ]).then((results)=>{
      res.render('assign_question', {
        exams:results[0],
        questions:results[1],
        title: 'Assign Exam id ' + req.params.id,
        err: (param.hasOwnProperty('err')) ? param.err : null,
        page: 'exam-nav',
        session: req.session,
      })
    })
  }
}

module.exports = ExamCtrl;
