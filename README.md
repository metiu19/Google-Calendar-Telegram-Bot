# Google-Calendar-Telegram-Bot

A bot made to be use in class group, it can provide homeworks (by simply read them from the calendar).

## Set up
1. Download all files
2. Go in to directory and execute `npm i` (or `npm install --save` if you are using an old version of node) to download all teh package
3. Create and fill `tokens.json`
4. Run `node Index.js` to start the bot. When "Bot started" apper in console the bot is redy

### How to fill `tokens.json`

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
