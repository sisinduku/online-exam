const model = require('../models');
const decryptAES256CTR = require('../helpers/decryptAES256CTR');

class AuthCtrl {
  static getLoginPage(req, res, param) {
    res.render('login_page', {
      title: 'Login Page',
      page: 'login-nav',
      err: param.hasOwnProperty('err') ? param.err : null,
      session: req.session,
    });
  }

  static checkUser(req, res) {
    model.User.findOne({
        where: {
          username: req.body.username,
        }
      })
      .then(user => {
        if (user) {
          if (decryptAES256CTR(user.password) === req.body.password) {
            req.session.username = user.username;
            req.session.role = user.role;
            res.redirect('/');
          } else {
            this.getLoginPage(req, res, {
              err: 'Username and password combination not found',
            });
          }
        } else {
          this.getLoginPage(req, res, {
            err: 'Username and password combination not found',
          });
        }
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (!err)
        res.redirect('/auth/login');
      else
        console.log(err);
    });
  }
}

module.exports = AuthCtrl;
