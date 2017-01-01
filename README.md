FBindex
=======

This project uses the Facebook Graph API to download all the links you ever posted to your Facebook wall and indexes them in Elasticsearch. The client searches for links that point to youtube and contain your query.

Installation
-------------
Run Docker build in the root of the project. I.e. ```docker build -t fbindex .```

Running
-------------
Run elasticsearch as follows: ```docker run -d -p 9200:9200 -p 9300:9300 --name es dockerfile/elasticsearch```

To use, generate an access token at https://developers.facebook.com/tools/explorer/ and provide it when starting the web container like so: ```docker run -d -P -e "access_token=[access_token]" --link es:es --name web fbindex```. Tail the logs to monitor the progress of the indexing process: ```docker logs -f web```

Use ```docker ps``` to see which port was assigned and forwarded to the webserver running on port 3000. If you use boot2docker, run ```boot2docker ip``` to determine the IP that was assigned to your instance. Finally, run ```open http://[localhost or boot2docker ip]:[port]```
