module.exports = function(req, res, next) {
  let privilegeAdmin = ['/users', '/exams', '/questions'];
  let privilegeUser = ['/users/take_exam'];

  switch (req.session.role) {
    case 'admin':
      if (privilegeAdmin.indexOf(req.originalUrl) != -1)
        next();
      else
        res.redirect('/auth/unauthorized');
      break;
    case 'user':
      if (privilegeUser.indexOf(req.originalUrl) != -1)
        next();
      else
        res.redirect('/auth/unauthorized');
      break;
  }
};
