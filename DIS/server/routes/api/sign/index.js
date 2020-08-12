const router = require('express').Router();
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const request = require('request');

router.post('/login', (req, res, next) => {
    console.log(req.body.data)
    res.send({ success: true });
});
router.get('/sign-up', function(req, res, next) {
    console.log(req.body)
  });
module.exports = router;
