module.exports = function(req, res, next) {
  let privilegeAdmin = ['/users', '/exams', '/questions'];
  let privilegeUser = ['/users', '/results'];
<<<<<<< HEAD
=======
  console.log(req.baseUrl);
>>>>>>> origin/exam_questions_crud
  switch (req.session.role) {
    case 'admin':
      if (privilegeAdmin.indexOf(req.baseUrl) != -1)
        next();
      else
        res.redirect('/auth/unauthorized');
      break;
    case 'user':
      if (privilegeUser.indexOf(req.baseUrl) != -1)
        next();
      else
        res.redirect('/auth/unauthorized');
      break;
  }
};
