FBindex
=======

This project uses the Facebook Graph API to download all the posts you ever made on your Facebook wall and indexes them in Elasticsearch for searchability.

To use, add an access_token.js file to the root of the project that contains an access token that you can generate at https://developers.facebook.com/tools/explorer/

It should look like this:

```
exports.access_token = '[yourtoken]';
```
