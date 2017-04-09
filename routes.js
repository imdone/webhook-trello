const crypto = require('crypto');
const Trello = require('node-trello');
const _ = require('lodash');
const util = require('util');

var config = {
  
};

var getHMACDigest = function(body,cb) {
    var secret = process.env.SECRET;
    if (!(secret && _.isString(secret) && secret.length > 0)) return cb();
    var hmac = crypto.createHmac("sha1", secret).setEncoding('hex');
    hmac.end(body, function() {
      cb(hmac.read());
    });
  };

var validateSignature = function(req, cb) {
  
};

var routes = function(app) {
  var trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);

  app.get("/", function(req, res) {
    res.send("<h1>REST API</h1><p>Oh, hi! There's not much to see here - view the code instead</p><footer id=\"gWidget\"></footer><script src=\"https://widget.glitch.me/widget.min.js\"></script>");
    console.log("Received GET");
  });
  
  app.post('/', function(req, res) {
    // TODO: Figure out how to gain access to the glitch api and track TODOs in glitch
    // DONE: Integrate with twitter using [desmondmorris/node-twitter: Client library for the Twitter REST and Streaming API's.](https://github.com/desmondmorris/node-twitter)
    // DOING: Integrate with trello using [adunkman/node-trello: Node wrapper for Trello's HTTP API.](https://github.com/adunkman/node-trello)

    var processReequest = function() {
      var list = req.body.taskNow.list;
      var text = req.body.taskNow.text;
      var status = util.format("%s: %s (via @imdoneio)", list, text);

      client.post('statuses/update', {status: status})
        .then(function (tweet) {
          console.log("Tweet sent:", tweet);
          res.status(200).json(req.body.taskNow);
        })
        .catch(function (error) {
          console.error(error);
          res.status(200).json(req.body.taskNow);
        });        
      
    }

    var signature = req.headers["x-imdone-signature"];
    
    getHMACDigest(JSON.stringify(req.body), function(digest) {
      console.log(req.body);
      if (digest !== signature) return res.status(403);
      processRequest();
    });
  });

};
 
module.exports = routes;