const crypto = require('crypto');
const Twitter = require('twitter');
const _ = require('lodash');
const util = require('util');

//
// This defines two routes that our API is going to use.
//
var getHMACDigest = function(body,cb) {
    var secret = process.env.SECRET;
    if (!(secret && _.isString(secret) && secret.length > 0)) return cb();
    var hmac = crypto.createHmac("sha1", secret).setEncoding('hex');
    hmac.end(body, function() {
      cb(hmac.read());
    });
  };

var routes = function(app) {
//
// This rouet processes GET requests, by using the `get()` method in express, and we're looking for them on
// the root of the application (in this case that's https://rest-api.glitch.me/), since we've
// specified `"/"`.  For any GET request received at "/", we're sending some HTML back and logging the
// request to the console. The HTML you see in the browser is what `res.send()` is sending back.
//
  
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  
  app.get("/", function(req, res) {
    res.send("<h1>REST API</h1><p>Oh, hi! There's not much to see here - view the code instead</p><footer id=\"gWidget\"></footer><script src=\"https://widget.glitch.me/widget.min.js\"></script>");
    console.log("Received GET");
  });
  
  app.post('/test-webhook', function(req, res) {
    // DOING: Integrate with twitter using [desmondmorris/node-twitter: Client library for the Twitter REST and Streaming API's.](https://github.com/desmondmorris/node-twitter) id:101
    // DOING: Integrate with trello using [adunkman/node-trello: Node wrapper for Trello's HTTP API.](https://github.com/adunkman/node-trello) id:102

    var signature = req.headers["x-imdone-signature"];
    getHMACDigest(JSON.stringify(req.body), function(digest) {
      if (digest !== signature) return res.status(403);

      if (req.body.delta) {
        var list = req.body.taskNow.list;
        var text = req.body.taskNow.text;
        var status = util.format("%s: %s (Tweet TODO's with webhooks and @imdoneio)", list, text);
        client.post('statuses/update', {status: status})
          .then(function (tweet) {
            res.status(200).json(req.body.taskNow); // DOING: This should send the task back if it should be updated id:99
          })
          .catch(function (error) {
            res.status(400).;
          })        
      }
    });
  });

};
 
module.exports = routes;