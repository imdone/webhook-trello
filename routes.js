const Trello = require('node-trello');
const validateSignature = require('./imdone-webhook-validate');
const util = require('util');

var config = {
  boardURL:"https://trello.com/b/eKbyaLzk/marketing",
  mapping: {
    "BACKLOG": "backlog",
    "TODO": "todo",
    "DOING": "doing"
  }
};

var trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);

var routes = function(app) {

  app.get("/", function(req, res) {
    res.send("<h1>REST API</h1><p>Oh, hi! There's not much to see here - view the code instead</p><footer id=\"gWidget\"></footer><script src=\"https://widget.glitch.me/widget.min.js\"></script>");
    console.log("Received GET");
  });
  
  app.post('/', function(req, res) {
    // TODO: Figure out how to gain access to the glitch api and track TODOs in glitch
    // DONE: Integrate with twitter using [desmondmorris/node-twitter: Client library for the Twitter REST and Streaming API's.](https://github.com/desmondmorris/node-twitter)
    // DOING: Integrate with trello using [adunkman/node-trello: Node wrapper for Trello's HTTP API.](https://github.com/adunkman/node-trello)

    validateSignature(req, function(valid) {
      if (!valid) return res.status(403);
      
      var list = req.body.taskNow.list;
      var text = req.body.taskNow.text;
      var status = util.format("%s: %s (via @imdoneio)", list, text);

      trello.get('/1/boards/')
    });

  });

};
 
module.exports = routes;