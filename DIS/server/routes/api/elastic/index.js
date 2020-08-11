const express = require('express');
const router = express.Router();
const http = require('http');
/* 엘라스틱 검색 */
router.get('/get', function(req, res, next) {
    console.log(req.body)
    /*엘라스틱 검색 부분 코드*/
    function elasticsearchGet(index,id){ 
        let option = { 
            hostname: '192.168.0.5', 
            port: 9200, 
            path: '/'+index+'/_doc/'+id, 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }; 
        let req = http.request(option, function(res) { 
            console.log('STATUS: ' + res.statusCode); 
            console.log('HEADERS: ' + JSON.stringify(res.headers)); 
            res.setEncoding('utf8'); 
            res.on('data', function (chunk) { 
                console.log(chunk); 
            }); 
        }); 
        req.on('error', function(e) { 
        console.log('problem with request: ' + e.message); 
        }); 
    // DATA PUT 
        req.headers = http.h
        req.end(); 
    } 
    let index='test'; 
    let id='1'; 
    elasticsearchGet(index,id);

});
module.exports = router;