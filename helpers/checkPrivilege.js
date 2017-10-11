module.exports = function(req, res, next) {
  let privilegeAdmin = ['users', 'exams', 'questions'];
  let privilegeUser = ['userstake_exam', 'results'];
  switch (req.session.role) {
    case 'admin':
      if (privilegeAdmin.indexOf(req.originalUrl.replace(/\//g, "")) != -1)
        next();
      else
        res.redirect('/auth/unauthorized');
      break;
    case 'user':
      if (privilegeUser.indexOf(req.originalUrl.replace(/\//g, "")) != -1)
        next();
      else
        res.redirect('/auth/unauthorized');
      break;
  }
};
