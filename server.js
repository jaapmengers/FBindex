var express = require('express')

var app = express();
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render('index', { server: process.env.ES_PORT_9200_TCP_ADDR, port: process.env.ES_PORT_9200_TCP_PORT });
});

app.use(express.static(__dirname + '/public'))

app.listen(3000);

console.log('Listening on 3000');