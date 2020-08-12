const router = require('express').Router();
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const request = require('request');

let mysql = require('mysql');
const { createConnection } = require('net');

router.post('/login', (req, res, next) => {
    console.log(req.body.data)
    let connection = mysql.createConnection({
        host: '192.168.0.5',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'bts_test'
    });
    connection.connect();
    connection.query('select * from UserInfo', function(err, rows, fields) {
        connection.end();
        if(!err){
            console.log(rows);
            console.log(fields);
            var result = 'rows : '+JSON.stringify(rows)+'<br><br>'+
            'fields : '+JSON.stringify(fields);
            res.send(result);
        }
        else{
            console.log('query error : '+err);
            res.send(err);
        }
    })
});
router.get('/sign-up', function(req, res, next) {
    console.log(req.body)
  });
module.exports = router;
