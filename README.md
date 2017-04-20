trello webhook for imdone.io
----
This is an [imdone.io](https://imdone.io) webhook that creates and updates trello cards from TODO comments

To use it, remix [this project](https://imdone-webhook-trello.glitch.me) and add the following environment variables in .env

You can get your trello credentials [here](https://trello.com/1/appKey/generate).

```
SECRET="Your imdone.io webhook secret"
TRELLO_KEY="Get this from trello"
TRELLO_TOKEN="Get this from trello"
```

You'll also have to update config.json with values for your board.  The list name `mapping` should follow the format `[code-tag]:[trello-list-name]`.

Then copy the base url of your glitch app. (e.g. https://imdone-webhook-trello.glitch.me/)

Then create a webhook on [imdone.io](https://imdone.io) and paste it in.