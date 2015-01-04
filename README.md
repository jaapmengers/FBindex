FBindex
=======

This project uses the Facebook Graph API to download all the posts you ever made on your Facebook wall and indexes them in Elasticsearch for searchability.

Run elasticsearch as follows: ```> docker run -d -P --name es jaapme/elasticsearch-cors```

To use, generate an access token at https://developers.facebook.com/tools/explorer/ and provide it when starting the web container like so: ```> docker run -d -P -e "access_token=[access_token]" --link es:es --name web jaapme/fbindex```