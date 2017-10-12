const model = require('../models');
const decryptAES256CTR = require('../helpers/decryptAES256CTR');

class AuthCtrl {
  static getLoginPage(req, res, param) {
    res.render('login_page', {
      title: 'Login Page',
      page: 'login-nav',
      err: param.hasOwnProperty('err') ? param.err : null,
      message: req.query.hasOwnProperty('message') ? req.query.message : "",
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
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.role = user.role;
            res.redirect('/?message=loginsuccess');
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
        res.redirect('/auth/login?message=logoutsuccess');
      else
        console.log(err);
    });
  }
  static signUp(req, res) {
    if(req.body.password != req.body.re_password){
      res.redirect('/auth/signup?message=signupgagalpass');
    }
    req.body.role = 'user';
    model.User.create(req.body)
      .then(inserted => {
        res.redirect('/auth/login?message=signupsuccess');
      })
      .catch(reason => {
        console.log(reason);
        res.redirect('/auth/signup?message=signupgagal');
      });
  }
  static getSignUp(req, res, param){
    res.render('signup_page', {
      title: 'Sign Up Page',
      page: 'login-nav',
      err: param.hasOwnProperty('err') ? param.err : null,
      message: req.query.hasOwnProperty('message') ? req.query.message : "",
      session: req.session,
    });
  }
}

module.exports = AuthCtrl;
