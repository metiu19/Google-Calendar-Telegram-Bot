# Google-Calendar-Telegram-Bot

A bot made to be use in class group, it can provide homeworks (by simply read them from the calendar).

### You have to manually set:

1. Google api:
   1. client ID 
   2. client secret
2. refresh token
3. telegram bot token

You have to put all of them inside a file called `tokens.json` using the this schema:

```json
{
    "ClientId": "client ID here",
    "ClientSecret": "client secret here",
    "RefreshToken": "refresh token here",
    "BotToken": "Telegram bot token here"
}
```
