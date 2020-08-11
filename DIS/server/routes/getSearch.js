var express = require('express');
var router = express.Router();

/* 엘라스틱 검색 */
router.get('/getSearch', function(req, res, next) {
  console.log(req.body)
});
/*엘라스틱 검색 부분 코드*/
var http = require('http');
function elasticsearchGet(index,id){ 
    var option = { 
        hostname: '192.168.0.5', 
        port: 9200, 
        path: '/'+index+'/_doc/'+id, 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          }
    }; 
    var req = http.request(option, function(res) { 
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
var index='test'; 
var id='1'; 
elasticsearchGet(index,id);

module.exports = router;