const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userCtrl');
const checkPrivilege = require('../helpers/checkPrivilege');
const checkAuth = require('../helpers/checkAuth');

router.use((req, res, next) => {
  checkAuth(req, res, next);
});
router.use((req, res, next) => {
  checkPrivilege(req, res, next);
});

router.get('/', (req, res) => {
  UserCtrl.getUsers(req, res);
});

router.get('/add', (req, res) => {
  UserCtrl.addUserForm(req, res, {});
});

router.post('/add', (req, res) => {
  UserCtrl.addUser(req, res, {});
});

router.get('/edit/:userId', (req, res) => {
  UserCtrl.editUserForm(req, res, {});
});

router.post('/add/:userId', (req, res) => {
  UserCtrl.editUser(req, res, {});
});

router.get('/delete/:userId', (req, res) => {
  UserCtrl.deleteUser(req, res);
});

router.get('/take_exam', (req, res) => {
  UserCtrl.takeExamForm(req, res, {});
});

module.exports = router;
