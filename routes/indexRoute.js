const express = require('express');
const router = express.Router();
const IndexCtrl = require('../controllers/indexCtrl');

router.get('/', (req, res) => {
  IndexCtrl.getIndex(req, res, {});
});

module.exports = router;
