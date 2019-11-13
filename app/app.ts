import { ContextMessageUpdate } from 'telegraf';

const dotenv = require('dotenv');
const Telegraf = require('telegraf');
const request = require('request');


dotenv.config();


const bot = new Telegraf(process.env.TELEGRAM_API_TOKEN);


bot.catch((err: any, ctx: ContextMessageUpdate) => {
    console.log(`Error for ${ctx.updateType}`, err, typeof err);
});

bot.start((ctx: ContextMessageUpdate) => {
    console.log(`received message from user ${ctx.from?.id}`);
    if (ctx.from?.id == process.env.MY_TELEGRAM_USER_ID) {
        ctx.reply('ok');
        console.log(`chat id is ${ctx.chat?.id}`);
        checkForPDFs();
    } else {
        ctx.reply('hi :D');
        // bot.telegram.sendDocument(ctx.chat?.id, 'http://algo.cs.uni-frankfurt.de/lehre/algo2/winter1920/uebung/gl11920_uebung03.pdf');
    }
});

bot.on('message', (ctx: ContextMessageUpdate) => {
    console.log(`sending sticker to user ${ctx.from?.id}`);
    return bot.telegram.sendSticker(ctx.chat?.id, 'CAADAgADQAEAAhZ8aAPOt9pjb9XRXRYE');
});

bot.launch();


console.log('bot running');



function checkForPDFs() {

    // request.get(`http://algo.cs.uni-frankfurt.de/lehre/algo2/winter1920/uebung/gl11920_uebung${getTwoDigitNumber()}.pdf`, (error: any, response: Response, body: any) => {
    //     console.log(JSON.stringify(error), response.statusCode);
    // });
}

function getTwoDigitNumber(a: number): string {
    return a < 10 ? '0' + a.toString() : a.toString();
}
