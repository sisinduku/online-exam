const model = require('../models');

class ResultCtrl {
  static showResult(req, res) {
    model.Result.findAll({
        where: {
          userId: req.session.userId
        },
        include: ['Exam']
      })
      .then(results => {
        res.render('show_list_result', {
          results: results,
          title: 'Show All Exam',
          page: 'results-nav',
          session: req.session,
        });
      })
  }
}

module.exports = ResultCtrl;
