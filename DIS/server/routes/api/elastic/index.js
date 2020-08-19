const express = require('express');
const router = express.Router();
const http = require('http');
const elasticsearch = require('elasticsearch');
/*
[{id:123},{password:123}]
검색조건에 해당하는 모든 결과를 json으로 리턴
*/ 
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
    //_source부분만 남도록 파싱//
    let obj=new Object();
    obj=[];
    hits.forEach(function(element){
        obj.push(element._source);
    });
    console.log(obj);
    res.json(obj);
    }, function(error) {
    console.trace(error.message);
    });

});
/*
{key:"name,value", search:[{name:this.id},{location1:this.password}]}
key는 검색한 결과에서 가져올 부분
search는 검색조건 
*/
router.post('/get2', function(req, res, next) {
    let key = req.body.key;
    let search = req.body.search;
    let keysplit = key.split(',');
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
    let jsonArray=new Array();
    let json; 
    hits.forEach(function(element){ //검색결과 순회
        json = new Object();
        for(let i in keysplit){ //key들 순회
            json[keysplit[i]] = element._source[keysplit[i]];//원하는 key만 결과에 추가
        }
        jsonArray.push(json);
    });
    console.log(jsonArray);
    res.json(jsonArray);
    }, function(error) {
    console.trace(error.message);
    });
});
module.exports = router;