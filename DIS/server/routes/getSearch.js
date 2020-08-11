var express = require('express');
var router = express.Router();

/* 로그인 */
router.get('/getSearch', function(req, res, next) {
  console.log(req.body)
});

module.exports = router;