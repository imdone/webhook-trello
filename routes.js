const Trello = require('node-trello');
const validateSignature = require('webhook-validate');
const util = require('util');
const request = require('request');

const config = {
  boardURL:"https://trello.com/b/eKbyaLzk/marketing",
  mapping: {
    "BACKLOG": "backlog",
    "TODO": "todo",
    "DOING": "doing"
  }
};

const trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);
const getBoard = function(cb) {
  request({url:`${config.boardURL}.json`, json: true}, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('body:', body); // Print the HTML for the Google homepage. 
    if (error) return cb(error);
    if (response.statusCode !== 200) return cb(null, response);
    cb(error, response, body);
  });
};

const routes = function(app) {

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
      
      getBoard(function(err, response, board) {
        if (board) {
          console.log(board)
        }
        res.status(200).json(req.body.taskNow);        
      });
    });

  });

};
 
module.exports = routes;