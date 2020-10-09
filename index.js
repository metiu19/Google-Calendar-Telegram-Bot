const Telegram = require('telegram-bot-api');
const Tokens = require('./Tokens.json');
const bot = new Telegram({token: Tokens.BotToken});
const mp = new Telegram.GetUpdateMessageProvider();

bot.setMessageProvider(mp);
bot.start()
    .then(() => {
        console.log('Bot started!');
    })
    .catch(err => console.error(err));

bot.on('update', update => {
    var message = update.message.text;
    if(message.startsWith('/')) {
        var chatId = update.message.chat.id;
        switch (message) {
            case '/ping':
                bot.sendMessage({
                    chat_id: chatId,
                    text: 'pong'
                });
                break;
            case '/compiti':
                GetEvents(chatId);
                break;
            case '/help':
                bot.sendMessage({
                    chat_id: chatId,
                    text: `/ping\n/compiti`
                });
                break;
            default:
                bot.sendMessage({
                    chat_id: chatId,
                    text: 'Comando non valido!\nPer una lista di comandi usare /help'
                });
                break;
        }
    }
});

const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const OAuth2Client = new OAuth2(Tokens.ClientId, Tokens.ClientSecret);

OAuth2Client.setCredentials({
	refresh_token: Tokens.RefreshToken
});

const calendar = google.calendar({ version: 'v3', auth: OAuth2Client });

function GetEvents(chatId) {
    calendar.calendarList.list({})
        .then(res => {
            const calendarId = res.data.items[0].id;
            calendar.events.list({calendarId: calendarId})
            .then(events => {
                events.data.items.forEach(item => {
                    bot.sendMessage({
                        chat_id: chatId,
                        text: `Materia: ${item.summary}\nCompiti: ${item.description}`
                    });
                });
            })
            .catch(err => console.error('Get Event List error: ' + err));
        })
        .chat(err => console.error('Get Calendars List error: ' + err));
}