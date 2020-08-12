const express = require('express');
const router = express.Router();
const http = require('http');
const elasticsearch = require('elasticsearch');
/* 엘라스틱 검색 */
/*data1{id:123},data2{password:123}*/ 
router.post('/get2', function(req, res, next) {
    let search1 = req.body.data1;
    let search2 = req.body.data2;
    console.log(search1);
    console.log(search2);
    let client = elasticsearch.Client({
    host: '192.168.0.5:9200'
    });
    client.search({
    index: 'test',
    type: '_doc',
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
    }).then(function(response) {
    let hits = response.hits.hits;
    console.log(hits);
    }, function(error) {
    console.trace(error.message);
    });
});
module.exports = router;