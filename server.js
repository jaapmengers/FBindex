var express = require('express'),
    ElasticSearchClient = require('elasticsearchclient');

var serverOptions = {
  host: process.env.ES_PORT_9200_TCP_ADDR || 'localhost',
  port: process.env.ES_PORT_9200_TCP_PORT || 9200
};

var es = new ElasticSearchClient(serverOptions);

var app = express();
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/search', function(req, res){

  var qryObj = {
    "query": {
      "filtered": {
        "query": {
          "query_string": {
            "query": req.query.q
          }
        },
        "filter": {
          "query": {
            "match": {
              "link": 'youtube'
            }
          }
        }
      }
    }
  };

  es.search('links', 'link', qryObj, function(err, data){
    var resp = JSON.parse(data);
    res.json({hits: resp.hits.hits});
  });
});


app.use(express.static(__dirname + '/public'))

app.listen(3000);

console.log('Listening on 3000');