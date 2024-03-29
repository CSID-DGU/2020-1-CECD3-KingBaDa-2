const router = require('express').Router();
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const moment = require('moment');
// const cfg = require('');

router.use('/sign', require('./sign'));
router.use('/elastic', require('./elastic'));
router.use('/admin', require('./admin'));

router.all('*', require('./notFound'));

module.exports = router;
