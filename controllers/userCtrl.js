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
    model.sequelize
      .query(
        `select Take.id, Take.name, Take.jumlahsoal
      from
        (select
          max("Exams"."id") as id,
          max("Exams"."examName") as name,
          max("Exams"."jumlahSoal") as jumlahsoal,
          "examId",
          count(*) as total_exam
         from "ExamQuestions"
         left join "Exams" on "Exams".id = "ExamQuestions"."examId"
         group by "ExamQuestions"."examId"
        ) AS Take
      where Take.jumlahSoal >= Take.total_exam`, {
          type: sequelize.QueryTypes.SELECT
        })
      .then(result => {
        res.render('form_choose_exam', {
          exams: result,
          title: 'Choose Exam',
          page: 'exam-nav',
          err: param.hasOwnProperty('err') ? param.err : null,
          session: req.session,
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
}

module.exports = UserCtrl;
