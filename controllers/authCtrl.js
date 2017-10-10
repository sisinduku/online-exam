class AuthCtrl {
  static getLoginPage(req, res, param) {
    res.render('login_page', {
      title: 'Login Page',
      page: 'login-nav',
      err: param.hasOwnProperty('err') ? param.err : null,
      session: req.session,
    });
  }
}

module.exports = AuthCtrl;
