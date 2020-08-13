const express = require('express');
const router = express.Router();
const http = require('http');
const elasticsearch = require('elasticsearch');
/* 엘라스틱 검색 */
/*data1{id:123},data2{password:123}*/ 
router.post('/get', function(req, res, next) {
    let search = req.body;
    // {},{}
    /*
    search.forEach(function(key,value){
        console.log("hohohoho");
        console.log(key,value);
    });
    */
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
    /*
    body: {
        query: {
            bool: {
                must:[
                    {match:search1},
                    {match:search2}
                ]
            }
        }
    }
    */
    }).then(function(response) {
    let hits = response.hits.hits;//결과배열
    console.log(hits);
    // let result = new Object();
    //console.log(hits[0]._source);//결과 첫번째의 _source의 id 출력
    //
    //   파싱부분
    //
    res.json(hits);

    }, function(error) {
    console.trace(error.message);
    });

});
module.exports = router;