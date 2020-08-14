const express = require('express');
const router = express.Router();
const http = require('http');
const elasticsearch = require('elasticsearch');
/* 엘라스틱 검색 */
/*data1{id:123},data2{password:123}*/ 
router.post('/get', function(req, res, next) {
    let search = req.body;
    let client = elasticsearch.Client({
    host: '192.168.0.5:9200'
    });
    let frame ={
        query:{
            bool:{
                must:[

                ]
            }
        }
    }
    let obj=new Object();
    search.forEach(function(element){
        obj.match=element;
        frame.query.bool.must.push(obj);
    });
    client.search({
    index: 'test',
    type: '_doc',
    body: frame,
    }).then(function(response) {
    let hits = response.hits.hits;//결과배열
    console.log(hits);
    res.json(hits);

    }, function(error) {
    console.trace(error.message);
    });

});
router.post('/get2', function(req, res, next) {
    let key = req.body.key;
    let search = req.body.search;
    let keysplit = key.split(',');

    //console.log(key);
    //console.log(search);
    let client = elasticsearch.Client({
    host: '192.168.0.5:9200'
    });
    let frame ={
        query:{
            bool:{
                must:[

                ]
            }
        }
    }
    let obj=new Object();
    search.forEach(function(element){
        obj.match=element;
        frame.query.bool.must.push(obj);
    });
    //console.log(obj);
    client.search({
    index: 'test',
    type: '_doc',
    body: frame,
    }).then(function(response) {
    let hits = response.hits.hits;
    //결과배열
    let jsonArray=new Array();
    let json; 
    hits.forEach(function(element){
        json = new Object();
        for(let i in keysplit){
            json[keysplit[i]] = element._source[keysplit[i]];
        }
        jsonArray.push(json);
    });
    console.log(jsonArray);
    res.json(hits);
    }, function(error) {
    console.trace(error.message);
    });
});
module.exports = router;