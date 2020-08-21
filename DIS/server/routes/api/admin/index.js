const router = require('express').Router();
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const request = require('request');
const config = require('../../../config/config')

let mysql = require('mysql');

const { db: {host, port, name, user, password}} = config;

// db connection setting
// set host: host at release
const connection = mysql.createConnection({
    host: '192.168.0.5',
    port: port,
    user: user,
    password: password,
    database: name
  });

// domain job management API
// post domain
router.post('/domain', (req, res, next) => {
    // console.log(req.body);
    // console.log(req.body[0].admin_id);
    let admin_id=req.body[0].admin_id;
    let user_domain=req.body[1].user_domain;
    
    let queryText = 'insert into DomainJob (user_id, user_domain) values(\''+ admin_id +'\',\''+ user_domain +'\')';

    connection.connect();
    connection.query(queryText, function(err, rows, fields){
      connection.end();
      if(!err){
        // console.log(rows);
        // console.log(fields);
        let result = null;
        try {
          result = rows;
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
});
// get domain
router.get('/domain', (req, res, next) => {
    // console.log(req.param("admin_id"));
    let admin_id=req.query.admin_id;
    
    let queryText = 'select distinct user_domain from DomainJob where (user_id = \''+admin_id+'\')';

    connection.connect();
    connection.query(queryText, function(err, rows, fields){
      connection.end();
      if(!err){
        // console.log(rows);
        // console.log(fields);
        let result = null;
        try {
          result = rows;
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
});
// delete domain
router.delete('/domain', (req, res, next) => {
    // console.log(req.param("admin_id"));
    let user_id=req.body.admin_id;
    let user_domain=req.body.user_domain;
    
    
    let queryText = 'delete from DomainJob where (user_domain = \''+user_domain+'\')';

    connection.connect();
    connection.query(queryText, function(err, rows, fields){
      connection.end();
      if(!err){
        // console.log(rows);
        // console.log(fields);
        let result = null;
        try {
          result = rows;
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
});
// post domain job
router.post('/domain/job', (req, res, next) => {
    console.log(req.body.data)
    res.send({ success: true });
});
// get domain job
router.get('/domain/job', (req, res, next) => {
    res.send({ success: true });
});

// graph data(item) management API
// post graph item
router.post('/graph/item', (req, res, next) => {
    console.log(req.body.data)
    res.send({ success: true });
});
// get graph item
router.get('/graph/item', (req, res, next) => {
    
    res.send({ success: true });
});

module.exports = router;
