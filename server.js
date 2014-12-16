var express = require('express'),
	http = require('http'),
  us = require('underscore');

var app = module.exports = express();
var server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 5000;

server.listen(port);