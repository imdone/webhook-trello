# Create API endpoints with Express
This projects implements a simple RESTful API that processes HTTP requests.

It makes use of [Express.js](http://expressjs.com/), a minimal and flexible Node.js framework that includes a myriad of HTTP utility methods for quickly creating robust APIs. We also use the [Body Parser](https://github.com/expressjs/body-parser) package, which is Node.js middleware that allows us to process any POST requests we receive.

## Getting Started
To test this project:

### With curl
curl -H "Content-Type: application/json" -X POST -d '{"username":"test","data":"1234"}' http://rest-api.glitch.me/update

### In a web browser
In a new tab, go to: https://rest-api.glitch.me/update?username=testUser&data=1234

Keep this project open and view 'Logs' to see the console output.

## Getting Help
You can see other example projects on our [Community Projects](https://glitch.com/) page. And if you get stuck, let us know on the [forum](http://support.glitch.com/) and we can help you out.