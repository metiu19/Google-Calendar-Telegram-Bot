const Tokens = require('./Tokens.json');
const delay = require('delay');

// Bot set up
const Telegram = require('telegram-bot-api');
const bot = new Telegram({token: Tokens.BotToken});
const mp = new Telegram.GetUpdateMessageProvider();

bot.setMessageProvider(mp);
bot.start()
    .then(() => {
        console.log('Bot started!');
    })
    .catch(err => console.error(err));

// Google API set up
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const OAuth2Client = new OAuth2(Tokens.ClientId, Tokens.ClientSecret);

OAuth2Client.setCredentials({
    refresh_token: Tokens.RefreshToken
});

const calendar = google.calendar({ version: 'v3', auth: OAuth2Client });

// Telegram bot update endler
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

// Get Calendar Events List
function GetEvents(chatId) {    
    const StartDate = new Date();
    const EndDate = new Date();
    EndDate.setDate(EndDate.getDay() + 12);
    calendar.calendarList.list({})
        .then(res => {
            const calendarId = res.data.items[0].id;
            calendar.events.list({
                calendarId: calendarId,
                orderBy: 'startTime',
                singleEvents: true,
                timeMax: EndDate,
                timeMin: StartDate
            })
            .then(events => {
                var message = ``;
                events.data.items.forEach(item => {
                    const dateTime = item.start.dateTime;
                    var date = dateTime.slice(0, 10).split('-');
                    message = message + `Materia: ${item.summary}\nCompito: ${item.description}\nPer: ${date[2]}/${date[1]}/${date[0]}\n\n`;
                });
                bot.sendMessage({
                    chat_id: chatId,
                    text: message
                });
            })
            .catch(err => console.error('Get Event List error: ' + err));
        })
        .chat(err => console.error('Get Calendars List error: ' + err));
}