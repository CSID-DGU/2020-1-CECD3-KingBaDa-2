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
  console.log(req.body);
  user_id=req.body.id;
  user_password=req.body.pw;
  let connection = mysql.createConnection({
    host: '1.223.111.138',
    port: port,
    user: user,
    password: password,
    database: name
  });
  connection.connect();
  let queryText = 'select user_permission from UserInfo where (user_id = \''+user_id+'\' and user_password = \''+user_password+'\')';
  console.log(queryText);
  connection.query(queryText, function(err, rows, fields){
    connection.end();
    if(!err){
      // console.log(rows);
      // console.log(fields);
      let result = null;
      try {
        result = rows[0].user_permission;
      } catch (error) {
        console.log(' >> query result not found');
      }
      // console.log(rows[0].user_permission);
      // let result = 'rows : '+JSON.stringify(rows)+'<br><br>'+
      // 'fields : '+JSON.stringify(fields);
      res.send({data:result});
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
