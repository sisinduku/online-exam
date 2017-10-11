const model = require('../models');

class QuestionCtrl{
  static getIndex(req, res, param) {
    model.Question.findAll({

    }).then((questions)=>{
      res.render('show_list_questions', {
        title: 'Show All Questions',
        err: (param.hasOwnProperty('err')) ? param.err : null,
        message: (req.query.hasOwnProperty('message')) ? req.query.message : "",
        questions:questions,
        page: 'question-nav',
        session: req.session,
      })
    }).catch((reason)=>{
      console.log(reason);
    })
  }
  static getAdd(req, res, param) {
    res.render('form_question', {
      title:'Add New Question',
      err: (param.hasOwnProperty('err')) ? param.err : null, page: 'question-nav', session: req.session,
    })
  }
  static postQuestion(req, res, param) {
    model.Question.create(req.body).then((inserted)=>{
      res.redirect('/questions?message=success');
    }).catch((reason)=>{
      console.log(reason);
      this.getAdd(req, res, {
        err:reason.errors[0],
      })
    })
  }
  static getEdit(req, res, param) {
    model.Question.findById(req.params.id).then((question)=>{
      res.render('form_question', {
        questions:question,
        title:'Edit Question id '+req.params.id,
        err: (param.hasOwnProperty('err')) ? param.err : null,
        page: 'question-nav',
        session: req.session,
      })
    }).catch((reason)=>{
      console.log(reason);
    })
  }
  static updateQuestion(req, res, param) {
    model.Question.update(req.body, {
      where:{
        id:req.params.id
      }
    }).then((updated)=>{
      res.redirect('/questions?message=success');
    }).catch((reason)=>{
      this.getEdit(req, res, {
        err: reason.errors[0]
      })
    })
  }
  static deleteQuestion(req, res, param) {
    model.Question.destroy({
      where: {
        id:req.params.id
      }
    }).then((deleted)=>{
      res.redirect('/questions?message=success');
    }).catch((reason)=>{
      this.getIndex(req, res, {
        err:reason.errors[0]
      })
    })
  }
}

module.exports = QuestionCtrl;
