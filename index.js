const Tokens = require('./Tokens.json');

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
    var message = update.message.text.split(" ");
    if(message[0].startsWith('/')) {
        var chatId = update.message.chat.id;
        switch (message[0]) {
            case '/ping':
                bot.sendMessage({
                    chat_id: chatId,
                    text: 'pong'
                });
                break;
            case '/compiti':
                var days
                if (message[1]) days = message[1];
                if (!message[1]) days = 7
                GetEvents(chatId, days);
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
function GetEvents(chatId, days) {
    const StartDate = new Date();
    const EndDate = new Date();
    EndDate.setDate(EndDate.getDate() + parseInt(days));
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
                const dateTime = new String(item.start.dateTime);
                var date = dateTime.slice(0, 10).split('-');
                message = message + `Materia: ${item.summary}\nCompito: ${item.description}\nPer: ${date[2]}/${date[1]}/${date[0]}\n\n`;
            });
            bot.sendMessage({
                chat_id: chatId,
                text: message
            });
        })
        .catch(err => console.error('Get Calendar List error: ' + err));
    })
    .catch(err => {
        console.error('Get Calendar List error: ' + err);
    });
}