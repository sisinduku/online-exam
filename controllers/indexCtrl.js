const model = require('../models');

class IndexCtrl {
  static getIndex(req, res, param) {
    res.render('index', {
      title: 'Online Exam',
      page: 'home-nav',
      err: param.hasOwnProperty('err') ? param.err : null,
      session: req.session,
    });
  }
}

module.exports = IndexCtrl;
