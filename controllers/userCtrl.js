const model = require('../models');
const sequelize = require('sequelize');

class UserCtrl {
  static getUsers(req, res) {
    model.User.findAll()
      .then(users => {
        res.render('show_list_users', {
          users: users,
          title: 'Show All Users',
          page: 'user-nav',
          session: req.session,
        });
      })
  }

  static addUserForm(req, res, param) {
    res.render('form_user', {
      title: 'Add New User',
      page: 'user-nav',
      session: req.session,
      action: '/users/add',
      err: param.hasOwnProperty('err') ? param.err : null,
    });
  }

  static addUser(req, res) {
    model.User.create(req.body)
      .then(inserted => {
        res.redirect('/users');
      })
      .catch(reason => {
        this.addUserForm(req, res, {
          err: reason,
        })
      });
  }

  static editUserForm(req, res, param) {
    model.User.findOne({
        where: {
          id: req.params.userId,
        }
      })
      .then(user => {
        res.render('form_user', {
          title: 'Edit User',
          page: 'user-nav',
          user: user,
          session: req.session,
          action: '/users/edit/' + req.params.userId,
          err: param.hasOwnProperty('err') ? param.err : null,
        });
      })
      .catch(reason => {
        console.log(reason);
      })
  }

  static editUser(req, res) {
    model.User.update(req.body, {
        where: {
          id: req.params.userId,
        }
      })
      .then(updated => {
        res.redirect('/users');
      })
      .catch(reason => {
        this.editUserForm(req, res, {
          err: reason,
        })
      });
  }

  static deleteUser(req, res) {
    model.User.destroy({
        where: {
          id: req.params.userId,
        }
      })
      .then(() => {
        this.getUsers(req, res);
      })
      .catch(reason => {
        console.log(reason);
      })
  }

  static takeExamForm(req, res, param) {
    // select max("Exams"."examName") as name, max("Exams"."jumlahSoal") as jumlahsoal, "examId" , count(*) as total_exam from "ExamQuestions" left join "Exams" on "Exams".id = "ExamQuestions"."examId" group by "ExamQuestions"."examId"
    // model.Exam.findAll({
    //     attributes: {
    //       exclude: [
    //         'Exams.createdAt',
    //         'Exams.updatedAt', [model.sequelize.fn('MAX', model.sequelize.col('Exams.jumlahSoal'))]
    //       ],
    //       include: [
    //         [model.sequelize.fn('COUNT', model.sequelize.col('ExamQuestions.examId')), 'total']
    //       ]
    //     },
    //     include: [{
    //       model: model.ExamQuestion,
    //       attributes: ['examId']
    //     }],
    //     group: ['ExamQuestions.examId', 'Exam.id', 'ExamQuestions.id']
    //   })
    //   .then(exams => {
    //     res.send(exams);
    //   })
    //   .catch(reason => {
    //     console.log(reason);
    //   })
    model.Exam.findAll({
        include: 'ExamQuestions'
      })
      .then(exams => {
        let result = exams.filter((exam, index) => {
          return exam.dataValues.ExamQuestions.length >= exam.dataValues.jumlahSoal;
        })
        res.render('form_choose_exam', {
          exams: result,
          title: 'Choose Exam',
          page: 'exam-nav',
          err: param.hasOwnProperty('err') ? param.err : null,
          session: req.session,
        });
      })
  }
}

module.exports = UserCtrl;
