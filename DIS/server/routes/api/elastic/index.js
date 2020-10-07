const express = require('express');
const router = express.Router();
const http = require('http');
const elasticsearch = require('elasticsearch');
const e = require('express');
/*
[{id:123},{password:123}]
검색조건에 해당하는 모든 결과를 json으로 리턴
*/
router.post('/elastic-all', async function(req, res, next) {
    let search = req.body;
    let client = elasticsearch.Client({
    host: '192.168.0.5:9200'
    });
    let frame ={
        size: 1000,
        query:{
            bool:{
                must:[

                ]
            }
        }
    }
    search.forEach(function(element){
        let obj=new Object();
        obj.match=element;
        frame.query.bool.must.push(obj);
    });
    await client.search({
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
router.post('/elastic-part', async function(req, res, next) {
    let key = req.body.key; //결과로 받고싶은 필드명
    let search = req.body.search;// 검색어
    let keysplit = key.split(',');
    let client = elasticsearch.Client({
    host: '192.168.0.5:9200'
    });
    let frame ={
        size: 50,
        query:{
            bool:{
                must:[

                ]
            }
        }
    }
    search.forEach(function(element){
        let obj=new Object();
        obj.match=element;
        frame.query.bool.must.push(obj);
    });
    await client.search({
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
//{key:"name,value", or:[{name:"elc1,elc2"}],and:[{loc1:"00"},{date:{"gte":"2020-01-01","lte":"2020-01-02"}}]}
router.post('/elastic-complete', async function(req, res, next) {
    let key = req.body.key; //결과로 받고싶은 필드명
    let or = req.body.or;// 검색어
    let and = req.body.and;
    let keysplit = key.split(',');
    let client = elasticsearch.Client({
    host: '192.168.0.5:9200'
    });
    let frame ={
        size: 10000,
        query:{
            bool:{
                must:[

                ]
            }
        }
    }
    //////////////or////////////////
    let orsplit;
    let must=[];
    let obj1={bool:{should:[]}};
    or.forEach(function(element){
        for(key in element){
            orsplit=element[key].split(',');
            orsplit.forEach(function(splitkey){
                let match={"match":{}};
                match.match[key]=splitkey;
                obj1.bool.should.push(match);
            });
            must.push(obj1);
        }
    });
    frame.query.bool.must=must;
    /////////////and////////////////
    and.forEach(function(element){
        let obj2=new Object();
        if(element.hasOwnProperty("date")){
            let range = {range:{}};
            range.range=element;
            frame.query.bool.must.push(range);
        }else {
            obj2.match=element;
            frame.query.bool.must.push(obj2);
        }
    });
    await client.search({

    type: '_doc',
    body: frame,
    }).then(function(response) {
    let hits = response.hits.hits;//결과배열
    console.log(hits);
    let jsonArray=new Array();
    let json;
    hits.forEach(function(element){ //검색결과 순회
        json = new Object();
        for(let i in keysplit){ //key들 순회
            json[keysplit[i]] = element._source[keysplit[i]];//원하는 key만 결과에 추가
        }
        jsonArray.push(json);
    });
    res.json(jsonArray);
    console.log(jsonArray);
    }, function(error) {
    console.trace(error.message);
    });
});
/*
[{name:"elc1"},{date:{"gte":"2020-01-01","lte":"2020-01-02"}}]
배열내의 date필드를 제외한 나머지부분이 조건, date필드의 경우 기간의 범위
*/
router.post('/elastic-cal',async function(req, res, next) {
    let search = req.body;
    let client = elasticsearch.Client({
    host: '192.168.0.5:9200'
    });
    let frame ={
        size: 1000,
        query:{
            bool:{
                must:[

                ]
            }
        }
    }
    search.forEach(function(element){
        let obj=new Object();
        if(element.hasOwnProperty("date")){
            let range = {range:{}};
            range.range=element;
            frame.query.bool.must.push(range);
        }else {
            obj.match=element;
            frame.query.bool.must.push(obj);
        }
    });
    await client.search({
    type: '_doc',
    body: frame,
    }).then(function(response) {
    let hits = response.hits.hits;//결과배열
    //_source부분만 남도록 파싱//
    let i=0;
    let avg=0;
    let sum=0;
    let min=hits[0]._source.value;
    let max=hits[0]._source.value;
    let obj=new Object();
    obj=[];
    hits.forEach(function(element)
    {
        if(min>element._source.value){
            min=element._source.value;
        }
        if(max<element._source.value){
            max=element._source.value;
        }
        sum+=element._source.value;
        i++;
        obj.push(element._source.value);
    });
    avg=sum/i;
    obj={};
    obj.min=min;
    obj.max=max;
    obj.sum=sum;
    obj.avg=avg;
    //평균,누적,최소,최대
    console.log(obj);
    res.json(obj);
    }, function(error) {
    console.trace(error.message);
    });
});
module.exports = router;
