const router = require('express').Router();
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const request = require('request');
const config = require('../../../config/config')

let mysql = require('mysql');
const { json } = require('express');

const { db: {host, port, name, user, password}} = config;

// db connection setting
// set host: host at release
let pool = mysql.createPool({
    host: '192.168.0.5',
    port: port,
    user: user,
    password: password,
    database: name
});

// let connection = mysql.createConnection({
//     host: 'localhost',
//     port: port,
//     user: user,
//     password: password,
//     database: name
// });

// domain job management API
// post domain
router.post('/domain', (req, res, next) => {
    // console.log(req.body);
    // console.log(req.body[0].admin_id);
    let admin_id=req.body[0].admin_id;
    let user_domain=req.body[1].user_domain;

    let queryText = 'insert into DomainJob (user_id, user_domain) values (\''+ admin_id +'\',\''+ user_domain +'\')';

    pool.getConnection(function(err, connection){
        if(!err){
            connection.query(queryText, function(err, rows, fields){
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
                  console.log(err);
                  res.send(err);
                }
            });
        } else {
            console.log(err);
        }
        connection.release();
    });
});
// get domain
router.get('/domain', (req, res, next) => {
    // console.log(req.param("admin_id"));
    let admin_id=req.query.admin_id;

    let queryText = 'select distinct user_domain from DomainJob where (user_id = \''+admin_id+'\')';

    // connection.connect();
    pool.getConnection(function(err, connection){
        if(!err){
            connection.query(queryText, function(err, rows, fields){
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
                    console.log(err);
                    res.send(err);
                }
            });
        } else {
            console.log(err);
        }
        connection.release();
    });
});
// delete domain
router.delete('/domain', (req, res, next) => {
    // console.log(req.param("admin_id"));
    let user_id=req.body.admin_id;
    let user_domain=req.body.user_domain;

    let queryText = 'delete from DomainJob where (user_id = \''+ user_id +'\' and user_domain = \''+user_domain+'\')';

    pool.getConnection(function(err, connection){
        if(!err){
            connection.query(queryText, function(err, rows, fields){
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
                  console.log(err);
                  res.send(err);
                }
            });
        } else {
            console.log(err);
        }
        connection.release();
    });
});
// post domain job
router.post('/domain/job', (req, res, next) => {
    // console.log(req.body.data);
    let user_id=req.body[0].admin_id;
    let user_domain=req.body[1].user_domain;
    let domain_job=req.body[2].domain_job;

    let queryText = 'update DomainJob set domain_job=\''+ domain_job +'\' where (user_id = \''+ user_id +'\' and user_domain = \''+user_domain+'\')';

    pool.getConnection(function(err, connection){
        if(!err){
            connection.query(queryText, function(err, rows, fields){
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
                  console.log(err);
                  res.send(err);
                }
            });
        } else {
            console.log(err);
        }
        connection.release();
    });
});
// get domain job
router.get('/domain/job', (req, res, next) => {
    // console.log(req.params);
    let admin_id=req.query.admin_id;
    let user_domain=req.query.user_domain;

    let queryText = 'select distinct domain_job from DomainJob where (user_id = \''+ admin_id +'\' and user_domain = \''+ user_domain +'\' and domain_job is not null)';

    // connection.connect();
    pool.getConnection(function(err, connection){
        if(!err){
            connection.query(queryText, function(err, rows, fields){
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
                    console.log(err);
                    res.send(err);
                }
            });
        } else {
            console.log(err);
        }
        connection.release();
    });
});

router.delete('/domain/job', (req, res, next) => {
    // console.log(req.params);
    let user_id=req.body.admin_id;
    let user_domain=req.body.user_domain;
    let domain_job=req.body.domain_job;

    let queryText = 'update DomainJob set domain_job=NULL where (user_id = \''+ user_id +'\' and user_domain = \''+user_domain+'\' and domain_job = \''+ domain_job +'\')';

    pool.getConnection(function(err, connection){
        if(!err){
            connection.query(queryText, function(err, rows, fields){
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
                  console.log(err);
                  res.send(err);
                }
            });
        } else {
            console.log(err);
        }
        connection.release();
    });
});

// graph data(item) management API
// post graph item
router.post('/graph/item', (req, res, next) => {
    admin_id=req.body[0].admin_id;
    domain=req.body[1].domain;
    title=req.body[2].title;
    dataset=JSON.stringify(req.body[3].dataset);
    value=JSON.stringify(req.body[4].value);
    graphType=req.body[5].graphType;
    range=req.body[6].range;
    status=req.body[7].status;
    valType=req.body[8].valType;

    let queryText = 'insert into GraphData (user_id, user_domain, graph_name, graph_value, graph_location, graph_type, graph_range, graph_status, value_type) values(\''+ admin_id +'\',\''+ domain +'\',\''+ title +'\',\''+ value +'\',\''+ dataset +'\','+ graphType +','+ range +','+ status +','+ valType +')';

    pool.getConnection(function(err, connection){
        if(!err){
            connection.query(queryText, function(err, rows, fields){
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
                  console.log(err);
                  res.send(err);
                }
            });
        } else {
            console.log(err);
        }
        connection.release();
    });
});
// get graph item
router.get('/graph/item', (req, res, next) => {
    let admin_id=req.query.admin_id;

    let queryText = 'select * from GraphData where (user_id = \''+admin_id+'\')';

    // connection.connect();
    pool.getConnection(function(err, connection){
        if(!err){
            connection.query(queryText, function(err, rows, fields){
                if(!err){
                // console.log(rows);
                // console.log(fields);
                    let result = null;
                    try {
                        result = rows;
                    } catch (error) {
                        console.log(' >> query result not found');
                    }
                    let temp = result.map(
                        obj => {
                            return {
                                "domain":obj.user_domain,
                                "title":obj.graph_name,
                                "datasets":JSON.parse(obj.graph_dataset).datasets,
                                "values":JSON.parse(obj.graph_value).values,
                                "graphType":obj.graph_type,
                                "range":obj.graph_range,
                                "status":obj.graph_status,
                            }
                        }
                    );
                    res.send({data:temp});
                } else {
                    console.log(err);
                    res.send(err);
                }
            });
        } else {
            console.log(err);
        }
        connection.release();
    });
});
//delete graph item
router.delete('/graph/item', (req, res, next) => {
    let user_id=req.body.admin_id;
    let graph_name=req.body.title;

    let queryText = 'delete from GraphData where (user_id = \''+user_id+'\' and graph_name = \''+ graph_name +'\')';

    pool.getConnection(function(err, connection){
        if(!err){
            connection.query(queryText, function(err, rows, fields){
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
                  console.log(err);
                  res.send(err);
                }
            });
        } else {
            console.log(err);
        }
        connection.release();
    });
});

module.exports = router;
