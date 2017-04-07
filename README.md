twitter webhook for imdone.io
----
This is an [imdone.io](https://imdone.io) webhook that tweets changes in TODO comments.

To use it, remix this project and add the following environment variables in .env

You can get the twitter credentials [here](https://apps.twitter.com/).

```
SECRET="Your imdone.io webhook secret"
TWITTER_CONSUMER_KEY="Get these from twitter"
TWITTER_CONSUMER_SECRET=""
TWITTER_ACCESS_TOKEN_KEY=""
TWITTER_ACCESS_TOKEN_SECRET=""
```

Then copy the base url of your glitch app. (e.g. https://imdone-webhook-twitter.glitch.me/)

Then create a webhook on [imdone.io](https://imdone.io) and paste it in.