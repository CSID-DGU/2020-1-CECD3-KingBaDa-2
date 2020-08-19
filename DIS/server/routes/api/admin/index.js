const router = require('express').Router();
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const request = require('request');
const config = require('../../../config/config')

let mysql = require('mysql');

const { db: {host, port, name, user, password}} = config;

// domain job management API
router.post('/domain', (req, res, next) => {
    console.log(req.body);
    console.log(req.body[0].admin_id);
    let admin_id=req.body[0].admin_id;
    let user_domain=req.body[1].user_domain;
    let connection = mysql.createConnection({
      host: '192.168.0.5',
      port: port,
      user: user,
      password: password,
      database: name
    });
    connection.connect();
    let queryText = 'insert into DomainJob (user_id, user_domain) values(\''+ admin_id +'\',\''+ user_domain +'\')';
    console.log(queryText);
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
router.get('/domain', (req, res, next) => {
    // console.log(req.param("admin_id"));
    let admin_id=req.param("admin_id");
    let connection = mysql.createConnection({
      host: '192.168.0.5',
      port: port,
      user: user,
      password: password,
      database: name
    });
    connection.connect();
    let queryText = 'select distinct user_domain from DomainJob where (user_id = \''+admin_id+'\')';
    console.log(queryText);
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
router.post('/domain/job', (req, res, next) => {
    console.log(req.body.data)
    res.send({ success: true });
});
router.get('/domain/job', (req, res, next) => {
    res.send({ success: true });
});

// graph data(item) management API
router.post('/graph/item', (req, res, next) => {
    console.log(req.body.data)
    res.send({ success: true });
});
router.get('/graph/item', (req, res, next) => {
    res.send({ success: true });
});

module.exports = router;
