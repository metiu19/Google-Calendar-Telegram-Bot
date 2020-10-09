const Telegram = require('telegram-bot-api');
const bot = new Telegram({token: '862481550:AAERdFwd3jgaKA3AQ2X-g0C6O8r8Se7sMdg'});
const mp = new Telegram.GetUpdateMessageProvider();

bot.setMessageProvider(mp);
bot.start()
    .then(() => {
        console.log('Bot started!');
    })
    .catch(err => console.error(err));

bot.on('update', update => {
    if(message.startsWith('/')) {
        console.log(update);
        var message = update.message.text;
        var chatId = update.message.chat.id;
        switch (message) {
            case '/ping':
                bot.sendMessage({
                    chat_id: chatId,
                    text: 'pong'
                });
                break;
            case '/compiti':
                bot.sendMessage({
                    chat_id: chatId,
                    text: `Per domani c'è diritto coglione!`
                });
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
})