//
// This defines two routes that our API is going to use.
//
var routes = function(app) {
//
// This rouet processes GET requests, by using the `get()` method in express, and we're looking for them on
// the root of the application (in this case that's https://rest-api.glitch.me/), since we've
// specified `"/"`.  For any GET request received at "/", we're sending some HTML back and logging the
// request to the console. The HTML you see in the browser is what `res.send()` is sending back.
//
  app.get("/", function(req, res) {
    res.send("<h1>REST API</h1><p>Oh, hi! There's not much to see here - view the code instead</p><footer id=\"gWidget\"></footer><script src=\"https://widget.glitch.me/widget.min.js\"></script>");
    console.log("Received GET");
  });
  
  app.post('/test-webhook', function(req, res) {
    console.log('test-webhook:', req.body);
    // { 'content-type': 'application/json',
    //   'x-imdone-signature': '1f93b809debbebfe36c97386134e86ee08ef558b',
    //   host: 'localhost:3000',
    //   'content-length': '979',
    //   connection: 'close' }

    // DOING: Integrate with twitter using [desmondmorris/node-twitter: Client library for the Twitter REST and Streaming API's.](https://github.com/desmondmorris/node-twitter) id:101
    // DOING: Integrate with trello using [adunkman/node-trello: Node wrapper for Trello's HTTP API.](https://github.com/adunkman/node-trello) id:102

    console.log(req.headers);
    req.body.taskNow.text += " <using glitch>"
    res.status(200).sendObject(req.body.taskNow); // DOING: This should send the task back if it should be updated id:99
  });

};
 
module.exports = routes;