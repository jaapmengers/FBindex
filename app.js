var http = require('http'),
  https = require('https');

var access_token = process.env.access_token;
var url = 'https://graph.facebook.com/me/links?method=GET&format=json&suppress_http_code=1&access_token=' + access_token;

var setMapping = function(){
	var options = {
		host: process.env.ES_PORT_9200_TCP_ADDR,
		port: process.env.ES_PORT_9200_TCP_PORT,
	  path: '/links',
	  method: 'POST'
	};

	var req = http.request(options, function(res) {
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    console.log('Mapping set');
	  });
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	req.write(JSON.stringify({ "mappings": { "link": { "properties": { "link": { "type": "string", "analyzer": "simple" } } } } }));
	req.end();
}

var getPosts = function(url){

	console.log(url);

	https.get(url, function(res){
		var body = '';

		res.on('data', function(chunk){
			body += chunk;
		});

		res.on('end', function(){
			var response = JSON.parse(body);

			response.data.forEach(function(it){
				save(it);
			});

			var paging = response.paging;
			if(paging && paging.next){
				getPosts(paging.next);
			}

		});
	}).on('error', function(e){
		console.log('Get error: ' + e.message);
	});
}

var save = function(it){

	var options = {
		host: process.env.ES_PORT_9200_TCP_ADDR,
		port: process.env.ES_PORT_9200_TCP_PORT,
	  path: '/links/link/' + it.id,
	  method: 'PUT'
	};

	var req = http.request(options, function(res) {
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    
	  });
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write(JSON.stringify({'link': it.link, 'name': it.name, 'description': it.description, 'picture': it.picture,  'created_time': it.created_time, 'message': it.message}));
	req.end();
}

setMapping();
getPosts(url);
