# Google-Calendar-Telegram-Bot

A bot made to be use in class group, it can provide homeworks (by simply read them from the calendar).

### You have to manually set:

1. client ID ([Google api](https://console.developers.google.com/))
2. client secret ([Google api](https://console.developers.google.com/))
3. refresh token ([Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground))
4. telegram bot token ([@BotFather](https://t.me/BotFather))

You have to put all of them inside a file called `tokens.json` using the this schema:

```json
{
    "ClientId": "client ID here",
    "ClientSecret": "client secret here",
    "RefreshToken": "refresh token here",
    "BotToken": "Telegram bot token here"
}
```
