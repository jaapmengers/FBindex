var http = require('http'),
  https = require('https'),
  us = require('underscore');
  at = require('./access_token.js');

var url = 'https://graph.facebook.com/me/links?method=GET&format=json&suppress_http_code=1&access_token=' + at.access_token;

var getPosts = function(url){

	console.log(url);

	https.get(url, function(res){
		var body = '';

		res.on('data', function(chunk){
			body += chunk;
		});

		res.on('end', function(){
			var response = JSON.parse(body);
			console.log(response);
			console.log('Got response: ', response.data.length);			

			us.each(response.data, function(it){
				save(it);
			})

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
	  host: 'localhost',
	  port: 9205,
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
	req.write(JSON.stringify({'link': it.link, 'name': it.name, 'description': it.description, 'created_time': it.created_time, 'message': it.message}));
	req.end();
}

getPosts(url);
