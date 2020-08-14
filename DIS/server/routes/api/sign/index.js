const router = require('express').Router();
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const request = require('request');
const config = require('../../../config/config')

let mysql = require('mysql');

const { db: {host, port, name, user, password}} = config;

router.post('/login', (req, res, next) => {
    console.log(req.body.data)
    res.send({ success: true });
});
router.post('/admin-login', (req, res, next) => {
  console.log(req.body.data);
  id=req.body.data.id;
  password=req.body.data.password;
  let connection = mysql.createConnection({
    host: '192.168.0.5',
    port: port,
    user: user,
    password: password,
    database: name
  });
  connection.connect();
  let queryText = 'select user_id, user_password from UserInfo where (user_id ='+id+' and user_password='+password+')'
  connection.query(queryText, function(err, rows, fields){
    connection.end();
    if(!err){
      console.log(rows);
      console.log(fields);
      let result = 'rows : '+JSON.stringify(rows)+'<br><br>'+
      'fields : '+JSON.stringify(fields);
      res.send(result);
    } else {
      console.log('query error : '+err);
      res.send(err);
    }
  })
  //res.send({ success: true });
});
router.get('/sign-up', function(req, res, next) {
    console.log(req.body)
  });
module.exports = router;
