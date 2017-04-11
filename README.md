trello webhook for imdone.io
----
This is an [imdone.io](https://imdone.io) webhook that creates and updates trello cards from TODO comments

To use it, remix this project and add the following environment variables in .env

You can get the twitter credentials [here](https://trello.com/1/appKey/generate).

```
SECRET="Your imdone.io webhook secret"
TRELLO_KEY="Get these from trello"
TRELLO_TOKEN=""
```

You'll also have to update config.json with values for your board.

Then copy the base url of your glitch app. (e.g. https://imdone-webhook-trello.glitch.me/)

Then create a webhook on [imdone.io](https://imdone.io) and paste it in.