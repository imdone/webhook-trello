const Trello = require('node-trello');
const validateSignature = require('webhook-validate');
const util = require('util');
const request = require('request');
const Task = require('imdone-core/lib/task');
const _ = require('lodash');

const config = require('./config');

const trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);
const getBoard = function(cb) {
  request({
    url:`${config.boardURL}.json`, 
    json: true,
    qs: {
      key: process.env.TRELLO_KEY,
      token: process.env.TRELLO_TOKEN
    }
  }, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('body:', body); // Print the HTML for the Google homepage. 
    if (error) return cb(error);
    if (response.statusCode !== 200) return cb(null, response);
    trello.get(`/1/boards/${body.id}/lists`, function(err, lists) {
      body.lists = lists;
      cb(error, response, body);
    });
  });
};

const routes = function(app) {

  app.get("/", function(req, res) {
    res.send("<h1>imdone.io Trello webhook</h1><p>Oh, hi! There's not much to see here - view the code instead</p><footer id=\"gWidget\"></footer><script src=\"https://widget.glitch.me/widget.min.js\"></script>");
    console.log("Received GET");
  });
  
  app.post('/', function(req, res) {
    // TODO: Figure out how to gain access to the glitch api and track TODOs in glitch
    // DONE: Integrate with twitter using [desmondmorris/node-twitter: Client library for the Twitter REST and Streaming API's.](https://github.com/desmondmorris/node-twitter)
    // DOING: Integrate with trello using [adunkman/node-trello: Node wrapper for Trello's HTTP API.](https://github.com/adunkman/node-trello)

    validateSignature(req, function(valid) {
      if (!valid) return res.status(403);
      // TODO: This should respect taskNow.deleted and put card in a completed column, or just delete card
      
      getBoard(function(err, response, board) {
        if (board) {
          var taskNow = new Task(req.body.taskNow);
          var cardText = taskNow.getText({stripMeta: true, stripDates: true});
          var trelloList = _.find(board.lists, {name:config.mapping[taskNow.list]});
          if (!trelloList) return res.status(200).json(taskNow);
          
          //check for trello id
          if (taskNow.meta.tr) {
            var cardId = taskNow.meta.tr[0];
            trello.get(`/1/boards/${board.id}/cards/${cardId}`, function(err, card) {
              trello.put(`/1/cards/${cardId}`, {name: cardText, idList: trelloList.id}, function(err, data) {
                res.status(200).json(taskNow);        
              });
            });
          } else {
            trello.post(`/1/cards`, {name: cardText, idList: trelloList.id}, function(err, data) {
              if (err) return res.status(200).json(taskNow); 
              taskNow.meta.tr = [data.id];
              taskNow.updateTodoTxt();
              res.status(200).json(taskNow);        
            });      
          }
        }
        
      });
    });

  });

};
 
module.exports = routes;