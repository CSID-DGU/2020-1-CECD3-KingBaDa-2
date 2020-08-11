var express = require('express');
var router = express.Router();

/* 회원가입 */
router.get('/signUp', function(req, res, next) {
  console.log(req.body)
});

module.exports = router;